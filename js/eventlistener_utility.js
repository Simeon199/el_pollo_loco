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
 * Checks if the play icon was not pressed.
 * 
 * @param {Event} event - The event object from the user interaction.
 * @returns {boolean} - Returns true if the play icon was not pressed.
 */

function wasntPlayIconPressed(event) {
    return event.target !== document.getElementById('playIcon');
}

/**
 * Checks if the left button was pressed.
 * 
 * @param {Event} event - The event object from the user interaction.
 * @returns {boolean} - Returns true if the left button was pressed.
 */

function wasButtonLeftPressed(event) {
    return event.target == document.getElementById('buttonLeft');
}

/**
 * Checks if the right button was pressed.
 * 
 * @param {Event} event - The event object from the user interaction.
 * @returns {boolean} - Returns true if the right button was pressed.
 */

function wasButtonRightPressed(event) {
    return event.target == document.getElementById('buttonRight');
}

/**
 * Checks if the up button was pressed.
 * 
 * @param {Event} event - The event object from the user interaction.
 * @returns {boolean} - Returns true if the up button was pressed.
 */

function wasButtonUpPressed(event) {
    return event.target == document.getElementById('buttonUp');
}

/**
 * Checks if the throw button was pressed.
 * 
 * @param {Event} event - The event object from the user interaction.
 * @returns {boolean} - Returns true if the throw button was pressed.
 */

function wasButtonThrowPressed(event) {
    return event.target == document.getElementById('buttonThrow');
}

/**
 * Checks if all background images in the document are hidden. Returns `true` if all specified images are hidden; otherwise, returns `false`.
 *
 * @returns {boolean} - `true` if all specified images ('winning-image', 'losing-image', 'intro-image') are hidden and variable isGamePlaying is false. 
 */

function proveIfBackgroundIsEmpty() {
    let winningImage = document.getElementById('winning-image');
    let losingImage = document.getElementById('losing-image');
    let introImage = document.getElementById('intro-image');
    let boolean1 = winningImage.style.display == 'none';
    let boolean2 = losingImage.style.display == 'none';
    let boolean3 = introImage.style.display == 'none';
    let boolean4 = isGamePlaying == false;
    return totalBoolean = boolean1 && boolean2 && boolean3 && boolean4;
}

/**
 * Handles key press or touch start events to set global variables related to the character's state.
 * Updates the timing and state of key presses for the character in the global `world` object.
 *
 * @param {Event} event - The event object from the key press or touch start.
 */

function settingGlobalVariablesInKeyDownOrTouchStartEvent(event) {
    world.character.isSoundIconInteraction = isEventOfTypeTouchAndSoundIconTriggered(event);
    if (!world.character.isSoundIconInteraction) {
        setKeyPressedVariablesRight(event);
        someKeyWasPressedAgain = new Date().getTime();
        world.character.wasRandomKeyOncePressed = wasRandomKeyOncePressed;
        world.character.someKeyWasPressedAgain = someKeyWasPressedAgain;
        world.character.isKeyPressed = isKeyPressed;
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
 * Sets global variables when a key or touch event ends.
 */

function settingGlobalVariablesInKeyUpOrTouchEndEvent() {
    isKeyPressed = false;
    lastTimeKeyPressed = new Date().getTime();
    world.character.lastTimeKeyPressed = lastTimeKeyPressed;
    world.character.isKeyPressed = isKeyPressed;
}

/**
 * Grants or denies permission to throw an object based on the timing of key "D" actions.
 */

function giveOrDenyPermissionToThrow() {
    if (timeWhenKeyDWasReleased > 0) {
        timeDifferenceBetweenKeyDReleasedAndLaterPressed = Math.abs(timeWhenKeyDWasPressed - timeWhenKeyDWasReleased);
        if (timeDifferenceBetweenKeyDReleasedAndLaterPressed > 500) {
            permissionToThrow = true;
        } else {
            permissionToThrow = false;
        }
    }
}

/**
 * Manages sound-related settings and prepares global variables based on the triggered event.
 * Calls functions to set global key press variables and mute the snoring sound if necessary.
 *
 * @param {Event} event - The event object triggered by a key press or touch interaction.
 */

function manageSoundAndPrepareGlobalVariables(event) {
    settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
    world.audioManager.muteSnorringSoundIfNecessary();
}

/**
 * Checks if the game is currently playing and ensures that neither the sound icons nor the play icon was touched.
 * This function returns `true` if the game is active, the play icon was not pressed, and no interaction with sound icons occurred.
 *
 * @returns {boolean} `true` if the game is playing, the play icon wasn't touched, and no sound icon interaction occurred; otherwise, `false`.
 */

function isGamePlayingAndPlayAndSoundIconsWasntTouched(event) {
    return !isSoundIconInteraction && wasntPlayIconPressed(event) && isGamePlaying == true;
}

/**
 * Adds or removes classes based on fullscreen activation status. Manages class changes when entering or exiting fullscreen mode.
 */

function addingAndRemovingClassesDependingOnFullscreenActivated() {
    isFullscreenActivated = !!document.fullscreenElement;
    if (!isFullscreenActivated) {
        manageAddRemoveClassesWhenExitFullscreen();
    } else {
        isChangingToFullscreen = false;
    }
}