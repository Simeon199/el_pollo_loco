import explainGamePopUp from './pop-up-components/explain-game-container.js';
import showAllIconsPopUp from './pop-up-components/show-all-icons-pop-up.js';

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
    document.addEventListener('click', async (event) => {
        if(event.target.matches('#settings-container') || event.target.matches('.img-size')){
            let divId = 'explain-game-container';
            await loadComponent(explainGamePopUp, divId);
        } else if(event.target.matches('#button-container') || event.target.matches('#icon-button')){  
            let divId = 'all-icons-container-overlay';
            await loadComponent(showAllIconsPopUp, divId);
        }
    });
});

async function loadComponent(component, divId){
    let divRef = document.getElementById(`${divId}`);
    let response = await fetch(component.html);
    let html = await response.text();
    divRef.innerHTML = html;
    component.setUp(divRef);
}

// function isLocationIndexPage(){
//     return window.location.pathname.endsWith('/index.html');
// }

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

/*  === ALL EVENTLISTENERS HERE (TRY EVENT DELEGATION) - START === */

// function redirectToPrivacyPolicyPage(){
//     window.location.href = "./privacy_policy/privacy_policy.html";
// }

// function redirectToLegalNoticePage() {
//     window.location.href = "./legal_notice/legal_notice.html";
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