function hideContainerIfVisible(container){
    let containerToHide = document.getElementById(`${container}`);
    if(containerToHide){
        if(!containerToHide.classList.contains('d-none')){
            containerToHide.classList.add('d-none');
        }
    } else {
        console.log('containerToHide doesnt exist: ', container, containerToHide);
    }
}

function showContainerIfHidden(container){
    let containerToShow = document.getElementById(`${container}`);
    if(containerToShow.classList.contains('d-none')){
        containerToShow.classList.remove('d-none');
    }
}

function hideExitGameDivIfVisible(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.display = 'none';
}

function showExitGameDivIfHidden(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.display = 'flex';
}

function setContainerToFullscreenSize(divName){
    let container = document.getElementById(`${divName}`);
    container.style.width = '100dvw';
    container.style.height = '100dvh';
    container.style.overflow = 'hidden';
}

function handleLinksImagesTouchStyle(){
    showContainerIfHidden('links-images-touch');
    addFlexboxClassesToLinksImagesTouch();
}

function addFlexboxClassesToLinksImagesTouch(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.add('d-flex');
    linksImagesTouch.classList.add('d-gap');
}

function changeBackgroundOfPlayAgainButtonPressed(playAgainId, color){
    let playAgainRef = document.getElementById(`${playAgainId}`);
    playAgainRef.style.background = `${color}`;
}

function showCanvasWhenGameStarts(){
    document.getElementById('canvas-container').classList.remove('d-none');
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
    return linksImagesTouch.classList.contains('d-flex') 
    && linksImagesTouch.classList.contains('d-gap') 
    && !linksImagesTouch.classList.contains('d-none');
}

function isLinksImagesTouchHidden(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-none') 
    && !linksImagesTouch.classList.contains('d-flex') 
    && !linksImagesTouch.classList.contains('d-gap');
}

function setDivBackgroundColor(divId, color){
    let div = document.getElementById(`${divId}`);
    div.style.background = `${color}`;
}

function reloadOnDeviceTypeSwitch(){
    window.location.reload();
}

function redirectToWebPage(url){
    window.location.href = `${url}`;
}

function settingGlobalVariablesInKeyDownOrTouchStartEvent(event) {
    if(isPlayIconNotPressedAndWorldExistent(event)){
        world.character.isSoundIconInteraction = isEventOfTypeTouchAndSoundIconTriggered(event);
        if (!world.character.isSoundIconInteraction) {
            setKeyPressedVariablesRight(event);
            setWasRandomKeyOncePressed();
            someKeyWasPressedAgain = new Date().getTime();
            world.character.someKeyWasPressedAgain = someKeyWasPressedAgain;
            world.character.isKeyPressed = isKeyPressed;
            world.character.isSleeping = false;
        }
    }
}

function setWasRandomKeyOncePressed(){
    if(!wasRandomKeyOncePressed){
        wasRandomKeyOncePressed = true;
        world.character.wasRandomKeyOncePressed = wasRandomKeyOncePressed;
    }
}

function settingGlobalVariablesInKeyUpOrTouchEndEvent(event) {
    if(isPlayIconNotPressedAndWorldExistent(event)){
        isKeyPressed = false;
        lastTimeKeyPressed = new Date().getTime();
        world.character.lastTimeKeyPressed = lastTimeKeyPressed;
        world.character.isKeyPressed = isKeyPressed;
    }
}

function isPlayIconNotPressedAndWorldExistent(event){
    return !event.target.closest('#playIcon') && typeof world !== 'undefined';
}

/* All the styling functions that originally were part of game.js are located here now! */

function handleTouchStyleVersion(){
    hideContainerIfVisible('intro-image-touch');
    setContainerToFullscreenSize('canvas-container');
    setContainerToFullscreenSize('canvas');
    if(typeof world !== undefined && world){
        showContainerIfHidden('screen-control-container');
    }
}

function handleDesktopStyleDependingOnScreenSize(){
    if(window.innerWidth < 1025){
        handleLinksImagesTouchStyle();
    } else if(window.innerWidth > 1024){
        let introImageDesktop = document.getElementById('intro-image-desktop');
        if(introImageDesktop){
            hideContainerIfVisible('intro-image-desktop');
        }
    }
}

