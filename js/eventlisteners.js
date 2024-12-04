let timePassedWhenKeyReleased;
let timeDifferenceBetweenKeyDPressedReleased = 0;
let timeDifferenceBetweenKeyDReleasedAndLaterPressed = 0;
permissionToThrow = true;

/**
 * Prevents the context menu from appearing on touch devices when a user performs a long press.
 */

if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    /**
     * Listens for the `pointerdown` event and checks if the pointer type is `touch`.
     * 
     * @param {PointerEvent} event - The event object that provides information about the pointer interaction.
     */
    document.addEventListener('pointerdown', function (event) {
        if (event.pointerType === 'touch') {
            /**
            * Prevents the default context menu from appearing. Stops event propagation to avoid conflicts with other event listeners.
            * This listener is applied only once per touch interaction.
            * 
            * @param {Event} event - The context menu event triggered by a long press.
            * @returns {boolean} - Always returns `false` to prevent further event handling.
            */
            document.addEventListener('contextmenu', function (event) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return false;
            }, { once: true });
        }
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

/**
 *  Event listener for the resize event. In the case of a resize event the checkOrientation is invoked.
 */


window.addEventListener("resize", checkOrientation);

/**
 *  Event listener for screen orientation. In the case of a orientationchange the checkOrientation is invoked.
 */

window.addEventListener("orientationchange", checkOrientation);

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

function settingGlobalVariablesInKeyDownOrTouchStartEvent(event) {
    if (event.type.startsWith('touch') && excludeCertainEvents(event) == true) {
        wasRandomKeyOncePressed = false;
        isKeyPressed = false;
    } else {
        wasRandomKeyOncePressed = true;
        isKeyPressed = true;
    }
    someKeyWasPressedAgain = new Date().getTime();
    world.character.wasRandomKeyOncePressed = wasRandomKeyOncePressed;
    world.character.someKeyWasPressedAgain = someKeyWasPressedAgain;
    world.character.isKeyPressed = isKeyPressed;
}

function excludeCertainEvents(event) {
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

/**
 * This function checks the current mute status of the snoring sound in the audio manager. If the snoring sound is not muted, it will
 * mute the sound by invoking the `muteSound` method of the `audioManager`.
 */

function muteSnorringSoundIfNecessary() {
    let snorring_sound = world.audioManager.sounds['snorring_sound'];
    if (snorring_sound.muted == false) {
        world.audioManager.muteSound(true, 'snorring_sound');
    }
}

// Event listener for touchstart events

function touchStartHandler(event) {
    if (wasntPlayIconPressed(event) && isGamePlaying == true) {
        settingGlobalVariablesInKeyDownOrTouchStartEvent(event); // event
        muteSnorringSoundIfNecessary();
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
            world.audioManager.muteSound(true, 'walking_sound');
        }
        if (wasButtonRightPressed(event)) {
            keyboard.RIGHT = false;
            world.audioManager.muteSound(true, 'walking_sound');
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
    muteSnorringSoundIfNecessary();
    settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
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
        world.audioManager.muteSound(true, 'walking_sound');
    }
    if (event.keyCode == 37) {
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
    let playIcon = document.getElementById('playIcon');
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
    document.removeEventListener("fullscreenchange", addingAndRemovingClassesDependingOnFullscreenActivated);
    window.removeEventListener('touchstart', touchStartHandler);
    window.removeEventListener('touchend', touchEndHandler);
}