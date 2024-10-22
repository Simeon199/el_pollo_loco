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

// Event listeners for orientation and screen resizing

window.addEventListener("orientationchange", checkOrientation);
window.addEventListener('resize', checkOrientation);

/**
 * Handles the visibility of the control panel depending on screen resize and fullscreen mode.
 * If the game is playing and fullscreen is not activated, the control panel is hidden.
 * If fullscreen is activated, the control panel is displayed.
 */

window.addEventListener('resize', () => {
    if (isGamePlaying && !isFullscreenActivated) {
        document.getElementById('control-panel-everything').style.display = 'none';
    } else if (isGamePlaying && isFullscreenActivated) {
        document.getElementById('control-panel-everything').style.display = 'flex';
    }
});

/**
 * Toggles fullscreen mode and handles the exit from fullscreen.
 */

document.addEventListener('fullscreenchange', () => {
    isFullscreenActivated = !!document.fullscreenElement;
    if (!isFullscreenActivated) {
        manageAddRemoveClassesWhenExitFullscreen();
    } else {
        isChangingToFullscreen = false;
    }
});

/**
 * Sets global variables when a key or touch event is triggered.
 */

function settingGlobalVariablesInKeyDownOrTouchStartEvent() {
    wasRandomKeyOncePressed = true;
    isKeyPressed = true;
    someKeyWasPressedAgain = new Date().getTime();
    world.character.wasRandomKeyOncePressed = wasRandomKeyOncePressed;
    world.character.someKeyWasPressedAgain = someKeyWasPressedAgain;
    world.character.isKeyStillPressed = isKeyPressed;
}

/**
 * Sets global variables when a key or touch event ends.
 */

function settingGlobalVariablesInKeyUpOrTouchEndEvent() {
    isKeyPressed = false;
    lastTimeKeyPressed = new Date().getTime();
    world.character.lastTimeKeyPressed = lastTimeKeyPressed;
    world.character.isKeyStillPressed = isKeyPressed;
}

// Event listener for touchstart events

window.addEventListener('touchstart', (event) => {
    if (wasntPlayIconPressed(event) && isGamePlaying == true) {
        settingGlobalVariablesInKeyDownOrTouchStartEvent();
        if (wasButtonLeftPressed(event)) {
            prepareForThrowingLeft();
        }
        if (wasButtonRightPressed(event)) {
            prepareForThrowingRight();
        }
        if (wasButtonUpPressed(event)) {
            keyboard.SPACE = true;
        }
        if (wasButtonThrowPressed(event)) {
            keyboard.keyD = true;
        }
    }
});

// Event listener for touchend events

window.addEventListener('touchend', (event) => {
    if (wasntPlayIconPressed(event) && isGamePlaying == true) {
        settingGlobalVariablesInKeyUpOrTouchEndEvent();
        if (wasButtonLeftPressed(event)) {
            keyboard.LEFT = false;
        }
        if (wasButtonRightPressed(event)) {
            keyboard.RIGHT = false;
        }
        if (wasButtonUpPressed(event)) {
            keyboard.SPACE = false;
        }
        if (wasButtonThrowPressed(event)) {
            keyboard.keyD = false;
        }
    }
});

// Event listener for keydown events

window.addEventListener('keydown', (event) => {
    settingGlobalVariablesInKeyDownOrTouchStartEvent();
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
});

// Event listener for keyup events

window.addEventListener('keyup', (event) => {
    settingGlobalVariablesInKeyUpOrTouchEndEvent();
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.keyD = false;
    }
});