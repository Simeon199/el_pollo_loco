let gameScriptsLoaded = false;
let isExplainContainerOpen = false;
let isTouch = false;
let touchScreenVersionPath = '../templates/touch-screen-version.html';
let desktopVersionPath = '../templates/desktop-version.html';
let canvasContainerPath = '../templates/canvas-container.html';

document.addEventListener('DOMContentLoaded', async () => {
    reloadSiteIfDeviceTypeSwitches();
    if(isLocationIndexPage()){
        if(isTouchDevice()){
            isTouch = true;
            loadBundledCSS('dist/touch.bundle.min.css');
            await loadBundledJS('dist/touch.bundle.min.js');
            // loadTouchDeviceCSS();
            await loadTouchDeviceHTML();
        } else {
            loadBundledCSS('dist/desktop.bundle.min.css');
            await loadBundledJS('dist/desktop.bundle.min.js');
            // loadDesktopDeviceCSS();
            await loadDesktopDeviceHTML();
        }
        // loadSharedGameLogic();
    }
});

/* NEW METHODS FOR BUNDLED FILES - START */

function loadBundledJS(jsPath){
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = jsPath;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function loadBundledCSS(cssPath){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
}

/* NEW METHODS FOR BUNDLED FILES - FINISH */

/* The following code serves only development purposes. It checks if a user is switching between desktop and touch device mode within the browser developer tools. */

function reloadSiteIfDeviceTypeSwitches(){
    let mq_one = window.matchMedia('(pointer: coarse)');
    let mq_two = window.matchMedia('(hover: none)');
    function checkAndReload(){
        if(isSwitchingBetweenDeviceTypesIsHappening(mq_one, mq_two)){
            window.location.reload();
        }
    }
    mq_one.addEventListener('change', checkAndReload);
    mq_two.addEventListener('change', checkAndReload);
}

/* Checks whether a user is switching from desktop type touch touch type or vice versa inside the browser dev tools*/

function isSwitchingBetweenDeviceTypesIsHappening(mq_one, mq_two){
    return isPointerCoarseAndHoverNoneAndNotTouchDevice(mq_one, mq_two) || isNeitherPointerCoarseNorHoverNoneAndTouchDevice(mq_one, mq_two);
}

/* Checks if the user has switched to a touch-like environment but the app is still in desktop mode */

function isPointerCoarseAndHoverNoneAndNotTouchDevice(mq_one, mq_two){
    return mq_one.matches && mq_two.matches && !isTouch;
}

/* Checks if the user has switched to desktop-like environment but the app is still in touch mode */

function isNeitherPointerCoarseNorHoverNoneAndTouchDevice(mq_one, mq_two){
    return (!mq_one || !mq_two.matches) && isTouch;
}

function loadTouchDeviceCSS(){
    touchCSS.forEach(link => {
        loadCSS(link);
    });
}

function loadDesktopDeviceCSS(){
    desktopCSS.forEach(link => {
        loadCSS(link);
    });
}

async function loadDesktopDeviceHTML(){
    await loadTemplate(`${desktopVersionPath}`, 'desktop-version');
    // await loadSharedGameLogic();
    await addEventListenersToDesktopDevice();
}

async function addEventListenersToDesktopDevice(){
    handleSettingsEventListener();    
    handleShowAllIconsEventListener();
    handlePrivacyPolicyEventListener();
    handleImprintEventListener();
    await handlePlayIconEventListener();
}

async function loadTouchDeviceHTML(){
    await loadTemplate(`${touchScreenVersionPath}`, 'touch-screen-version');
    // await loadSharedGameLogic();
    await addEventListenersToTouchDevice();
}

// Hier muss noch die Pop-Up-Funktionalität für Imprint und Privacy Policy eingebaut werden

async function addEventListenersToTouchDevice(){
    handleSettingsEventListener();    
    handleShowAllIconsEventListener();
    handlePrivacyAndImprintEventListeners();
    await handlePlayIconEventListener();
}

function handlePrivacyAndImprintEventListeners(){
    let privacyImprint = document.getElementById('privacy-and-imprint-pop-up');
    if(privacyImprint){
        privacyImprint.addEventListener('click', () => {
            openOverlay('imprint-and-privacy-policy-overlay');
            handleImprintAndPrivacyOverlayEventListeners();
        });
    }
}

function handleImprintAndPrivacyOverlayEventListeners(){
    let imprintPrivacyOverlay = document.getElementById('imprint-and-privacy-policy-overlay');
    let imprint = document.getElementById('imprint');
    let privacy = document.getElementById('privacy');
    if(imprintPrivacyOverlay){
        imprintPrivacyOverlay.addEventListener('click', (event) => {
            if(event.target === imprintPrivacyOverlay){
                closeOverlay('imprint-and-privacy-policy-overlay');
            } else if(event.target === imprint){
                redirectToLegalNoticePage();
                event.stopPropagation();
            } else if(event.target === privacy){
                redirectToPrivacyPolicyPage();
                event.stopPropagation();
            }
        });
    }
}

function handlePrivacyPolicyEventListener(){
    let privacy = document.getElementById('privacy');
    if(privacy){
        privacy.addEventListener('click', () => {
            redirectToPrivacyPolicyPage();
        });
    }
}

function handleImprintEventListener(){
    let imprint = document.getElementById('imprint');
    if(imprint){
        imprint.addEventListener('click', () => {
            redirectToLegalNoticePage();
        });
    }
}

function isLocationIndexPage(){
    return window.location.pathname.endsWith('/index.html');
}

function isTouchDevice(){
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
    );
}

