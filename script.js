let gameScriptsLoaded = false;
let isExplainContainerOpen = false;
let isTouch = false;
let touchScreenVersionPath = '../templates/touch-screen-version.html';
let desktopVersionPath = '../templates/desktop-version.html';
let canvasContainerPath = '../templates/canvas-container.html';

let gameJS = [ 
    "models/drawable-object.class.js",
    "models/movable-object.class.js",
    "models/characterImages.class.js",
    "models/character.class.js",
    "models/chicken.class.js",
    "models/baby-chicken.class.js",
    "models/clouds.class.js",
    "models/background-object.class.js",
    "models/audio-manager.js",
    "models/world.class.js",
    "models/utility.js",
    "models/keyboard.class.js",
    "models/levels.class.js",
    "models/endbossImages.class.js",
    "models/endboss.class.js",
    "models/status-bar.class.js",
    "models/bottle-bar.class.js",
    "models/endboss-bar.class.js",
    "models/coin-bar.class.js",
    "models/throwable-object.class.js",
    "models/bottle.class.js",
    "models/coin.class.js",
    "levels/level1.js",
    "js/game.js"
];

let touchJS = [
    "js/audio-related.js", 
    "js/touch-device.js",
    "shared/shared.js"
];

let desktopJS = [
    "js/audio-related.js", 
    "js/desktop-device.js",
    "shared/shared.js"
];

let desktopCSS = [
    "css/index-style-overlay.css", 
    "css/index-style-canvas.css", 
    "media_queries/desktop_version/normal-desktop-size-media-query.css", 
    "media_queries/desktop_version/big-desktop-size-media-query.css"
];

let touchCSS = [
    "css/index-style-overlay-touch.css",
    "css/index-style-canvas.css",  
    "media_queries/touch_screen_version/touch-device-media-query.css", 
    "media_queries/touch_screen_version/media-queries-portrait-and-height.css"
]; 

document.addEventListener('DOMContentLoaded', async () => {
    if(isLocationIndexPage()){
        if(isTouchDevice()){
            console.log('I am in the if-statement for touch devices!');
            isTouch = true;
            loadTouchDeviceCSS();
            await loadTouchDeviceHTML();
        } else {
            console.log('I am in the if-statement for desktop devices!');
            loadDesktopDeviceCSS();
            await loadDesktopDeviceHTML();
        }
    }
});

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
    await addEventListenersToTouchDevice();
}

// Hier muss noch die Pop-Up-Funktionalität für Imprint und Privacy Policy eingebaut werden

async function addEventListenersToTouchDevice(){
    handleSettingsEventListener();    
    handleShowAllIconsEventListener();
    handlePrivacyPolicyEventListener();
    handleImprintEventListener();
    await handlePlayIconEventListener();
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

function loadSharedGameLogic(){
    return loadScriptsSequentially(gameJS);
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
            await executeJavaScriptLoadingFilesAndInitGame();
            addAllRemainingEventListenersWhenInitGame(isTouch);
        });
    }
}

async function executeJavaScriptLoadingFilesAndInitGame(){
    if(!gameScriptsLoaded){
        await loadSharedGameLogic();
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

// function addAllEventListeners(){
//     handleTouchAndDesktopSharedEventListeners();
//     handleSettingIconListener();
//     handleAllIConsMiniVersionListener();
//     handlePlayIconListener(); 
//     handleExplainGameSmallVersionIconListener(); 
//     handleImprintAndPrivacyIconListener(); 
//     handleIconSourceListener();
//     handlePrivacyListener();
//     handleImprintListener();
//     handleWinningButtonImageListener();
//     handleLosingButtonImageListener();
//     handleImprintAndPrivacyOverlayListener();
//     handleAllIconsButtonListener();
//     handleAllIconsContainerOverlayListener();
//     handleExplainGameContainerListener();
// }

// function handleSettingIconListener(){
//     let settingsIcon = document.getElementById('cartwheel-image-container');
//     if(settingsIcon){
//         settingsIcon.addEventListener('click', async () => {
//             await loadTemplate('../templates/explain-game.html', 'explain-game-container');
//             openOverlay('explain-game-container');
//         });
//     }
// }

// function handleAllIConsMiniVersionListener(){
//     let allIconsMiniVersion = document.getElementById('all-icons-container-mini-version');
//     if(allIconsMiniVersion){
//         allIconsMiniVersion.addEventListener('click', (event) => {
//             preventBubbling(event);
//         });
//         allIconsMiniVersion.querySelector('img').addEventListener('click', () => {
//             closeOverlay('all-icons-container-overlay');
//         });
//     }
// }

// function handlePlayIconListener(){
//     let playIcon = document.getElementById('playIcon');
//     playIcon.addEventListener('click', async () => {
//         startGame();
//         manageSoundIconEventListeners();
//     });
// }

// function handleExplainGameSmallVersionIconListener(){
//     let explainGameSmallVersionIcon = document.getElementById('explain-game-container-small-version');
//     explainGameSmallVersionIcon.addEventListener('click', async () => {
//         await loadTemplate('../templates/explain-game.html', 'explain-game-container');
//         openOverlay('explain-game-container');
//     });
// }

// function handleImprintAndPrivacyIconListener(){
//     let imprintAndPrivacyIcon = document.getElementById('overlay-icon-for-imprint-privacy');
//     imprintAndPrivacyIcon.addEventListener('click', async () => {
//         await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
//         openOverlay('imprint-and-privacy-policy-overlay');
//     });
// }

// function handleImprintAndPrivacyOverlayListener(){
//     let imprintAndPrivacyOverlay = document.getElementById('imprint-and-privacy-policy-overlay').querySelector('img');
//     imprintAndPrivacyOverlay.addEventListener('click', () => {
//         closeOverlay('imprint-and-privacy-policy-overlay');
//     });
// }

// function handleAllIconsButtonListener(){
//     let allIconsButton = document.querySelectorAll('.all-icons-button-container')[0];
//     allIconsButton.addEventListener('click', async () => {
//         await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
//         openOverlay('all-icons-container-overlay');
//     });
// }

// function handleAllIconsContainerOverlayListener(){
//     let allIconsContainerOverlay = document.getElementById('all-icons-container-overlay');
//     allIconsContainerOverlay.addEventListener('click', () => {
//         closeOverlay('all-icons-container-overlay');
//     });
// }

// function handleExplainGameContainerListener(){
//     let explainGameContainer = document.getElementById('explain-game-container');
//     explainGameContainer.addEventListener('click', () => {
//         closeOverlay('explain-game-container');
//     });
// }