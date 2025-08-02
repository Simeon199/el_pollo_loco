/**
 * Loads an HTML component into a specified div and calls its setup function.
 * @param {{html: string, setUp: function(Element): void}} component - The component object with an HTML URL and setup function.
 * @param {string} divId - The ID of the div to load the component into.
 * @returns {Promise<void>} Resolves when the component is loaded and set up.
 */

async function loadComponent(component, divId){
    let divRef = document.getElementById(`${divId}`);
    if(divRef){
        let response = await fetch(component.html);
        let html = await response.text();
        divRef.innerHTML = html;
        component.setUp(divRef);
    } 
}

/**
 * Hides a container if it is currently visible (does not have 'd-none' class).
 * @param {string} container - The id of the container to hide.
 */

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

/**
 * Shows a container if it is currently hidden (has 'd-none' class).
 * @param {string} container - The id of the container to show.
 */

function showContainerIfHidden(container){
    let containerToShow = document.getElementById(`${container}`);
    if(containerToShow.classList.contains('d-none')){
        containerToShow.classList.remove('d-none');
    }
}

/**
 * Sets the inline display style of a container element.
 * @param {string} divRef - The id of the div to update.
 * @param {string} displayStyle - The display style to set (e.g., 'flex', 'none', 'block').
 */

function toggleContainerVisibilityThroughInlineStyling(divRef, displayStyle){
    let div = document.getElementById(`${divRef}`);
    div.style.display = `${displayStyle}`;
}

/**
 * Hides the exit game container by setting its display to 'none'.
 */

function hideExitGameDivIfVisible(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.display = 'none';
}

/**
 * Shows the exit game container by setting its display to 'flex'.
 */

function showExitGameDivIfHidden(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.display = 'flex';
}

/**
 * Sets a container to fullscreen size using 100dvw and 100dvh.
 * @param {string} divName - The id of the container to resize.
 */

function setContainerToFullscreenSize(divName){
    let container = document.getElementById(`${divName}`);
    container.style.width = '100dvw';
    container.style.height = '100dvh';
    container.style.overflow = 'hidden';
}

/**
 * Shows the 'links-images-touch' container and adds flexbox classes to it.
 */

function handleLinksImagesTouchStyle(){
    showContainerIfHidden('links-images-touch');
    addFlexboxClassesToLinksImagesTouch();
}

/**
 * Adds flexbox and gap classes to the 'links-images-touch' container.
 */

function addFlexboxClassesToLinksImagesTouch(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.add('d-flex');
    linksImagesTouch.classList.add('d-gap');
}

/**
 * Changes the background color of the play again button.
 * @param {string} playAgainId - The id of the play again button.
 * @param {string} color - The color to set as background.
 */

function changeBackgroundOfPlayAgainButtonPressed(playAgainId, color){
    let playAgainRef = document.getElementById(`${playAgainId}`);
    playAgainRef.style.background = `${color}`;
}

/**
 * Shows the canvas container when the game starts.
 */

function showCanvasWhenGameStarts(){
    document.getElementById('canvas-container').classList.remove('d-none');
}

/**
 * Shows the 'links-images-touch' container and adds flexbox and gap classes.
 */

function showLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.remove('d-none');
    linksImagesTouch.classList.add('d-flex');
    linksImagesTouch.classList.add('d-gap');
}

/**
 * Hides the 'links-images-touch' container and removes flexbox and gap classes.
 */

function hideLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.remove('d-gap');
    linksImagesTouch.classList.remove('d-flex');
    linksImagesTouch.classList.add('d-none');
}

/**
 * Sets the background color of a div.
 * @param {string} divId - The id of the div.
 * @param {string} color - The color to set as background.
 */

function setDivBackgroundColor(divId, color){
    let div = document.getElementById(`${divId}`);
    div.style.background = `${color}`;
}

/**
 * Reloads the page (used when device type switches).
 */

function reloadOnDeviceTypeSwitch(){
    window.location.reload();
}

