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

function showLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.remove('d-none');
    linksImagesTouch.classList.add('d-flex');
    linksImagesTouch.classList.add('d-gap');
}

function hideLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.remove('d-gap');
    linksImagesTouch.classList.remove('d-flex');
    linksImagesTouch.classList.add('d-none');
}

function isLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-flex') && linksImagesTouch.classList.contains('d-gap') && !linksImagesTouch.classList.contains('d-none');
}

function isLinksImagesTouchHidden(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-none') && !linksImagesTouch.classList.contains('d-flex') && !linksImagesTouch.classList.contains('d-gap');
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
        if(isLocationWebPage('/index.html')){
            handleClickEventsOnIndexPage(event);
        } else if(isLocationWebPage('/privacy_policy/privacy_policy.html')){
            handleClickEventsOnLinksOnPrivacyPolicyPage(event);
        } else if(isLocationWebPage('/imprint/imprint.html')){
            handleClickEventsOnLinksOnImprintPage(event);
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

function changeBackgroundOfPlayAgainButtonPressed(playAgainId, color){
    let playAgainRef = document.getElementById(`${playAgainId}`);
    playAgainRef.style.background = `${color}`;
}

function changeMainPageLinkColorOnTouchStart(){
    let mainPageLink = document.getElementById('main-page-link');
    mainPageLink.style.background = 'goldenrod';
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

function setCaseForTouchEndSpaceBar(target){
    keyboard.SPACE = false;
    world.character.isKeySpaceReleased = true;
    momentKeySpaceWasReleased = new Date().getTime();
    target.style.background = 'wheat';
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

function setCaseForTouchEndButtonThrow(target){
    world.utilityClass.checkThrowObjects();
    keyboard.keyD = false;
    target.style.background = 'wheat';
}

function setExitGameContainersButtonStyle(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.background = 'rgb(75, 61, 35)';
}

function setStyleForExitGameContainerAndResetGame(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.background = 'wheat';
    resetGame();
}

function handleClickEventsOnLinksOnPrivacyPolicyPage(event){
    let target = event.target;
    if(isContainerTouchedOrClicked(target, '#back-to-game-page')){
        redirectToWebPage('../index.html');
    } else if(isContainerTouchedOrClicked(target, '#imprint')){
        redirectToWebPage('../imprint/imprint.html');
    }
}

function handleClickEventsOnLinksOnImprintPage(event){
    let target = event.target;
    if(isContainerTouchedOrClicked(target, '#back-to-game-page')){
        redirectToWebPage('../index.html');
    } else if(isContainerTouchedOrClicked(target, '#back-to-game-page')){
        redirectToWebPage('../privacy_policy/privacy_policy.html');
    }
}

function startGameAndSetStyleForTouchDevice(){
    startGame();
    settingStyleForTouchDevice();
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

function startGameAndSetStyleForDesktopDevice(){
    startGame();
    setStyleForDesktopDevice();
}

function setStyleForDesktopDevice(){
    let uiDesktop = document.getElementById('ui-desktop');
    if(uiDesktop.style.display !== 'none' && window.innerWidth < 1024){
        uiDesktop.style.display = 'none'
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

function isTouch(){
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function reloadOnDeviceTypeSwitch(){
    window.location.reload();
}

function wasSpacebarDivTouched(target){
    return target.closest('#jumpButton') || target.closest('#buttonUp') || target.closest('spacebar');
}

function isOneOfDesktopButtonContainersClicked(event){
    return event.target.closest('#button-container') || event.target.closest('#icon-button-top');
}

/* Function to simplify the code above */

function isContainerTouchedOrClicked(target, containerRef){
    return target.closest(`${containerRef}`);
}

function areTouchControlButtonsTouched(target){
    return target.classList.contains('touched');
}

function redirectToWebPage(url){
    window.location.href = `${url}`;
}

function isLocationWebPage(url){
    return window.location.pathname.endsWith(`${url}`);
}