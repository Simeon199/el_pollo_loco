let isSoundIconInteraction = false;
let timePassedWhenKeyReleased;
let timeDifferenceBetweenKeyDPressedReleased = 0;
let timeDifferenceBetweenKeyDReleasedAndLaterPressed = 0;
let momentKeySpaceWasPressed = 0;
let momentKeySpaceWasReleased = 0;

permissionToThrow = true;

/**
 * Prevents the context menu from appearing on touch devices when a user performs a long press.
 */

if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }, { passive: false, capture: true });
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
 * Adds all essential event listeners needed when starting the game. Includes listeners for key and touch events.
 */

function addAllEventListenersWhenInitGame() { 
    
    document.addEventListener('keydown', (event) => { 
        world.audioManager.muteSnorringSoundIfNecessary();        
        settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
        keyDownHandler(event);
    });

    document.addEventListener('keyup', (event) => { 
        world.audioManager.muteSnorringSoundIfNecessary();
        settingGlobalVariablesInKeyUpOrTouchEndEvent();
        keyUpHandler(event);
    });

    document.addEventListener('touchstart', (event) => {
        settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
    });

    document.addEventListener('touchend', () => {
        settingGlobalVariablesInKeyUpOrTouchEndEvent();
    });

    touchStartHandler();
    touchEndHandler();
}

// function isGamePlayingAndPlayAndSoundIconsWasntTouched(event) {
//     return !isSoundIconInteraction && wasntPlayIconPressed(event) && isGamePlaying == true;
// }

// function isEventOfTypeTouchAndSoundIconTriggered(event) {
//     return event.type.startsWith('touch') && checkIfSoundIconWasTriggered(event) == true;
// }

// function manageSoundAndPrepareGlobalVariables(event) {
//     settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
//     world.audioManager.muteSnorringSoundIfNecessary();
// }

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
 * Handles the touchstart event to set key states and perform specific actions based on the touch input.
 * Verifies that the play icon was not pressed and that the game is active.
 * Manages left, right, up, and throw button states, and initiates corresponding actions.
 *
 * @param {TouchEvent} event - The touchstart event object.
 */

function touchStartHandler() { 
    if (isGamePlaying) {
        let buttonLeftTouch = document.getElementById('buttonLeft');
        let buttonRightTouch = document.getElementById('buttonRight');
        let buttonUpTouch = document.getElementById('buttonUp');
        let spacebarTouch = document.getElementById('spacebar');
        let buttonThrowTouch = document.getElementById('buttonThrow');


        if(buttonLeftTouch){
            buttonLeftTouch.addEventListener('touchstart', (event) => {
                event.preventDefault();
                prepareForThrowingLeft();
            }, {passive: false});
        }

        if(buttonRightTouch){
            buttonRightTouch.addEventListener('touchstart', (event) => {
                event.preventDefault();
                prepareForThrowingRight();
            }, {passive: false});
        }

        if(buttonUpTouch){
            buttonUpTouch.addEventListener('touchstart', (event) => {
                event.preventDefault();
                keyboard.SPACE = true;
            }, {passive: false});
        }

        if(spacebarTouch){
            spacebarTouch.addEventListener('touchstart', (event) => {
                event.preventDefault();
                keyboard.SPACE = true;
            }, {passive: false});
        }

        if(buttonThrowTouch){
            buttonThrowTouch.addEventListener('touchstart', (event) => {
                event.preventDefault();
                keyboard.keyD = true;
                timeWhenKeyDWasPressed = new Date().getTime();
                giveOrDenyPermissionToThrow();
            }, {passive: false});
        }
    }
}

/**
 * Handles the touchend event to update the game state by resetting key states and managing audio.
 * Checks if the event did not involve the play icon and if the game is currently playing.
 * Updates key states for left, right, up, and throw buttons.
 *
 * @param {TouchEvent} event - The touchend event object.
 */

function touchEndHandler() {
    if (isGamePlaying) { // wasntPlayIconPressed(event) && isGamePlaying == true
        let buttonLeftTouch = document.getElementById('buttonLeft');
        let buttonRightTouch = document.getElementById('buttonRight');
        let buttonUpTouch = document.getElementById('buttonUp');
        let spacebarTouch = document.getElementById('spacebar');
        let buttonThrowTouch = document.getElementById('buttonThrow');

        if(buttonLeftTouch){
            buttonLeftTouch.addEventListener('touchend', (event) => {
                event.preventDefault();
                keyboard.LEFT = false;
                world.audioManager.muteSound(true, 'walking_sound');
            });
        }

        if(buttonRightTouch){
            buttonRightTouch.addEventListener('touchend', (event) => {
                event.preventDefault();
                keyboard.RIGHT = false;
                world.audioManager.muteSound(true, 'walking_sound');
            }, {passive: false});
        }

        if(buttonUpTouch){
            buttonUpTouch.addEventListener('touchend', (event) => {
                event.preventDefault();
                keyboard.SPACE = false;
                world.character.isKeySpaceReleased = true;
                momentKeySpaceWasReleased = new Date().getTime();
            }, {passive: false});
        }

        if(spacebarTouch){
            spacebarTouch.addEventListener('touchend', (event) => {
                event.preventDefault();
                keyboard.SPACE = false;
                world.character.isKeySpaceReleased = true;
                momentKeySpaceWasReleased = new Date().getTime();
            }, {passive: false});
        }

        if(buttonThrowTouch){
            buttonThrowTouch.addEventListener('touchstart', (event) => {
                event.preventDefault();
                keyboard.keyD = false;
                setTimeActivationVariablesForKeyD();
            }, {passive: false});
        }
    }
}

/**
 * Event listener for the 'keyup' event. Invokes keyUpHandler to handle keyboard key releases.
 */

window.addEventListener('keyup', (event) => {
    keyUpHandler(event);
});

/**
 * Event listener for the 'keydown' event. Invokes keyDownHandler to handle keyboard key presses.
 */

window.addEventListener('keydown', (event) => {
    keyDownHandler(event);
});

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
            timeWhenKeyDWasPressed = new Date().getTime();
            giveOrDenyPermissionToThrow();
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
        keyboard.keyD = false;
        setTimeActivationVariablesForKeyD();
    }
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
 * Sets the activation variables for the "D" key by recording the release time and calculating the duration of the key press.
 */

function setTimeActivationVariablesForKeyD() {
    timeWhenKeyDWasReleased = new Date().getTime();
    timeDifferenceBetweenKeyDPressedReleased = Math.abs(timeWhenKeyDWasReleased - timeWhenKeyDWasPressed);
}