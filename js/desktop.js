let isSoundIconInteraction = false;
let timeDifferenceBetweenKeyDPressedReleased = 0;
let momentKeySpaceWasReleased = 0;

/**
 * Sets the canvas container properties for big desktop devices based on screen size.
 */

function setCanvasContainerPropertiesForBigDesktop(){
    if(isDesktopOfBiggerSize()){
        setCanvasContainerPropertyStyling('720px', '480px');
    } else if(isDesktopOfVeryBigSize()){
        setCanvasContainerPropertyStyling('840px', '560px');
    }
}

/**
 * Checks if the device is a big desktop (between 1024px and 1920px wide).
 * @returns {boolean} True if big desktop, false otherwise.
 */

function isDesktopOfBiggerSize(){
    return window.innerWidth > 1024 && window.innerWidth < 1920;
}

/**
 * Checks if the device is a very big desktop (1920px or wider).
 * @returns {boolean} True if very big desktop, false otherwise.
 */

function isDesktopOfVeryBigSize(){
    return window.innerWidth >= 1920;
}

/**
 * Sets the styling for the canvas container element.
 * @param {string} width - The width to set.
 * @param {string} height - The height to set.
 */

function setCanvasContainerPropertyStyling(width, height){
    let canvasContainer = document.getElementById('canvas-container');
    canvasContainer.style.width = `${width}`; 
    canvasContainer.style.height = `${height}`; 
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.right = `calc((100dvw - ${width})/2)`;
    canvasContainer.style.bottom = `calc((100dvh - ${height})/2)`;
}

/**
 * Sets the canvas element properties for big desktop devices.
 */

function setCanvasPropertiesForBigDesktop(){
    if(isDesktopOfBiggerSize()){
        setCanvasProperties('720px', '480px'); 
    } else if(isDesktopOfVeryBigSize()){
        setCanvasProperties('840px', '560px');
    }
}

/**
 * Sets the width and height of the canvas element.
 * @param {string} width - The width to set.
 * @param {string} height - The height to set.
 */

function setCanvasProperties(width, height){
    let canvas = document.getElementById('canvas');
    canvas.style.width = `${width}`;
    canvas.style.height = `${height}`; 
}

/**
 * Shows the desktop UI and handles links/images for smaller screens.
 */

function showUiDesktopStyle(){
    let uiDesktop = document.getElementById('ui-desktop');
    uiDesktop.classList.remove('d-none');
    if(window.innerWidth < 1025){
        handleLinksImagesTouchStyle();
    }
}

/**
 * Sets the style for the desktop device, hiding the UI for small screens.
 */

function setStyleForDesktopDevice(){
    let uiDesktop = document.getElementById('ui-desktop');
    if(uiDesktop.style.display !== 'none' && window.innerWidth < 1024){
        uiDesktop.style.display = 'none'
    }
}

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
 * Attaches the keyup event handler to the document.
 */

function handleKeyUpEvents(){
    document.addEventListener('keyup', (event) => { 
        keyUpHandler(event);
    });
}

/**
 * Attaches the keydown event handler to the document.
 */

function handleKeyDownEvents(){
    document.addEventListener('keydown', (event) => { 
        keyDownHandler(event);
    });
}

/**
 * Handles keydown events and updates the keyboard state and character actions.
 * @param {KeyboardEvent} event - The keydown event object.
 */

function keyDownHandler(event) {
    settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
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
 * Handles keyup events and updates the keyboard state and character actions.
 * @param {KeyboardEvent} event - The keyup event object.
 */

function keyUpHandler(event) {
    settingGlobalVariablesInKeyUpOrTouchEndEvent(event);
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
 * @returns {boolean} True if alive and not hurt, false otherwise.
 */

function isCharacterAliveAndNotHurt() {
    return world.character.energy > 0 && world.character.isHurt() == false;
}

/**
 * Prepares the state for throwing left (keyboard control).
 */

function prepareForThrowingLeft() {
    keyboard.LEFT = true;
    if (keyboard.rightForThrow == true) {
        keyboard.rightForThrow = false;
    }
    keyboard.leftForThrow = true;
}

/**
 * Prepares the state for throwing right (keyboard control).
 */

function prepareForThrowingRight() { 
    keyboard.RIGHT = true;
    if (keyboard.leftForThrow == true) {
        keyboard.leftForThrow = false;
    }
    keyboard.rightForThrow = true;
}

/**
 * Sets the timing variables for the D key activation.
 */

function setTimeActivationVariablesForKeyD() {
    timeWhenKeyDWasReleased = new Date().getTime();
    timeDifferenceBetweenKeyDPressedReleased = Math.abs(timeWhenKeyDWasReleased - timeWhenKeyDWasPressed);
}

/**
 * Checks if the left key was released or the character is at the left border.
 * @param {KeyboardEvent} event - The keyup event object.
 * @returns {boolean} True if left key released or at border, false otherwise.
 */

function keyLeftReleasedAndCharacterWithinBorder(event) {
    return event.keyCode == 37 || world.character.x <= world.level.level_start_x - 100;
}

/**
 * Checks if the right key was released or the character is at the right border.
 * @param {KeyboardEvent} event - The keyup event object.
 * @returns {boolean} True if right key released or at border, false otherwise.
 */

function keyRightReleasedAndCharacterWithinBorder(event) {
    return event.keyCode == 39 || world.character.x >= world.level.level_end_x;
}