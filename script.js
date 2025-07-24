document.addEventListener('DOMContentLoaded', () => {
    checkDeviceForMobileOrDesktopType();
    handleAllClickEvents();
    handleAllTouchEventsIfUserOnIndexPage();
    handleAllChangeEvents();
    handleOrientationChange();
    handleKeyUpEvents();
    handleKeyDownEvents();
});

function handleOrientationChange(){
    screen.orientation.addEventListener('change', () => {
        window.location.reload();
    });
}

function handleAllChangeEvents(){
    mqTouch.addEventListener('change', reloadDeviceAfterTimeOut);
    mqDesktop.addEventListener('change', reloadDeviceAfterTimeOut);

    mqMediumDesktop.addEventListener('change', (event) => {
        hideLinksImagesTouchIfEventMatches(event);
    });

    mqSmallDesktop.addEventListener('change', (event) => {
        showLinksImagesTouchIfEventMatches(event);
    });
}

function showLinksImagesTouchIfEventMatches(event){
    if(event.matches){
        if(isLinksImagesTouchHidden()){
            showLinksImagesTouchVisible();
        }
    }
}

function hideLinksImagesTouchIfEventMatches(event){
    if(event.matches){
        if(isLinksImagesTouchVisible()){
            hideLinksImagesTouchVisible();
        }
    }
}

function reloadDeviceAfterTimeOut(){
    setTimeout(() => {
        reloadOnDeviceTypeSwitch();
    }, 100);
}

function setOverlayToFullViewport(){
    let overlay = document.querySelector('.explain-game-container');
    if(overlay){
        overlay.style.height = window.innerHeight + 'px';
    }
}

function checkDeviceForMobileOrDesktopType(){
    if(isLocationWebPage('/index.html')){
        if(isTouch() || (isHeightToWidthRatioBelowThreshold() && isMinHeightBelowThreshold())){
            showUiTouchStyle();
            handleLinksImagesTouchStyle();
        } else if(!isTouch()) {
            showUiDesktopStyle();
        }
    }
}

function isMinHeightBelowThreshold(){
    let minHeightThreshold = 850;
    return window.innerHeight < minHeightThreshold;
}

function isHeightToWidthRatioBelowThreshold(){
    let ratio = 0.5;
    return window.innerHeight / window.innerWidth < ratio; 
}

function handleAllClickEvents(){
    if(isLocationWebPage('/index.html')){
        handleAccordingEvents(clickEventsHandleOnIndexPage, 'click'); 
    } else if(isLocationWebPage('/privacy_policy/privacy_policy.html')){
        handleAccordingEvents(clickEventsHandleOnPrivacyPage, 'click');
    } else if(isLocationWebPage('/imprint/imprint.html')){
        handleAccordingEvents(clickEventsHandleOnImprintPage, 'click');
    }
}

function handleAllTouchEventsIfUserOnIndexPage(){
    handleAccordingEvents(touchStartEvents, 'touchstart');
    handleAccordingEvents(touchEndEvents, 'touchend');
}

async function handleAccordingEvents(eventHandler, eventType){
    document.addEventListener(`${eventType}`, (event) => {
        returnGlobalSettingsManagerDependingOnEventType(eventType, event);
        let target = event.target;
        for(let {condition, handler} of eventHandler){
            if(condition(target)){
                handler();
                break;
            }
        }
    }, {passive: false});
}

function returnGlobalSettingsManagerDependingOnEventType(eventType, event){
    if(eventType === 'touchstart'){
        settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
    } else if(eventType === 'touchend'){
        settingGlobalVariablesInKeyUpOrTouchEndEvent(event);
    } else if(eventType === 'click') {
        return ;
    }
}

function isAllIconsButtonPressed(target){
    return isContainerTouchedOrClicked(target, '#all-icons-button') || isOneOfDesktopButtonContainersClicked(target);
}

function isSettingsButtonPressed(target){
    return isContainerTouchedOrClicked(target, '#settings-container') || isContainerTouchedOrClicked(target, '#settings-container-touch');
}

