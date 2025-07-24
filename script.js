let mqTouch = window.matchMedia('(hover: none)');
let mqDesktop = window.matchMedia('(hover: hover)');
let mqMediumDesktop = window.matchMedia('(min-width: 1025px) and (orientation: landscape)');
let mqSmallDesktop = window.matchMedia('(max-width: 1024px) and (orientation: landscape)');
let privacyOrImprintTouchActivated = false;

document.addEventListener('DOMContentLoaded', () => {
    checkDeviceForMobileOrDesktopType();
    handleAllClickEvents();
    handleAllTouchStartEvents();
    handleAllTouchEndEvents();
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
    mqTouch.addEventListener('change', () => {
        setTimeout(() => {
            reloadOnDeviceTypeSwitch();
        }, 100);
    });
    mqDesktop.addEventListener('change', () => {
        setTimeout(() => {
            reloadOnDeviceTypeSwitch();
        }, 100);
    });
    mqMediumDesktop.addEventListener('change', (event) => {
        if(event.matches){
            if(isLinksImagesTouchVisible()){
                hideLinksImagesTouchVisible();
            }
        }
    });
    mqSmallDesktop.addEventListener('change', (event) => {
        if(event.matches){
            if(isLinksImagesTouchHidden()){
                showLinksImagesTouchVisible();
            }
        }
    });
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
        handleAccordingClickEvents(clickEventsHandleOnIndexPage); 
    } else if(isLocationWebPage('/privacy_policy/privacy_policy.html')){
        handleAccordingClickEvents(clickEventsHandleOnPrivacyPage);
    } else if(isLocationWebPage('/imprint/imprint.html')){
        handleAccordingClickEvents(clickEventsHandleOnImprintPage);
    }
}

async function handleAccordingClickEvents(eventHandler){
    document.addEventListener('click', (event) => {
        let target = event.target;
        for(let {condition, handler} of eventHandler){
            if(condition(target)){
                handler();
                break;
            }
        }
    }, {passive: false});
}


// Ursprüngliche Versionen 

// function handleAllClickEvents(){
//     document.addEventListener('click', async (event) => {
//         let target = event.target;
//         if(isLocationWebPage('/index.html')){
//             handleClickEventsOnIndexPage(target); // event
//         } else if(isLocationWebPage('/privacy_policy/privacy_policy.html')){
//             handleClickEventsOnLinksOnPrivacyPolicyPage(target);
//         } else if(isLocationWebPage('/imprint/imprint.html')){
//             handleClickEventsOnLinksOnImprintPage(target);
//         } 
//     });
// }

// async function handleClickEventsOnIndexPage(event){
//     if(isSettingsButtonPressed(target)){
//         await loadComponent(explainGamePopUp, 'explain-game-container');
//     } else if(isAllIconsButtonPressed(target)){ 
//         await loadComponent(showAllIconsPopUp, 'all-icons-container-overlay');
//     } else if(isContainerTouchedOrClicked(target, '#imprint')){
//         redirectToWebPage('../imprint/imprint.html');
//     } else if(isContainerTouchedOrClicked(target, '#privacy')){
//         redirectToWebPage('../privacy_policy/privacy_policy.html');
//     } else if(isContainerTouchedOrClicked(target, '#playIcon')){
//         startGameAndSetStyleForDesktopDevice();
//     } else if(isContainerTouchedOrClicked(target, '#exit-game-container')){
//         setStyleForExitGameContainerAndResetGame();
//     } else if(isContainerTouchedOrClicked(target, '#main-page-link')){
//         redirectToWebPage('../index.html');
//     } else if(isSoundIconClicked(target)){
//         turnSoundOnOrOff();
//     } else if(isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up')){
//         await loadComponent(privacyImprintOverlay, 'privacy-imprint-overlay');
//     } 
// }

function isAllIconsButtonPressed(target){
    return isContainerTouchedOrClicked(target, '#all-icons-button') || isOneOfDesktopButtonContainersClicked(target);
}

function isSettingsButtonPressed(target){
    return isContainerTouchedOrClicked(target, '#settings-container') || isContainerTouchedOrClicked(target, '#settings-container-touch');
}

function handleAllTouchStartEvents(){
    document.addEventListener('touchstart', (event) => {
        let target = event.target;
        settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
        if(areTouchControlButtonsTouched(target)){
            preventDefaultAndHandleAllSwitchCasesForTouchStart(event, target);
        } else if(isContainerTouchedOrClicked(target, '#exit-game-container')){
            setExitGameContainersButtonStyle();
        } else if(isContainerTouchedOrClicked(target, '#main-page-link')){
            changeMainPageLinkColorOnTouchStart();
        } else if(isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up')){
            setDivBackgroundColor('privacy-and-imprint-pop-up', 'gold');
        } else if(isContainerTouchedOrClicked(target, '#all-icons-button')){
            setDivBackgroundColor('all-icons-button', 'gold');
        } else if(isContainerTouchedOrClicked(target, '#settings-container-touch')){
            setDivBackgroundColor('settings-container-touch', 'gold');
        } else if(isContainerTouchedOrClicked(target, '#play-again-after-losing')){
            changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'goldenrod');
        } else if(isContainerTouchedOrClicked(target, '#play-again-after-winning')){
            changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'goldenrod');
        } else if(isContainerTouchedOrClicked(target, '#imprint-touch')){
            setDivBackgroundColor('imprint-touch', 'goldenrod');
        } else if(isContainerTouchedOrClicked(target, '#privacy-touch')){
            setDivBackgroundColor('privacy-touch', 'goldenrod');
        }
    }, {passive: false});
}

function handleAllTouchEndEvents(){
    document.addEventListener('touchend', (event) => {
        let target = event.target
        settingGlobalVariablesInKeyUpOrTouchEndEvent(event);
        if(areTouchControlButtonsTouched(target)){
           preventDefaultAndHandleAllSwitchCasesForTouchEnd(event, target);
        } else if(isContainerTouchedOrClicked(target, '#exit-game-container')){
            setStyleForExitGameContainerAndResetGame();
        } else if(isContainerTouchedOrClicked(target, '#playIcon')){
            startGameAndSetStyleForTouchDevice();
        } else if(isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up')){
            setDivBackgroundColor('privacy-and-imprint-pop-up', 'goldenrod');
            showPrivacyAndImprintOverlay();
        } else if(isContainerTouchedOrClicked(target, '#all-icons-button')){
            setDivBackgroundColor('all-icons-button', 'goldenrod');
            showAllIconSourcesPopUp();
        } else if(isContainerTouchedOrClicked(target, '#settings-container-touch')){
            setDivBackgroundColor('settings-container-touch', 'goldenrod');
            showExplainGamePopUp();
        } else if(isContainerTouchedOrClicked(target, '#main-page-link')){
            redirectToWebPage('../index.html');
        } else if(isContainerTouchedOrClicked(target, '#play-again-after-losing')){
            changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'gold');
        } else if(isContainerTouchedOrClicked(target, '#play-again-after-winning')){
            changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'gold');
        } else if(isContainerTouchedOrClicked(target, '#imprint-touch')){
            setDivBackgroundColor('imprint-touch', 'gold');
        } else if(isContainerTouchedOrClicked(target, '#privacy-touch')){
            setDivBackgroundColor('privacy-touch', 'gold');
        }
    }, {passive: false});
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