// function prepareDisplayWinningLosingStyle() {
//     hideContainerIfVisible('canvas-container');
//     hideIntroImageDependingOnUsedDevice();
// }

function changeStyleWhenLosing() {
    hideIntroImageDependingOnUsedDevice();
    showLosingImageDependingOnUsedDevice();
}

function changeStyleWhenWinning() {
    hideIntroImageDependingOnUsedDevice();
    showWinningImageDependingOnUsedDevice();
}

async function showWinningImageDependingOnUsedDevice(){
    if(!isTouch()){ 
        hideContainerIfVisible('ui-desktop');
        await showWinningImageForDesktopDevice();
    } else if(isTouch()){
        await showWinningImageForTouchDevice();
    }
}

async function showLosingImageDependingOnUsedDevice(){
    if(!isTouch()){
        hideContainerIfVisible('ui-desktop');
        await showLosingImageForDesktopDevice();
    } else if(isTouch()){
        await showLosingImageForTouchDevice();
    }
}

function prepareDisplayWinningLosingStyle() {
    hideContainerIfVisible('canvas-container');
    hideIntroImageDependingOnUsedDevice();
}

function removePaddingFromUiDesktop(){
    let uiDesktop = document.getElementById('ui-desktop');
    uiDesktop.style.paddingRight = '0';
    uiDesktop.style.paddingLeft = '0';
}

function manageTouchDeviceVsDesktopDeviceStyle(){
    if(isDesktop()){ 
        handleDesktopDeviceVersion();
    } else if(isTouch()){
        handleTouchStyleVersion();
    }
}

function isDesktop(){
    return !isTouch();
}

function handleDesktopDeviceVersion(){
    let introImageDesktop = document.getElementById('intro-image-desktop');
    if(introImageDesktop){
        hideContainerIfVisible('intro-image-desktop');
    }
    if(isBigDesktopSizeAndHasGameStarted()){
        hideExitGameDivIfVisible();
        setCanvasContainerPropertiesForBigDesktop();
        setCanvasPropertiesForBigDesktop();
        styleBigDesktopVersionProperly();
    } else if(isSmallDesktopSizeAndHasGameStarted()){
        showExitGameDivIfHidden();
        setContainerToFullscreenSize('canvas-container');
        setContainerToFullscreenSize('canvas');
    }
}

function styleBigDesktopVersionProperly(){
    setUiDesktopPaddingSizes('16px');
    showContainerIfHidden('ui-desktop');
}

function setUiDesktopPaddingSizes(size){
    let uiDesktop = document.getElementById('ui-desktop');
    uiDesktop.style.paddingRight = `${size}`;
    uiDesktop.style.paddingLeft = `${size}`;
}

function isBigDesktopSizeAndHasGameStarted(){
    return window.innerWidth > 1024 && hasGameStarted
}

function isSmallDesktopSizeAndHasGameStarted(){
    return window.innerWidth < 1025 && hasGameStarted;
}

function setStylingOfInitializedGame(){
    showCanvasWhenGameStarts();
    hideAllNeededStylingsWhenGameInitialized();
}

function hideAllNeededStylingsWhenGameInitialized(){
    hideContainerIfVisible('ui-touch');
    manageTouchDeviceVsDesktopDeviceStyle();
    removeLinksImagesTouchIfStillPresent();
}

function removeLinksImagesTouchIfStillPresent(){
    if(doesLinksImagesTouchContainsFlexboxAttributes()){
        let linksImagesTouch = document.getElementById('links-images-touch');
        linksImagesTouch.classList.remove('d-gap');
        linksImagesTouch.classList.remove('d-flex');
        linksImagesTouch.classList.add('d-none');
    }
}

function doesLinksImagesTouchContainsFlexboxAttributes(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-flex') && linksImagesTouch.classList.contains('d-gap'); 
}

function hideIntroImageDependingOnUsedDevice(){
    if(isDeviceMobileTypeOrOfSmallSize()){
        hideContainerIfVisible('intro-image-touch');
    } else if(!isDeviceMobileTypeOrOfSmallSize()) {
        let introImageDesktop = document.getElementById('intro-image-desktop');
        if(introImageDesktop){
            hideContainerIfVisible('intro-image-desktop');
        }
    }
}

function isDeviceMobileTypeOrOfSmallSize(){
    return isTouch() || window.innerWidth < 1024; 
}

function isTouch(){
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}