async function loadSharedGameLogic(){
    return await loadScriptsSequentially(gameJS);
}

async function loadScriptsSequentially(scripts){
    for(const src of scripts){
        await loadScriptAsync(src);
    }
}

function loadScriptAsync(src){
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Loads an HTML template from a URL and inserts it into a placeholder element.
 * 
 * @async
 * @param {string} url - The URL of the HTML template to fetch.
 * @param {string} placeholderId - The ID of the element where the HTML content will be injected.
 */

async function loadTemplate(url, placeholderId){
    let response = await fetch(url);
    let html = await response.text();
    document.getElementById(placeholderId).innerHTML = html;
}

async function handleShowAllIconsEventListener(){
    let iconsButton = document.getElementById('all-icons-button');
    if(iconsButton){
        iconsButton.addEventListener('click', async () => {
            await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
            openOverlay('all-icons-container-overlay');
            handleOverlayEventListener('all-icons-container-overlay');
        });
    }
}

async function handleSettingsEventListener(){
    let settings = document.getElementById('cartwheel-image-container');
    if(settings){
        settings.addEventListener('click', async () => {
            await loadTemplate('../templates/explain-game.html', 'explain-game-container');
            openOverlay('explain-game-container');
            handleOverlayEventListener('explain-game-container');
        });
    }
}

function handleOverlayEventListener(id){ 
    let overlay = document.getElementById(id);
    if(overlay){
        overlay.addEventListener('click', () => { 
            closeOverlay(id);
            removeDivElementFromDOM(id);
        });
    }
}

function removeDivElementFromDOM(id){
    let divElement = document.getElementById(id);
    if(divElement && divElement.children.length === 0){
        divElement.remove();
    }
}

/**
 * Redirects the user to the privacy policy page.
 */

function redirectToPrivacyPolicyPage(){
    window.location.href = "./privacy_policy/privacy_policy.html";
}

/**
 * Redirects the user to the legal notice page.
 */

function redirectToLegalNoticePage() {
    window.location.href = "./legal_notice/legal_notice.html";
}

/**
 * Closes the overlay element by adding the 'd-none' class to hide it.
 * 
 * @param {string} overlayId - The ID of the overlay element to close.
 */

function closeOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if (!overlay.classList.contains('d-none')) {
        overlay.classList.add('d-none');
    }
}

/**
 * Opens the overlay element by removing the 'd-none' class to make it visible.
 * 
 * @param {string} overlayId - The ID of the overlay element to open.
 */

function openOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if(overlay.classList.contains('d-none')){
        overlay.classList.remove('d-none');
    }
}

async function handlePlayIconEventListener(){
    let playIcon = document.getElementById('playIcon');
    if(playIcon){
        playIcon.addEventListener('click', async () => {
            // if(isTouch){
            //     showLoadingSpinner();
            // }
            await executeJavaScriptLoadingFilesAndInitGame();
            addAllRemainingEventListenersWhenInitGame(isTouch);
            // if(isTouch){
            //     hideLoadingSpinner();
            // }
        });
    }
}

function showLoadingSpinner(){
    let loadingOverlay = document.getElementById('loadingOverlay');
    if(loadingOverlay && loadingOverlay.style.display === 'none'){
        loadingOverlay.style.display = 'none';
    }
}

function hideLoadingSpinner() {
    let loadingOverlay = document.getElementById('loadingOverlay');
    if(loadingOverlay && loadingOverlay.style.display === 'flex'){
        loadingOverlay.style.display = 'none';
    }
}

async function executeJavaScriptLoadingFilesAndInitGame(){
    if(!gameScriptsLoaded){
        // await loadSharedGameLogic();
        await loadLogicDependingOnDeviceType();
        gameScriptsLoaded = true;
        startGame();
    }    
}

async function loadLogicDependingOnDeviceType(){
    if(isTouch){
        await loadScriptsSequentially(touchJS);
    } else {
        await loadScriptsSequentially(desktopJS);
    }
}

function loadCSS(href){
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}