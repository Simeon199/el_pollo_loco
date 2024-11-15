let timeDifferenceBetweenKeyDPressedReleased = 0;
let timeDifferenceBetweenKeyDReleasedAndLaterPressed = 0;
permissionToThrow = true;

/**
 * Disables the context menu on touch-enabled devices.
 */

if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
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

/**
 * Listens for changes in screen orientation and triggers the `checkOrientation` function.
 */

screen.orientation.addEventListener("change", checkOrientation);


/**
 * Listens for window resize events to manage responsive styling by calling `manageResizeResponsiveStyling`.
 */

window.addEventListener('resize', manageResizeResponsiveStyling);

/**
 * Handles responsive styling adjustments when the screen is resized. Displays a message to turn the device if the screen is not in landscape mode, and hides
 * this message when landscape orientation is activated.
 */

function manageResizeResponsiveStyling() {
    if (!isLandscapeScreenActivated()) {
        showMessageToTurnDevice();
    } else if (isLandscapeScreenActivated()) {
        document.getElementById('message-to-turn-device').style.display = 'none';
        if (proveIfBackgroundIsEmpty()) {
            location.reload();
        }
    }
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
 * Handles the visibility of the control panel. If the game is playing and fullscreen is not activated, the control panel is hidden.
 * If fullscreen is activated, the control panel is displayed.
 */

function handleVisibilityOfControlPanelWhenResizing() {
    if (isGamePlaying && !isFullscreenActivated) {
        document.getElementById('control-panel-everything').style.display = 'none';
    } else if (isGamePlaying && isFullscreenActivated) {
        document.getElementById('control-panel-everything').style.display = 'flex';
    }
}

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

/**
 * Adds all essential event listeners needed when starting the game. Includes listeners for key and touch events.
 */

function addAllEventListenersWhenInitGame() {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    window.addEventListener('touchstart', touchStartHandler);
    window.addEventListener('touchend', touchEndHandler);
}

/**
 * Event listener for the 'touchstart' event. Invokes the touchStartHandler to handle touch-based controls.
 */

window.addEventListener('touchstart', touchStartHandler);

/**
 * Event listener for the 'touchend' event. Invokes the touchEndHandler to handle the end of touch interactions.
 */

window.addEventListener('touchend', touchEndHandler);

// Event listener for touchstart events

function touchStartHandler(event) {
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
            timeWhenKeyDWasPressed = new Date().getTime();
            giveOrDenyPermissionToThrow();
        }
    }
}

// Event listener for touchend events

function touchEndHandler(event) {
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
            timeWhenKeyDWasReleased = new Date().getTime();
            timeDifferenceBetweenKeyDPressedReleased = Math.abs(timeWhenKeyDWasReleased - timeWhenKeyDWasPressed);
        }
    }
}

/**
 * Event listener for the 'keyup' event. Invokes keyUpHandler to handle keyboard key releases.
 */

window.addEventListener('keyup', keyUpHandler);

/**
 * Event listener for the 'keydown' event. Invokes keyDownHandler to handle keyboard key presses.
 */

window.addEventListener('keydown', keyDownHandler);

/**
 * Handles 'keydown' events by setting keyboard states based on key codes. Updates specific game actions based on the arrow keys, spacebar, and 'D' key.
 *
 * @param {KeyboardEvent} event - The keydown event containing key code data.
 */

function keyDownHandler(event) {
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
        timeWhenKeyDWasPressed = new Date().getTime();
        giveOrDenyPermissionToThrow();
    }
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
 * Handles 'keyup' events by resetting keyboard states based on key codes. Stops specific game actions based on the arrow keys, spacebar, and 'D' key.
 *
 * @param {KeyboardEvent} event - The keyup event containing key code data.
 */

function keyUpHandler(event) {
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
        timeWhenKeyDWasReleased = new Date().getTime();
        timeDifferenceBetweenKeyDPressedReleased = Math.abs(timeWhenKeyDWasReleased - timeWhenKeyDWasPressed);
    }
}

/**
 * Initializes event listeners once the DOM content is fully loaded.
 * Sets up a click event on the 'playIcon' element to start the game.
 * 
 * @event DOMContentLoaded - Triggered when the initial HTML document is fully loaded and parsed.
 */

document.addEventListener('DOMContentLoaded', () => {
    const playIcon = document.getElementById('playIcon');
    playIcon.addEventListener('click', () => {
        startGame();
    });
});

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

/**
 * Removes all previously attached event listeners from the window and document. Cleans up to prevent memory leaks and unwanted behavior when resetting the game.
 */

function removeAllListeners() {
    window.removeEventListener("orientationchange", checkOrientation);
    window.removeEventListener("resize", checkOrientation);
    window.removeEventListener("resize", handleVisibilityOfControlPanelWhenResizing);
    document.removeEventListener("fullscreenchange", addingAndRemovingClassesDependingOnFullscreenActivated);
    window.removeEventListener('touchstart', touchStartHandler);
    window.removeEventListener('touchend', touchEndHandler);
}