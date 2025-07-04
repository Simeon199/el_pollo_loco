// let momentKeySpaceWasReleased = 0;

/**
 * Adds all essential event listeners needed when starting the game. Includes listeners for key and touch events.
 */

function addAllRemainingEventListenersWhenInitGame(isTouch) {
    if(isTouch && isGamePlaying){
        setGlobalVariablesInTouchEvent(); 
        settingStyleForTouchDevice();
    }
}

function settingStyleForTouchDevice(){
    document.getElementById('ui-touch').style.display = 'none';
    document.getElementById('canvas-container').classList.remove('d-none');
    if(document.getElementById('canvas-container').classList.contains('d-flex')){
        document.getElementById('canvas-container').classList.remove('d-flex');
    }
    document.getElementById('screen-control-container').classList.remove('d-none');
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

function settingGlobalVariablesInKeyUpOrTouchEndEvent() {
    isKeyPressed = false;
    lastTimeKeyPressed = new Date().getTime();
    world.character.lastTimeKeyPressed = lastTimeKeyPressed;
    world.character.isKeyPressed = isKeyPressed;
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
 * Displays the canvas and hides the intro image when the screen orientation is correct.
 */

function setCanvasElementsRightInCaseOfRightOrientation() {
    prepareAllContainersStyleWhenRightOrientation();
}

/**
 * Prepares and adjusts the style of all relevant HTML-containers when the device orientation is correct.
 */

function prepareAllContainersStyleWhenRightOrientation() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('canvas-container').style.display = 'flex';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('canvas-container').style.justifyContent = 'center';
    document.getElementById('canvas-container').style.alignItems = 'center';
}

/**
 * Displays a message prompting the user to turn their device for better viewing. Hides the canvas container and other elements, and displays a rotation message overlay.
 */

function showMessageToTurnDevice() {
    if (window.innerWidth < 1300 && (window.innerHeight > window.innerWidth)) {
        document.getElementById('overlay').style.display = 'flex';
        document.getElementById('canvas-container').style.display = 'none';
        document.getElementById('canvas').style.display = 'none';
        makeContainersDisappearIfTheyAreStillThere();
        document.getElementById('message-to-turn-device').style.display = 'flex';
    }
}

/**
 * Hides any remaining intro, winning, or losing image containers if they are visible. Ensures no unnecessary containers remain visible when displaying the turn device message.
 */

function makeContainersDisappearIfTheyAreStillThere() {
    if (document.getElementById('intro-image').style.display !== 'none') {
        document.getElementById('intro-image').style.display = 'none';
    } else if (document.getElementById('winning-image') !== 'none') {
        document.getElementById('winning-image').style.display = 'none';
    } else if (document.getElementById('losing-image').style.display !== 'none') {
        document.getElementById('losing-image').style.display = 'none';
    }
}

/**
 * Manages the style and layout depending on whether the screen is in landscape mode.
 */

function manageStyleDependingOnLandscapeScreenActivated() {
    if (!isLandscapeScreenActivated()) {
        stopGameAndShowTurnDeviceMessage();
    } else {
        showIntroImageAndDeactivateTurnDeviceMessage();
    }
}

/**
 * Checks the current screen orientation and background state, 
 * and reloads the page or exits fullscreen mode based on conditions.
 */

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        if (hasGameStarted) {
            location.reload();
        }
    }
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

/**
 * Shows the intro image and hides the "turn device" message.
 */

function showIntroImageAndDeactivateTurnDeviceMessage() {
    document.getElementById('message-to-turn-device').style.display = 'none';
    document.getElementById('intro-image').style.display = 'flex';
}

/**
 * Activates and displays the "turn device" message.
 */

function activateMessageToTurnDevice() {
    if ((window.innerWidth < 1300 || window.innerHeight < 800) && window.innerWidth > window.innerHeight) {
        document.getElementById('message-to-turn-device').style.display = 'flex';
        document.getElementById('intro-image').style.display = 'none';
        document.getElementById('canvas').style.display = 'none';
    }
}

/**
 * Checks if the screen is in landscape orientation.
 * 
 * @returns {boolean} - Returns true if the screen width is greater than the screen height.
 */

function isLandscapeScreenActivated() {
    return (window.innerWidth > window.innerHeight);
}

/**
 *  Event listener for the resize event. In the case of a resize event the checkOrientation is invoked.
 */

// window.addEventListener("resize", checkOrientation);

/**
 *  Event listener for screen orientation. In the case of a orientationchange the checkOrientation is invoked.
 */

// window.addEventListener("orientationchange", checkOrientation);