let mqTouch = window.matchMedia('(hover: none)');
let mqDesktop = window.matchMedia('(hover: hover)');
let mqMediumDesktop = window.matchMedia('(min-width: 1025px) and (orientation: landscape)');
let mqSmallDesktop = window.matchMedia('(max-width: 1024px) and (orientation: landscape)');
let privacyOrImprintTouchActivated = false;

document.addEventListener('DOMContentLoaded', () => {
    checkDeviceForMobileOrDesktopType();
    handleAllClickEvents();
    handleKeyUpEvents();
    handleKeyDownEvents();
    handleAllTouchStartEvents();
    handleAllTouchEndEvents();
    handleAllChangeEvents();
});

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

function handleKeyUpEvents(){
    document.addEventListener('keyup', (event) => { 
        keyUpHandler(event);
    });
}

function handleKeyDownEvents(){
    document.addEventListener('keydown', (event) => { 
        keyDownHandler(event);
    });
}

function checkDeviceForMobileOrDesktopType(){
    if(isLocationWebPage('/index.html')){
        if(isTouch()){
            showUiTouchStyle();
            handleLinksImagesTouchStyle();
        } else if(!isTouch()) {
            showUiDesktopStyle();
        }
    }
}

function handleAllClickEvents(){
    document.addEventListener('click', async (event) => {
        let target = event.target;
        if(isLocationWebPage('/index.html')){
            handleClickEventsOnIndexPage(event);
        } else if(isLocationWebPage('/privacy_policy/privacy_policy.html')){
            handleClickEventsOnLinksOnPrivacyPolicyPage(target);
        } else if(isLocationWebPage('/imprint/imprint.html')){
            handleClickEventsOnLinksOnImprintPage(target);
        } else if(isEitherPlayAgainAfterWinningOrLosingPressed(target)){
            playAgain();
        } else if(wasSoundIconPressed(target)){
            turnSoundOnOrOff();
        }
    });
}

function handleClickEventsOnIndexPage(event){
    let target = event.target;
    if(isContainerTouchedOrClicked(target, '#settings-container')){
        showExplainGamePopUp();
    } else if(isOneOfDesktopButtonContainersClicked(event)){  
        showAllIconSourcesPopUp();
    } else if(isContainerTouchedOrClicked(target, '#imprint')){
        redirectToWebPage('../imprint/imprint.html');
    } else if(isContainerTouchedOrClicked(target, '#privacy')){
        redirectToWebPage('../privacy_policy/privacy_policy.html');
    } else if(isContainerTouchedOrClicked(target, '#playIcon')){
        startGameAndSetStyleForDesktopDevice();
    } else if(isSoundIconClicked(event)){
        turnSoundOnOrOff();
    }
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
        } else if(isContainerTouchedOrClicked(target, '#play-again-after-losing')){
            changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'goldenrod');
        } else if(isContainerTouchedOrClicked(target, '#play-again-after-winning')){
            changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'goldenrod');
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
            showPrivacyAndImprintOverlay();
        } else if(isContainerTouchedOrClicked(target, '#all-icons-button')){
            showAllIconSourcesPopUp();
        } else if(isContainerTouchedOrClicked(target, '#main-page-link')){
            redirectToWebPage('../index.html');
        } else if(isContainerTouchedOrClicked(target, '#play-again-after-losing')){
            changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'gold');
        } else if(isContainerTouchedOrClicked(target, '#play-again-after-winning')){
            changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'gold');
        }
    }, {passive: false});
}

function preventDefaultAndHandleAllSwitchCasesForTouchStart(event, target){
    event.preventDefault();
    handleSwitchCasesForTouchStartControlButtons(target);
}

function preventDefaultAndHandleAllSwitchCasesForTouchEnd(event, target){
    event.preventDefault();
    handleSwitchCasesForTouchEndControlButtons(target);
}

function handleSwitchCasesForTouchStartControlButtons(target){
    if(target.closest('#buttonLeft')){
        setCaseForTouchStartButtonLeft(target.closest('#buttonLeft'));
    } else if(target.closest('#buttonRight')){
        setCaseForTouchStartButtonRight(target.closest('#buttonRight'));
    } else if(wasSpacebarDivTouched(target)){
        setCaseForTouchStartSpaceBar(target.closest('#jumpButton'));
    } else if(target.closest('#buttonThrow')){
        setCaseForTouchStartButtonThrow(target.closest('#buttonThrow'));
    }
}

function handleSwitchCasesForTouchEndControlButtons(target){
    if(target.closest('#buttonLeft')){
        setCaseForTouchEndButtonLeft(target.closest('#buttonLeft'));
    } else if(target.closest('#buttonRight')){
        setCaseForTouchEndButtonRight(target.closest('#buttonRight'));
    } else if(wasSpacebarDivTouched(target)){
        setCaseForTouchEndSpaceBar(target.closest('#jumpButton'));
    } else if(target.closest('#buttonThrow')){
        setCaseForTouchEndButtonThrow(target.closest('#buttonThrow'));
    }
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