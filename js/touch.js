// let momentKeySpaceWasReleased = 0;

function settingStyleForTouchDevice(){
    document.getElementById('canvas-container').classList.remove('d-none');
    if(document.getElementById('canvas-container').classList.contains('d-flex')){
        document.getElementById('canvas-container').classList.remove('d-flex');
    }
    document.getElementById('screen-control-container').classList.remove('d-none');
}

function settingGlobalVariablesInKeyDownOrTouchStartEvent(event) {
    if(!event.target.closest('#playIcon') && hasGameStarted){
        world.character.isSoundIconInteraction = isEventOfTypeTouchAndSoundIconTriggered(event);
        if (!world.character.isSoundIconInteraction) {
            setKeyPressedVariablesRight(event);
            someKeyWasPressedAgain = new Date().getTime();
            world.character.wasRandomKeyOncePressed = wasRandomKeyOncePressed;
            world.character.someKeyWasPressedAgain = someKeyWasPressedAgain;
            world.character.isKeyPressed = isKeyPressed;
        }
    }
}

/**
 * Determines if the event is a touch event and whether the sound icon was triggered. Prevents further key handling if the event targets a sound icon.
 *
 * @param {Event} event - The touch event to evaluate.
 * @returns {boolean} - Returns `true` if the event is a touch event and the sound icon was triggered; otherwise, `false`.
 */

function isEventOfTypeTouchAndSoundIconTriggered(event) {
    return event.type.startsWith('touch') && checkIfSoundIconWasTriggered(event) == true;
}

/**
 * Checks if the event target matches the sound-on or sound-off icons.
 *
 * @param {Event} event - The event object to check.
 * @returns {boolean} - Returns `true` if the event target is either the sound-on or sound-off icon; otherwise, `false`.
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
 * Sets key press variables based on the event type, ensuring proper handling for touch events. 
 * Skips setting variables if the event is a touch event and the sound icon is triggered.
 *
 * @param {Event} event - The event object that may be a key press or touch event.
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
 * Sets global variables when a key or touch event ends.
 */

function settingGlobalVariablesInKeyUpOrTouchEndEvent(event) {
    if(!event.target.closest('#playIcon') && hasGameStarted){
        isKeyPressed = false;
        lastTimeKeyPressed = new Date().getTime();
        world.character.lastTimeKeyPressed = lastTimeKeyPressed;
        world.character.isKeyPressed = isKeyPressed;
    }
}

/**
 * Prepares the player to throw an object to the left by setting the appropriate keyboard properties.
 * Sets `keyboard.LEFT` to true and ensures that `rightForThrow` is false while `leftForThrow` is true.
 */

function prepareForThrowingLeft() {
    keyboard.LEFT = true;
    if (keyboard.rightForThrow == true) {
        keyboard.rightForThrow = false;
    }
    keyboard.leftForThrow = true;
}

/**
 * Prepares the player to throw an object to the right by setting the appropriate keyboard properties.
 * Sets `keyboard.RIGHT` to true and ensures that `leftForThrow` is false while `rightForThrow` is true.
 */

function prepareForThrowingRight() { 
    keyboard.RIGHT = true;
    if (keyboard.leftForThrow == true) {
        keyboard.leftForThrow = false;
    }
    keyboard.rightForThrow = true;
}

/**
 * Stops the game and displays a message instructing the user to turn the device.
 */

function stopGameAndShowTurnDeviceMessage() {
    activateMessageToTurnDevice();
    clearAllIntervals();
    stopAllSounds();
    showMessageToTurnDevice();
}