// function handleAllTouchStartEvents(){
//     document.addEventListener('touchstart', (event) => {
//         let target = event.target;
//         settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
//         if(areTouchControlButtonsTouched(target)){
//             preventDefaultAndHandleAllSwitchCasesForTouchStart(event, target);
//         } else if(isContainerTouchedOrClicked(target, '#exit-game-container')){
//             setExitGameContainersButtonStyle();
//         } else if(isContainerTouchedOrClicked(target, '#main-page-link')){
//             changeMainPageLinkColorOnTouchStart();
//         } else if(isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up')){
//             setDivBackgroundColor('privacy-and-imprint-pop-up', 'gold');
//         } else if(isContainerTouchedOrClicked(target, '#all-icons-button')){
//             setDivBackgroundColor('all-icons-button', 'gold');
//         } else if(isContainerTouchedOrClicked(target, '#settings-container-touch')){
//             setDivBackgroundColor('settings-container-touch', 'gold');
//         } else if(isContainerTouchedOrClicked(target, '#play-again-after-losing')){
//             changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'goldenrod');
//         } else if(isContainerTouchedOrClicked(target, '#play-again-after-winning')){
//             changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'goldenrod');
//         } else if(isContainerTouchedOrClicked(target, '#imprint-touch')){
//             setDivBackgroundColor('imprint-touch', 'goldenrod');
//         } else if(isContainerTouchedOrClicked(target, '#privacy-touch')){
//             setDivBackgroundColor('privacy-touch', 'goldenrod');
//         }
//     }, {passive: false});
// }

// function handleAllTouchEndEvents(){
//     document.addEventListener('touchend', (event) => {
//         let target = event.target
//         settingGlobalVariablesInKeyUpOrTouchEndEvent(event);
//         if(areTouchControlButtonsTouched(target)){
//            preventDefaultAndHandleAllSwitchCasesForTouchEnd(event, target);
//         } else if(isContainerTouchedOrClicked(target, '#exit-game-container')){
//             setStyleForExitGameContainerAndResetGame();
//         } else if(isContainerTouchedOrClicked(target, '#playIcon')){
//             startGameAndSetStyleForTouchDevice();
//         } else if(isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up')){
//             setDivBackgroundAndShowPrivacyAndImprint();
//         } else if(isContainerTouchedOrClicked(target, '#all-icons-button')){
//             setDivBackgroundAndShowAllIconSources();
//         } else if(isContainerTouchedOrClicked(target, '#settings-container-touch')){
//             setDivBackgroundAndShowSettingsPopUp();
//         } else if(isContainerTouchedOrClicked(target, '#main-page-link')){
//             redirectToWebPage('../index.html');
//         } else if(isContainerTouchedOrClicked(target, '#play-again-after-losing')){
//             changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'gold');
//         } else if(isContainerTouchedOrClicked(target, '#play-again-after-winning')){
//             changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'gold');
//         } else if(isContainerTouchedOrClicked(target, '#imprint-touch')){
//             setDivBackgroundColor('imprint-touch', 'gold');
//         } else if(isContainerTouchedOrClicked(target, '#privacy-touch')){
//             setDivBackgroundColor('privacy-touch', 'gold');
//         }
//     }, {passive: false});
// }

async function setDivBackgroundAndShowPrivacyAndImprint(){
    setDivBackgroundColor('privacy-and-imprint-pop-up', 'goldenrod');
    await loadComponent(privacyImprintOverlay, 'privacy-imprint-overlay'); 
}

async function setDivBackgroundAndShowAllIconSources(){
    setDivBackgroundColor('all-icons-button', 'goldenrod');
    await loadComponent(showAllIconsPopUp, 'all-icons-container-overlay');
}

async function setDivBackgroundAndShowSettingsPopUp(){
    setDivBackgroundColor('settings-container-touch', 'goldenrod');
    await loadComponent(explainGamePopUp, 'explain-game-container'); 
}

function handleClickEventsOnLinksOnPrivacyPolicyPage(target){
    if(isContainerTouchedOrClicked(target, '#back-to-game-page')){
        redirectToWebPage('../index.html');
    } else if(isContainerTouchedOrClicked(target, '#imprint')){
        redirectToWebPage('../imprint/imprint.html');
    }
}

function handleClickEventsOnLinksOnImprintPage(target){
    if(isContainerTouchedOrClicked(target, '#back-to-game-page')){
        redirectToWebPage('../index.html');
    } else if(isContainerTouchedOrClicked(target, '#privacy')){
        redirectToWebPage('../privacy_policy/privacy_policy.html');
    }
}

function startGameAndSetStyleForTouchDevice(){
    startGame();
    settingStyleForTouchDevice();
}

function startGameAndSetStyleForDesktopDevice(){
    startGame();
    setStyleForDesktopDevice();
}