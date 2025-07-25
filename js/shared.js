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
    } else {
        console.log('Div ref is not accessible: ', divId, divRef);
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
 * Checks if the 'links-images-touch' container is visible (has flex and gap classes, and not 'd-none').
 * @returns {boolean}
 */
function isLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-flex') 
    && linksImagesTouch.classList.contains('d-gap') 
    && !linksImagesTouch.classList.contains('d-none');
}

/**
 * Checks if the 'links-images-touch' container is hidden (has 'd-none' and not flex/gap classes).
 * @returns {boolean}
 */
function isLinksImagesTouchHidden(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-none') 
    && !linksImagesTouch.classList.contains('d-flex') 
    && !linksImagesTouch.classList.contains('d-gap');
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
 * Checks if the sound icon was not pressed.
 * @returns {boolean}
 */
function soundIconWasNotPressed(){
    return !world.character.isSoundIconInteraction;
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
 * Checks if the play icon is not pressed and the world object exists.
 * @param {Event} event - The event object.
 * @returns {boolean}
 */
function isPlayIconNotPressedAndWorldExistent(event){
    return !event.target.closest('#playIcon') && typeof world !== 'undefined';
}

/* All the styling functions that originally were part of game.js are located here now! */

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
 * Checks if the world object is defined and exists.
 * @returns {boolean}
 */
function isWorldDefinedAndExistent(){
    return typeof world !== undefined && world;
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
 * Checks if the device is a desktop (not touch).
 * @returns {boolean}
 */
function isDesktop(){
    return !isTouch();
}

/**
 * Handles the desktop device version by hiding/showing relevant containers and setting styles.
 */
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
 * Checks if the device is a big desktop and the game has started.
 * @returns {boolean}
 */
function isBigDesktopSizeAndHasGameStarted(){
    return window.innerWidth > 1024 && hasGameStarted
}

/**
 * Checks if the device is a small desktop and the game has started.
 * @returns {boolean}
 */
function isSmallDesktopSizeAndHasGameStarted(){
    return window.innerWidth < 1025 && hasGameStarted;
}

/**
 * Sets the styling when the game is initialized.
 */
function setStylingOfInitializedGame(){
    showCanvasWhenGameStarts();
    hideAllNeededStylingsWhenGameInitialized();
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
 * Checks if 'links-images-touch' contains flexbox attributes.
 * @returns {boolean}
 */
function doesLinksImagesTouchContainsFlexboxAttributes(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-flex') && linksImagesTouch.classList.contains('d-gap'); 
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

/**
 * Checks if the device is a mobile type or of small size.
 * @returns {boolean}
 */
function isDeviceMobileTypeOrOfSmallSize(){
    return isTouch() || window.innerWidth < 1024; 
}

/**
 * Checks if the device supports touch events.
 * @returns {boolean}
 */
function isTouch(){
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}