/**
 * Redirects the browser to a given URL.
 * @param {string} url - The URL to redirect to.
 */

function redirectToWebPage(url){
    window.location.href = `${url}`;
}

/**
 * Sets global variables when a key is pressed or a touch starts.
 * @param {Event} event - The event object.
 */

function settingGlobalVariablesInKeyDownOrTouchStartEvent(event) {
    if(isPlayIconNotPressedAndWorldExistent(event)){
        setIsSoundIconInteractionInCharacterClass(event);
        if(soundIconWasNotPressed()) {
            setRemainingVariablesIfSoundIconWasNotPressed(event);
        }
    }
}

/**
 * Sets remaining global variables if the sound icon was not pressed.
 * @param {Event} event - The event object.
 */

function setRemainingVariablesIfSoundIconWasNotPressed(event){
    setKeyPressedVariablesRight(event);
    someKeyWasPressedAgain = new Date().getTime();
    world.character.wasRandomKeyOncePressed = wasRandomKeyOncePressed;
    world.character.someKeyWasPressedAgain = someKeyWasPressedAgain;
    world.character.isKeyPressed = isKeyPressed;
    world.character.isSleeping = false;
}

/**
 * Sets the isSoundIconInteraction property in the character class.
 * @param {Event} event - The event object.
 */

function setIsSoundIconInteractionInCharacterClass(event){
    world.character.isSoundIconInteraction = isEventOfTypeTouchAndSoundIconTriggered(event);
}

/**
 * Sets global variables when a key is released or a touch ends.
 * @param {Event} event - The event object.
 */

function settingGlobalVariablesInKeyUpOrTouchEndEvent(event) {
    if(isPlayIconNotPressedAndWorldExistent(event)){
        isKeyPressed = false;
        lastTimeKeyPressed = new Date().getTime();
        world.character.lastTimeKeyPressed = lastTimeKeyPressed;
        world.character.isKeyPressed = isKeyPressed;
    }
}

/**
 * Handles the touch style version by hiding/showing relevant containers and setting fullscreen size.
 */

function handleTouchStyleVersion(){
    hideContainerIfVisible('intro-image-touch');
    setContainerToFullscreenSize('canvas-container');
    setContainerToFullscreenSize('canvas');
    if(isWorldDefinedAndExistent()){
        showContainerIfHidden('screen-control-container');
    }
}

/**
 * Handles desktop style depending on the screen size.
 */

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

/**
 * Changes the style when the player loses the game.
 */

function changeStyleWhenLosing() {
    hideIntroImageDependingOnUsedDevice();
    showLosingImageDependingOnUsedDevice();
}

/**
 * Changes the style when the player wins the game.
 */

function changeStyleWhenWinning() {
    hideIntroImageDependingOnUsedDevice();
    showWinningImageDependingOnUsedDevice();
}

/**
 * Shows the winning image depending on the device type.
 */

async function showWinningImageDependingOnUsedDevice(){
    if(!isTouch()){ 
        hideContainerIfVisible('ui-desktop');
        await loadComponent(winningOverlay, 'winning-overlay');
    } else if(isTouch()){
        await loadComponent(winningOverlay, 'winning-overlay');
    }
}

/**
 * Shows the losing image depending on the device type.
 */

async function showLosingImageDependingOnUsedDevice(){
    if(!isTouch()){
        hideContainerIfVisible('ui-desktop');
        await loadComponent(losingOverlay, 'losing-overlay');
    } else if(isTouch()){
        await loadComponent(losingOverlay, 'losing-overlay');
    }
}

/**
 * Prepares the display for winning or losing by hiding relevant containers.
 */

function prepareDisplayWinningLosingStyle() {
    hideContainerIfVisible('canvas-container');
    hideIntroImageDependingOnUsedDevice();
}

/**
 * Removes padding from the UI desktop container.
 */

function removePaddingFromUiDesktop(){
    let uiDesktop = document.getElementById('ui-desktop');
    uiDesktop.style.paddingRight = '0';
    uiDesktop.style.paddingLeft = '0';
}

