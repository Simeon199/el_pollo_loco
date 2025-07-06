import explainGamePopUp from './components/explain-game-container.js';
import showAllIconsPopUp from './components/show-all-icons-pop-up.js';

// === CURRENTLY UNUSED FLAGS - START ===

// let isSoundIconInteraction = false;
// let timePassedWhenKeyReleased;
// let timeDifferenceBetweenKeyDPressedReleased = 0;
// let timeDifferenceBetweenKeyDReleasedAndLaterPressed = 0;
// let momentKeySpaceWasPressed = 0;
// let momentKeySpaceWasReleased = 0;

// === CURRENTLY UNUSED FLAGS - END ===

// let gameScriptsLoaded = false;
// let isExplainContainerOpen = false;
// let isTouch = false;
// let touchScreenVersionPath = '../templates/touch-screen-version.html';
// let desktopVersionPath = '../templates/desktop-version.html';
// let canvasContainerPath = '../templates/canvas-container.html';

document.addEventListener('DOMContentLoaded', () => {
   handleAllClickEvents();
   handleAllTouchStartEvents();
   handleAllTouchEndEvents();
});

function handleAllClickEvents(){
    document.addEventListener('click', async (event) => {
        if(isLocationIndexPage()){
            handleClickEventsOnIndexPage(event);
        } else if(isLocationPrivacyPolicy()){
            handleClickEventsOnLinksOnPrivacyPolicyPage(event);
        } else if(isLocationImprintPage()){
            handleClickEventsOnLinksOnImprintPage(event);
        }
    });
}

function handleAllTouchStartEvents(){
    document.addEventListener('touchstart', (event) => {
        let target = event.target;
        if(areTouchControlButtonsTouched(target)){
            preventDefaultAndHandleAllSwitchCasesForTouchStart(event, target);
        } else if(isExitGameContainerTouched(target)){
            setExitGameContainersButtonStyle(target);
        }
    }, {passive: false});
}

function preventDefaultAndHandleAllSwitchCasesForTouchStart(event, target){
    event.preventDefault();
    handleSwitchCasesForTouchStartControlButtons(target);
}

function setExitGameContainersButtonStyle(target){
    target.style.background = 'rgb(75, 61, 35)';
}

function handleAllTouchEndEvents(){
    document.addEventListener('touchend', (event) => {
        let target = event.target
        if(areTouchControlButtonsTouched(target)){
           preventDefaultAndHandleAllSwitchCasesForTouchEnd(event, target);
        } else if(isExitGameContainerTouched(target)){
            setStyleForExitGameContainerAndResetGame(target);
        } else if(isPlayIconTouched(target)){
            startGameAndSetStyleForTouchDevice();
        }
    }, {passive: false});
}

function preventDefaultAndHandleAllSwitchCasesForTouchEnd(event, target){
     event.preventDefault();
     handleSwitchCasesForTouchEndControlButtons(target);
}

function setStyleForExitGameContainerAndResetGame(target){
    target.style.background = 'wheat';
    resetGame();
}

function isPlayIconTouched(target){
    return target.closest('#playIcon');
}

function startGameAndSetStyleForTouchDevice(){
    startGame();
    settingStyleForTouchDevice();
}

function areTouchControlButtonsTouched(target){
    return target.classList.contains('touch-control');
}

function isExitGameContainerTouched(target){
    return target.closest('#exit-game-container');
}

function handleSwitchCasesForTouchStartControlButtons(target){
    switch(target.id){
        case 'buttonLeft':
            setCaseForTouchStartButtonLeft(target);
            break;
        case 'buttonRight':
            setCaseForTouchStartButtonRight(target);
            break;
        case 'buttonUp':
        case 'spacebar':
            setCaseForTouchStartSpaceBar(target);
            break;
        case 'buttonThrow':
            setCaseForTouchStartButtonThrow(target)
            break;
    }
}

function setCaseForTouchStartButtonLeft(target){
    prepareForThrowingLeft();
    target.style.background = 'rgb(75, 61, 35)';
}

function setCaseForTouchStartButtonRight(target){
    prepareForThrowingRight();
    target.style.background = 'rgb(75, 61, 35)';
}

function setCaseForTouchStartSpaceBar(target){
    keyboard.SPACE = true;
    target.style.background = 'rgb(75, 61, 35)';
}

function setCaseForTouchStartButtonThrow(target){
    keyboard.keyD = true;
    target.style.background = 'rgb(75, 61, 35)';
}

function handleSwitchCasesForTouchEndControlButtons(target){
    switch(target.id){
        case 'buttonLeft':
            setCaseForTouchEndButtonLeft(target);
            break;
        case 'buttonRight':
            setCaseForTouchEndButtonRight(target);
            break;
        case 'buttonUp':
        case 'spacebar':
            setCaseForTouchEndSpaceBar(target);
            break;
        case 'buttonThrow':
            setCaseForTouchEndButtonThrow(target);
            break;
    }
}

