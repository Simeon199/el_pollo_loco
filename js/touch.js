/**
 * Sets key pressed variables if the event is not a touch event on the sound icon.
 * @param {Event} event - The event object.
 */

function setKeyPressedVariablesRight(event) {
    if (isEventOfTypeTouchAndSoundIconTriggered(event)) {
        return;
    } else {
        wasRandomKeyOncePressed = true;
        isKeyPressed = true;
    }
}

/**
 * Checks if the event is a touch event and the sound icon was triggered.
 * @param {Event} event - The event object.
 * @returns {boolean} True if touch event and sound icon triggered, false otherwise.
 */

function isEventOfTypeTouchAndSoundIconTriggered(event) {
    return event.type.startsWith('touch') && checkIfSoundIconWasTriggered(event) == true;
}

/**
 * Checks if the sound on or off icon was triggered by the event.
 * @param {Event} event - The event object.
 * @returns {boolean} True if sound icon was triggered, false otherwise.
 */

function checkIfSoundIconWasTriggered(event) {
    let soundOnIcon = document.getElementById('sound-on-icon');
    let soundOffIcon = document.getElementById('sound-off-icon');
    if (event.target == soundOffIcon) {
        return true;
    } else if (event.target == soundOnIcon) {
        return true;
    } else {
        return false;
    }
}

/**
 * Applies the appropriate style for touch devices to the UI.
 */

function settingStyleForTouchDevice(){
    document.getElementById('canvas-container').classList.remove('d-none');
    if(document.getElementById('canvas-container').classList.contains('d-flex')){
        document.getElementById('canvas-container').classList.remove('d-flex');
    }
    document.getElementById('screen-control-container').classList.remove('d-none');
    toggleContainerVisibilityThroughInlineStyling('enter-exit-fullscreen', 'none');
}

/**
 * Shows the UI touch controls by removing the 'd-none' class.
 */

function showUiTouchStyle(){ 
    let uiTouch = document.getElementById('ui-touch');
    uiTouch.classList.remove('d-none');
}

/**
 * Prevents default event and handles all switch cases for touchstart events.
 * @param {Event} event - The touchstart event.
 * @param {EventTarget} target - The event target.
 */

function preventDefaultAndHandleAllSwitchCasesForTouchStart(event, target){
    event.preventDefault();
    handleSwitchCasesForTouchStartControlButtons(target);
}

/**
 * Prevents default event and handles all switch cases for touchend events.
 * @param {Event} event - The touchend event.
 * @param {EventTarget} target - The event target.
 */

function preventDefaultAndHandleAllSwitchCasesForTouchEnd(event, target){
    event.preventDefault();
    handleSwitchCasesForTouchEndControlButtons(target);
}

/**
 * Handles switch cases for touchstart control buttons.
 * @param {EventTarget} target - The event target.
 */

function handleSwitchCasesForTouchStartControlButtons(target){
    if(!world.character.isKeyPressed){
        world.character.isKeyPressed = true;
    }
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

/**
 * Handles switch cases for touchend control buttons.
 * @param {EventTarget} target - The event target.
 */

function handleSwitchCasesForTouchEndControlButtons(target){
    if(world.character.isKeyPressed){
        world.character.isKeyPressed = false;
    }
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

/**
 * Changes the main page link color on touchstart.
 */

function changeMainPageLinkColorOnTouchStart(){
    let mainPageLink = document.getElementById('main-page-link');
    mainPageLink.style.background = 'goldenrod';
}

/**
 * Handles logic for touchend on the spacebar button.
 * @param {Element} target - The button element.
 */

function setCaseForTouchEndSpaceBar(target){
    keyboard.SPACE = false;
    world.character.isKeySpaceReleased = true;
    momentKeySpaceWasReleased = new Date().getTime();
    target.style.background = 'wheat';
}

/**
 * Handles logic for touchend on the left button.
 * @param {Element} target - The button element.
 */

function setCaseForTouchEndButtonLeft(target){
    keyboard.LEFT = false;
    world.audioManager.muteSound(true, 'walking_sound');
    target.style.background = 'wheat';
}

/**
 * Handles logic for touchend on the right button.
 * @param {Element} target - The button element.
 */

function setCaseForTouchEndButtonRight(target){
    keyboard.RIGHT = false;
    world.audioManager.muteSound(true, 'walking_sound');
    target.style.background = 'wheat';
}

/**
 * Handles logic for touchend on the throw button.
 * @param {Element} target - The button element.
 */

function setCaseForTouchEndButtonThrow(target){
    world.utilityClass.checkThrowObjects();
    keyboard.keyD = false;
    target.style.background = 'wheat';
}

/**
 * Handles logic for touchstart on the left button.
 * @param {Element} target - The button element.
 */

function setCaseForTouchStartButtonLeft(target){
    prepareForThrowingLeft();
    target.style.background = 'rgb(75, 61, 35)';
}

/**
 * Handles logic for touchstart on the right button.
 * @param {Element} target - The button element.
 */

function setCaseForTouchStartButtonRight(target){
    prepareForThrowingRight();
    target.style.background = 'rgb(75, 61, 35)';
}

/**
 * Handles logic for touchstart on the spacebar button.
 * @param {Element} target - The button element.
 */

function setCaseForTouchStartSpaceBar(target){
    keyboard.SPACE = true;
    target.style.background = 'rgb(75, 61, 35)';
}

/**
 * Handles logic for touchstart on the throw button.
 * @param {Element} target - The button element.
 */

function setCaseForTouchStartButtonThrow(target){
    keyboard.keyD = true;
    target.style.background = 'rgb(75, 61, 35)';
}

/**
 * Sets the style for the exit game container button (pressed state).
 */

function setExitGameContainersButtonStyle(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.background = 'rgb(75, 61, 35)';
}

/**
 * Sets the style for the exit game container button (released state) and resets the game.
 */

function setStyleForExitGameContainerAndResetGame(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.background = 'wheat';
    resetGame();
}

/**
 * Prepares the state for throwing left (touch control).
 */

function prepareForThrowingLeft() {
    keyboard.LEFT = true;
    if (keyboard.rightForThrow == true) {
        keyboard.rightForThrow = false;
    }
    keyboard.leftForThrow = true;
}

/**
 * Prepares the state for throwing right (touch control).
 */

function prepareForThrowingRight() { 
    keyboard.RIGHT = true;
    if (keyboard.leftForThrow == true) {
        keyboard.leftForThrow = false;
    }
    keyboard.rightForThrow = true;
}

/**
 * Stops the game and shows a message to turn the device.
 */

function stopGameAndShowTurnDeviceMessage() {
    activateMessageToTurnDevice();
    clearAllIntervals();
    stopAllSounds();
    showMessageToTurnDevice();
}