/**
 * Manages the style for touch vs desktop devices.
 */

function manageTouchDeviceVsDesktopDeviceStyle(){
    if(isDesktop()){ 
        handleDesktopDeviceVersion();
    } else if(isTouch()){
        handleTouchStyleVersion();
    }
}

/**
 * Handles the desktop device version by hiding the intro image and applying the correct desktop size version.
 */

function handleDesktopDeviceVersion(){
    hideIntroImageDesktopIfItExists();
    handleDifferentDesktopSizeVersions();
}

/**
 * Hides the desktop intro image if it exists in the DOM.
 */

function hideIntroImageDesktopIfItExists(){
    let introImageDesktop = document.getElementById('intro-image-desktop');
    if(introImageDesktop){
        hideContainerIfVisible('intro-image-desktop');
    }
}

/**
 * Handles different desktop size versions by applying the appropriate layout for big or small desktops.
 */

function handleDifferentDesktopSizeVersions(){
    if(isBigDesktopSizeAndHasGameStarted()){
        handleBigDesktopDeviceVersion();
        toggleContainerVisibilityThroughInlineStyling('enter-exit-fullscreen', 'flex');
    } else if(isSmallDesktopSizeAndHasGameStarted()){
        handleSmallDesktopDeviceVersion();
    }
}

/**
 * Applies the layout and styling for big desktop devices when the game has started.
 */

function handleBigDesktopDeviceVersion(){
    setCanvasContainerPropertiesForBigDesktop();
    setCanvasPropertiesForBigDesktop();
    styleBigDesktopVersionProperly();
}

/**
 * Applies the layout and styling for small desktop devices when the game has started.
 */

function handleSmallDesktopDeviceVersion(){
    setContainerToFullscreenSize('canvas-container');
    setContainerToFullscreenSize('canvas');
}

/**
 * Styles the UI for big desktop versions.
 */

function styleBigDesktopVersionProperly(){
    setUiDesktopPaddingSizes('16px');
    showContainerIfHidden('ui-desktop');
}

/**
 * Sets the padding sizes for the UI desktop container.
 * @param {string} size - The padding size to set.
 */

function setUiDesktopPaddingSizes(size){
    let uiDesktop = document.getElementById('ui-desktop');
    uiDesktop.style.paddingRight = `${size}`;
    uiDesktop.style.paddingLeft = `${size}`;
}

/**
 * Sets the styling when the game is initialized.
 */

function setStylingOfInitializedGame(){
    showCanvasWhenGameStarts();
    setEnterExitFullscreenIcons();
    hideAllNeededStylingsWhenGameInitialized();
}

/**
 * Sets the fullscreen icon state by hiding the exit fullscreen icon and showing the enter fullscreen icon.
 * This ensures only the appropriate fullscreen control is visible after game initialization.
 */

function setEnterExitFullscreenIcons(){
    hideContainerIfVisible('exitFullscreen');
    showContainerIfHidden('enterFullscreen');
    // if(window.innerWidth < 1025){
    //     let enterExitFullscreenDiv = document.getElementById('enter-exit-fullscreen');
    //     enterExitFullscreenDiv.style.display = 'none';
    // }
}

/**
 * Hides all unnecessary stylings when the game is initialized.
 */

function hideAllNeededStylingsWhenGameInitialized(){
    hideContainerIfVisible('ui-touch');
    manageTouchDeviceVsDesktopDeviceStyle();
    removeLinksImagesTouchIfStillPresent();
}

/**
 * Removes flexbox classes from 'links-images-touch' if still present.
 */

function removeLinksImagesTouchIfStillPresent(){
    if(doesLinksImagesTouchContainsFlexboxAttributes()){
        let linksImagesTouch = document.getElementById('links-images-touch');
        linksImagesTouch.classList.remove('d-gap');
        linksImagesTouch.classList.remove('d-flex');
        linksImagesTouch.classList.add('d-none');
    }
}

/**
 * Hides the intro image depending on the device type or screen size.
 */

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