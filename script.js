// === CURRENTLY UNUSED FLAGS - START ===

// let isSoundIconInteraction = false;
// let timePassedWhenKeyReleased;
// let timeDifferenceBetweenKeyDPressedReleased = 0;
// let timeDifferenceBetweenKeyDReleasedAndLaterPressed = 0;
// let momentKeySpaceWasPressed = 0;
// let momentKeySpaceWasReleased = 0;

// === CURRENTLY UNUSED FLAGS - END ===

let gameScriptsLoaded = false;
let isExplainContainerOpen = false;
let isTouch = false;
let touchScreenVersionPath = '../templates/touch-screen-version.html';
let desktopVersionPath = '../templates/desktop-version.html';
let canvasContainerPath = '../templates/canvas-container.html';

document.addEventListener('DOMContentLoaded', async () => {
    await initDeviceHTMLAndLogic();
    reloadSiteIfDeviceTypeSwitches();

    document.addEventListener('click', () => {
        console.log('Hier Event Delegation');
    })
});

async function initDeviceHTMLAndLogic(){
    if(isLocationIndexPage()){
        if(isTouchDevice()){
            await setUpTouchDevice();
        } else {
            await setUpDesktopDevice();
        }
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

async function setUpTouchDevice(){
    isTouch = true;
    loadBundledCSS('dist/touch.bundle.min.css');
    await includeHTML('include-touch-html');
    await addEventListenersToTouchDevice();
    await loadBundledJS('dist/touch.bundle.min.js');
}

async function setUpDesktopDevice(){
    loadBundledCSS('dist/desktop.bundle.min.css');
    await includeHTML('include-desktop-html');
    await addEventListenersToDesktopDevice();
    await loadBundledJS('dist/desktop.bundle.min.js');
}

async function includeHTML(deviceTypeHTML){
    let includeElements = document.querySelectorAll(`[${deviceTypeHTML}]`);
    for(let i=0; i < includeElements.length; i++){
        let element = includeElements[i];
        let file = element.getAttribute(`${deviceTypeHTML}`);
        let resp = await(fetch(file));
        if(resp.ok){
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

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

/*  === ALL EVENTLISTENERS HERE (TRY EVENT DELEGATION) - START === */

async function addEventListenersToDesktopDevice(){
    handleSettingsEventListener();    
    handleShowAllIconsEventListener();
    handlePrivacyPolicyEventListener();
    handleImprintEventListener();
    await handlePlayIconEventListener();
}

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

async function handlePlayIconEventListener(){
    let playIcon = document.getElementById('playIcon');
    if(playIcon){
        playIcon.addEventListener('click', async () => {
            await executeJavaScriptLoadingFilesAndInitGame();
            addAllRemainingEventListenersWhenInitGame(isTouch);
        });
    }
}

/*  === ALL EVENTLISTENERS HERE (TRY EVENT DELEGATION) - START === */

function removeDivElementFromDOM(id){
    let divElement = document.getElementById(id);
    if(divElement && divElement.children.length === 0){
        divElement.remove();
    }
}

function redirectToPrivacyPolicyPage(){
    window.location.href = "./privacy_policy/privacy_policy.html";
}

function redirectToLegalNoticePage() {
    window.location.href = "./legal_notice/legal_notice.html";
}

function closeOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if (!overlay.classList.contains('d-none')) {
        overlay.classList.add('d-none');
    }
}

function openOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if(overlay.classList.contains('d-none')){
        overlay.classList.remove('d-none');
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
        gameScriptsLoaded = true;
        startGame();
    }    
}