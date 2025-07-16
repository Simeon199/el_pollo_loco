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
    // handleAllChangeEvents();
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
    if(isLocationIndexPage()){
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
        if(isLocationIndexPage()){
            handleClickEventsOnIndexPage(event);
        } else if(isLocationPrivacyPolicy()){
            handleClickEventsOnLinksOnPrivacyPolicyPage(event);
        } else if(isLocationImprintPage()){
            handleClickEventsOnLinksOnImprintPage(event);
        }
    });
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
        } else if(isExitGameContainerTouched(target)){
            setExitGameContainersButtonStyle(target);
        }
    }, {passive: false});
}

function handleAllTouchEndEvents(){
    document.addEventListener('touchend', (event) => {
        let target = event.target
        settingGlobalVariablesInKeyUpOrTouchEndEvent(event);
        if(areTouchControlButtonsTouched(target)){
           preventDefaultAndHandleAllSwitchCasesForTouchEnd(event, target);
        } else if(isExitGameContainerTouched(target)){
            setStyleForExitGameContainerAndResetGame(target);
        } else if(isPlayIconTouched(target)){
            startGameAndSetStyleForTouchDevice();
        } else if(isPrivacyAndImprintButtonTouched(target)){
            showPrivacyAndImprintOverlay();
        } else if(isAllIconButtonContainerTouched(target)){
            showAllIconSourcesPopUp();
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

function setExitGameContainersButtonStyle(target){
    target.style.background = 'rgb(75, 61, 35)';
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

function setStyleForExitGameContainerAndResetGame(target){
    target.style.background = 'wheat';
    resetGame();
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

function redirectToImprintPage() {
    window.location.href = "../imprint/imprint.html";
}

function redirectToPrivacyPolicyPage(){
    window.location.href = "../privacy_policy/privacy_policy.html";
}

function redirectToPlayPage() {
    window.location.href = "../index.html";
}

function reloadOnDeviceTypeSwitch(){
    window.location.reload();
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

function isPlayIconClicked(event){
    return event.target.closest('#playIcon');
}

function areTouchControlButtonsTouched(target){
    return target.classList.contains('touched');
}

function isExitGameContainerTouched(target){
    return target.closest('#exit-game-container');
}

function isPlayIconTouched(target){
    return target.closest('#playIcon');
}

function isPrivacyAndImprintButtonTouched(target){
    return target.closest('#privacy-and-imprint-pop-up');
}

function isAllIconButtonContainerTouched(target){
    return target.closest('.all-icons-button-container');
}