function setCaseForTouchEndButtonLeft(target){
    keyboard.LEFT = false;
    world.audioManager.muteSound(true, 'walking_sound');
    target.style.background = 'wheat';
}

function setCaseForTouchEndButtonRight(target){
    keyboard.RIGHT = false;
    world.audioManager.muteSound(true, 'walking_sound');
    target.style.background = 'wheat';
}

function setCaseForTouchEndSpaceBar(target){
    keyboard.SPACE = false;
    world.character.isKeySpaceReleased = true;
    momentKeySpaceWasReleased = new Date().getTime();
    target.style.background = 'wheat';
}

function setCaseForTouchEndButtonThrow(target){
    world.utilityClass.checkThrowObjects();
    keyboard.keyD = false;
    target.style.background = 'wheat';
}

function handleClickEventsOnIndexPage(event){
    if(isSettingsDesktopContainerClicked(event)){
        showExplainGamePopUp();
    } else if(isOneOfDesktopButtonContainersClicked(event)){  
        showAllIconSourcesPopUp();
    } else if(isDesktopImprintLinkClicked(event)){
        redirectToImprintPage();
    } else if(isDesktopPrivacyPolicyLinkClicked(event)){
        redirectToPrivacyPolicyPage();
    } else if(isPlayIconClicked(event)){
        startGame();
    } else if(isSoundIconClicked(event)){
        turnSoundOnOrOff();
    }
}

function isSoundIconClicked(event){
    if(event.target.closest('#sound-on-icon')){
        showTurningSoundOffIcon();
    } else if(event.target.closest('#sound-off-icon')){
        showTurningSoundOnIcon()
    }
    return event.target.closest('#sound-on-icon') || event.target.closest('#sound-off-icon');
}

function isPlayIconClicked(event){
    return event.target.closest('#playIcon')
}

function handleClickEventsOnLinksOnPrivacyPolicyPage(event){
    if(isBackToGameContainerClicked(event)){
        redirectToPlayPage();
    } else if(isDesktopImprintLinkClicked(event)){
        redirectToImprintPage();
    }
}

function handleClickEventsOnLinksOnImprintPage(event){
    if(isBackToGameContainerClicked(event)){
        redirectToPlayPage();
    } else if(isDesktopPrivacyPolicyLinkClicked(event)){
        redirectToPrivacyPolicyPage();
    }
}

async function showAllIconSourcesPopUp(){
    let divId = 'all-icons-container-overlay';
    await loadComponent(showAllIconsPopUp, divId);
}

async function loadComponent(component, divId){
    let divRef = document.getElementById(`${divId}`);
    let response = await fetch(component.html);
    let html = await response.text();
    divRef.innerHTML = html;
    component.setUp(divRef);
}

async function showExplainGamePopUp(){
    let divId = 'explain-game-container';
    await loadComponent(explainGamePopUp, divId);
}

/**
 * Redirects the user to the play page.
 */

function redirectToPlayPage() {
    window.location.href = "../index.html";
}

function isBackToGameContainerClicked(event){
    return event.target.closest('#back-to-game-page');
}

function isSettingsDesktopContainerClicked(event){
    return event.target.closest('#settings-container');
}

function isOneOfDesktopButtonContainersClicked(event){
    return event.target.closest('#button-container') || event.target.closest('#icon-button-top');
}

function isDesktopImprintLinkClicked(event){
    return event.target.closest('#imprint');
}

function isDesktopPrivacyPolicyLinkClicked(event){
    return event.target.closest('#privacy');
}

function redirectToImprintPage() {
    window.location.href = "../imprint/imprint.html";
}

function redirectToPrivacyPolicyPage(){
    window.location.href = "../privacy_policy/privacy_policy.html";
}

function isLocationIndexPage(){
    return window.location.pathname.endsWith('/index.html');
}

function isLocationPrivacyPolicy(){
    return window.location.pathname.endsWith('/privacy_policy/privacy_policy.html');
}

function isLocationImprintPage(){
    return window.location.pathname.endsWith('/imprint/imprint.html');
}

/* NEW METHODS FOR BUNDLED FILES - START */

// function loadBundledJS(jsPath){
//     return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = jsPath;
//         script.defer = true;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.head.appendChild(script);
//     });
// }

// function loadBundledCSS(cssPath){
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = cssPath;
//     document.head.appendChild(link);
// }

/* NEW METHODS FOR BUNDLED FILES - FINISH */

/*  === ALL EVENTLISTENERS HERE (TRY EVENT DELEGATION) - START === */

