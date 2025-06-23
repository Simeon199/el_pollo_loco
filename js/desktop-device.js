let isSoundIconInteraction = false;
let timeDifferenceBetweenKeyDPressedReleased = 0;
let momentKeySpaceWasReleased = 0;

function addAllRemainingEventListenersWhenInitGame(isTouch) {
    if(!isTouch){
        handleKeyUpEvents();
        handleKeyDownEvents();
        manageSoundIconEventListeners();
    }
}

function handleKeyUpEvents(){
    document.addEventListener('keyup', (event) => { 
        world.audioManager.muteSnorringSoundIfNecessary();
        settingGlobalVariablesInKeyUpOrTouchEndEvent();
        keyUpHandler(event);
    });
}

function handleKeyDownEvents(){
    document.addEventListener('keydown', (event) => { 
        world.audioManager.muteSnorringSoundIfNecessary();        
        settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
        keyDownHandler(event);
    });
}

window.addEventListener('keyup', (event) => {
    keyUpHandler(event);
});

window.addEventListener('keydown', (event) => {
    keyDownHandler(event);
});

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
 * Handles 'keydown' events by setting keyboard states based on key codes. Updates specific game actions based on the arrow keys, spacebar, and 'D' key.
 *
 * @param {KeyboardEvent} event - The keydown event containing key code data.
 */

function keyDownHandler(event) {
    if (isCharacterAliveAndNotHurt()) {
        if (event.keyCode == 39) {
            prepareForThrowingRight();
        }
        if (event.keyCode == 37) {
            prepareForThrowingLeft();
        }
        if (event.keyCode == 38) {
            keyboard.UP = true;
        }
        if (event.keyCode == 40) {
            keyboard.DOWN = true;
        }
        if (event.keyCode == 32) {
            keyboard.SPACE = true;
        }
        if (event.keyCode == 68) {
            keyboard.keyD = true;
        }
    }
}

/**
 * Handles 'keyup' events by resetting keyboard states based on key codes. Stops specific game actions based on the arrow keys, spacebar, and 'D' key.
 *
 * @param {KeyboardEvent} event - The keyup event containing key code data.
 */

function keyUpHandler(event) {
    if (keyRightReleasedAndCharacterWithinBorder(event)) {
        keyboard.RIGHT = false;
        world.audioManager.muteSound(true, 'walking_sound');
    }
    if (keyLeftReleasedAndCharacterWithinBorder(event)) {
        keyboard.LEFT = false;
        world.audioManager.muteSound(true, 'walking_sound');
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
        world.character.isKeySpaceReleased = true;
        this.momentKeySpaceWasReleased = new Date().getTime();
    }
    if (event.keyCode == 68) {
        world.utilityClass.checkThrowObjects();
        keyboard.keyD = false;
    }
}

/**
 * Checks if the character is alive and not hurt.
 * 
 * @returns {boolean} - Returns `true` if the character is alive and hurt, returns `false` otherwise.
 */

function isCharacterAliveAndNotHurt() {
    return world.character.energy > 0 && world.character.isHurt() == false;
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
 * Sets the activation variables for the "D" key by recording the release time and calculating the duration of the key press.
 */

function setTimeActivationVariablesForKeyD() {
    timeWhenKeyDWasReleased = new Date().getTime();
    timeDifferenceBetweenKeyDPressedReleased = Math.abs(timeWhenKeyDWasReleased - timeWhenKeyDWasPressed);
}

/**
 * Determines if the left arrow key was released or if the character has reached the left boundary of the level.
 * 
 * @param {KeyboardEvent} event - The keyboard event triggered by releasing a key.
 * @returns {boolean} True if the left arrow key was released or the character is within the level's left boundary.
 */

function keyLeftReleasedAndCharacterWithinBorder(event) {
    return event.keyCode == 37 || world.character.x <= world.level.level_start_x - 100;
}

/**
 * Determines if the right arrow key was released or if the character has reached the right boundary of the level.
 * 
 * @param {KeyboardEvent} event - The keyboard event triggered by releasing a key.
 * @returns {boolean} True if the right arrow key was released or the character is within the level's right boundary.
 */

function keyRightReleasedAndCharacterWithinBorder(event) {
    return event.keyCode == 39 || world.character.x >= world.level.level_end_x;
}