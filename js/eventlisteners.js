let isSoundIconInteraction = false;
let timePassedWhenKeyReleased;
let timeDifferenceBetweenKeyDPressedReleased = 0;
let timeDifferenceBetweenKeyDReleasedAndLaterPressed = 0;
let momentKeySpaceWasPressed = 0;
let momentKeySpaceWasReleased = 0;

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
 * Sets global variables when a key or touch event ends.
 */

function settingGlobalVariablesInKeyUpOrTouchEndEvent() {
    isKeyPressed = false;
    lastTimeKeyPressed = new Date().getTime();
    world.character.lastTimeKeyPressed = lastTimeKeyPressed;
    world.character.isKeyPressed = isKeyPressed;
}

/**
 * Sets the global variables wasRandomKeyOncePressed and isKeyPressed that are monitoring whether a certain key or button was pressed.
 */

function setKeyPressedVariablesRight(event) {
    if (isEventOfTypeTouchAndSoundIconTriggered(event)) {
        return;
    } else {
        wasRandomKeyOncePressed = true;
        isKeyPressed = true;
    }
}

function touchStartHandler() { 
    if (isGamePlaying) {
        handleButtonLeftTouchStart();
        handleButtonRightTouchStart();
        handleJumpTouchStart();
        handleSpacebarTouchStart();
        handleThrowTouchStart();
    }
}

function handleButtonLeftTouchStart(){
    let buttonLeftTouch = document.getElementById('buttonLeft');
    if(buttonLeftTouch){
        buttonLeftTouch.addEventListener('touchstart', (event) => {
            event.preventDefault();
            prepareForThrowingLeft();
            buttonLeftTouch.style.background = 'rgb(75, 61, 35)';
        }, {passive: false});
    }
}

function handleButtonRightTouchStart(){
    let buttonRightTouch = document.getElementById('buttonRight');
    if(buttonRightTouch){
        buttonRightTouch.addEventListener('touchstart', (event) => {
            event.preventDefault();
            prepareForThrowingRight();
            buttonRightTouch.style.background = 'rgb(75, 61, 35)';
        }, {passive: false});
    }
}

function handleSpacebarTouchStart(){
    let spacebarTouch = document.getElementById('spacebar');
    let buttonUpTouch = document.getElementById('buttonUp');
    if(spacebarTouch){
        spacebarTouch.addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.SPACE = true;
            buttonUpTouch.style.background = 'rgb(75, 61, 35)';
        }, {passive: false});
    }
}

function handleJumpTouchStart(){
    let buttonUpTouch = document.getElementById('buttonUp');
    if(buttonUpTouch){
        buttonUpTouch.addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.SPACE = true;
            buttonUpTouch.style.background = 'rgb(75, 61, 35)';
        }, {passive: false});
    }
}

function handleThrowTouchStart(){
    let buttonThrowTouch = document.getElementById('buttonThrow');
    if(buttonThrowTouch){
        buttonThrowTouch.addEventListener('touchstart', (event) => {
            event.preventDefault();
            keyboard.keyD = true;
            buttonThrowTouch.style.background = 'rgb(75, 61, 35)';
        }, {passive: false});
    }
}

function touchEndHandler() {
    if (isGamePlaying) { 
        handleButtonLeftTouchEnd();
        handleButtonRightTouchEnd();
        handleJumpTouchEnd();
        handleSpacebarTouchEnd();
        handleThrowTouchEnd();
    }
}

function handleButtonLeftTouchEnd(){
    let buttonLeftTouch = document.getElementById('buttonLeft');
    if(buttonLeftTouch){
        buttonLeftTouch.addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.LEFT = false;
            world.audioManager.muteSound(true, 'walking_sound');
            buttonLeftTouch.style.background = 'wheat';
        });
    }
}

function handleButtonRightTouchEnd(){
    let buttonRightTouch = document.getElementById('buttonRight');
    if(buttonRightTouch){
        buttonRightTouch.addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.RIGHT = false;
            world.audioManager.muteSound(true, 'walking_sound');
            buttonRightTouch.style.background = 'wheat';
        }, {passive: false});
    }
}

function handleJumpTouchEnd(){
    let buttonUpTouch = document.getElementById('buttonUp');
    buttonUpTouch.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
        world.character.isKeySpaceReleased = true;
        momentKeySpaceWasReleased = new Date().getTime();
        buttonUpTouch.style.background = 'wheat';
    }, {passive: false});
}

function handleSpacebarTouchEnd(){
    let spacebarTouch = document.getElementById('spacebar');
    let buttonUpTouch = document.getElementById('buttonUp');
    if(spacebarTouch){
        spacebarTouch.addEventListener('touchend', (event) => {
            event.preventDefault();
            keyboard.SPACE = false;
            world.character.isKeySpaceReleased = true;
            momentKeySpaceWasReleased = new Date().getTime();
            buttonUpTouch.style.background = 'wheat';
        }, {passive: false});
    }
}

function handleThrowTouchEnd(){
    let buttonThrowTouch = document.getElementById('buttonThrow');
    if(buttonThrowTouch){
        buttonThrowTouch.addEventListener('touchend', (event) => {
            event.preventDefault();
            world.utilityClass.checkThrowObjects();
            keyboard.keyD = false;
            buttonThrowTouch.style.background = 'wheat';
        }, {passive: false});
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