// async function handlePlayIconEventListener(){
//     let playIcon = document.getElementById('playIcon');
//     if(playIcon){
//         playIcon.addEventListener('click', async () => {
//             await executeJavaScriptLoadingFilesAndInitGame();
//             addAllRemainingEventListenersWhenInitGame(isTouch);
//         });
//     }
// }

// function showLoadingSpinner(){
//     let loadingOverlay = document.getElementById('loadingOverlay');
//     if(loadingOverlay && loadingOverlay.style.display === 'none'){
//         loadingOverlay.style.display = 'none';
//     }
// }

// function hideLoadingSpinner() {
//     let loadingOverlay = document.getElementById('loadingOverlay');
//     if(loadingOverlay && loadingOverlay.style.display === 'flex'){
//         loadingOverlay.style.display = 'none';
//     }
// }

// async function executeJavaScriptLoadingFilesAndInitGame(){
//     if(!gameScriptsLoaded){
//         gameScriptsLoaded = true;
//         startGame();
//     }    
// }

/* === ALL METHODS FROM SHARED.JS === */

// function preventBubbling(event) {
//     event.stopPropagation();
// }

// function hideCanvasContainer() { 
//     document.getElementById('canvas-container').style.display = 'none';
// }

// function changeStyleWhenLosing() {
//     hideIntroImageIfVisible();
//     handleRemainingStyleInCaseOfLosing();
// }

// function handleRemainingStyleInCaseOfLosing(){
//     document.getElementById('losing-image').style.display = 'flex';
//     document.getElementById('losing-image').classList.add('losing-image-properties');
//     document.getElementById('main-title').style.display = 'none';
// }

// function hideIntroImageIfVisible(){
//     if (isIntroImageVisible()) {
//         document.getElementById('intro-image').style.display = 'none';
//     }
// }

// function isIntroImageVisible(){
//     return document.getElementById('intro-image').style.display !== 'none';
// }

// function changeStyleWhenWinning() {
//     hideIntroImageIfVisible();
//     handleRemainingStyleInCaseOfWinning();
// }

// function handleRemainingStyleInCaseOfWinning(){
//     document.getElementById('winning-image').style.display = 'flex';
//     document.getElementById('winning-image').classList.add('winning-image-properties');
//     document.getElementById('main-title').style.display = 'none';
// }

// function manageStyleWhenGameIsStopped() { // string
//     clearAllIntervals();
//     stopAllSounds();
//     isGamePlaying = false;
//     document.getElementById('canvas').style.display = 'none';
//     hideCanvasContainer();
//     exitFullscreen();
// }

// function manageStyleDependingOnWinndingOrLosing(string) {
//     prepareDisplayWinningLosingStyle();
//     if (string === 'losing') {
//         changeStyleWhenLosing(string);
//     } else if (string === 'winning') {
//         changeStyleWhenWinning(string);
//     } else {
//         resetGame();
//     }
// }

// function prepareDisplayWinningLosingStyle() {
//     document.getElementById('overlay').style.display = 'flex';
//     if (document.getElementById('intro-image').style.display !== 'none') {
//         document.getElementById('intro-image').style.display = 'none';
//     }
// }

// function settingUpStyleWhenPlayAgainButtonPressed() {
//     setCanvasContainerVisibleIfHidden();
//     setCanvasVisibleIfHidden();
//     hideLosingImageIfVisible();
//     hideWinningImageIfVisible();
//     setMainTitleVisibleIfDesktopDevice();
// }

// function setCanvasContainerVisibleIfHidden(){
//     if(isCanvasContainerHidden()){
//         document.getElementById('canvas-container').style.display = 'flex';
//     }
// }

// function isCanvasContainerHidden(){
//     return document.getElementById('canvas-container').style.display === 'none';
// }

// function setCanvasVisibleIfHidden(){
//     if(isCanvasHidden()){
//         document.getElementById('canvas').style.display = 'block';
//     }
// }

// function isCanvasHidden(){
//     return document.getElementById('canvas').style.display === 'none';
// }

// function hideLosingImageIfVisible(){
//     if(isLosingImageVisible()){
//         document.getElementById('losing-image').style.display = 'none'
//     }
// }

// function isLosingImageVisible(){
//     return document.getElementById('losing-image').style.display !== 'none';
// }

// function hideWinningImageIfVisible(){
//     if(isWinningImageVisible()){
//         document.getElementById('winning-image').style.display = 'none';
//     }
// }

// function isWinningImageVisible(){
//     return document.getElementById('winning-image').style.display !== 'none';
// }

// function setMainTitleVisibleIfDesktopDevice(){
//     if (!isTouch) {
//         document.getElementById('main-title').style.display = 'block';
//     }
// }