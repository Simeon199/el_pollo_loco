let isSoundIconInteraction = false;
let timeDifferenceBetweenKeyDPressedReleased = 0;
let momentKeySpaceWasReleased = 0;

function setCanvasContainerPropertiesForBigDesktop(){
    if(isDesktopOfBiggerSize()){
        setCanvasContainerPropertyStyling('720px', '480px');
    } else if(isDesktopOfVeryBigSize()){
        setCanvasContainerPropertyStyling('840px', '560px');
    }
}

function isDesktopOfBiggerSize(){
    return window.innerWidth > 1024 && window.innerWidth < 1920;
}

function isDesktopOfVeryBigSize(){
    return window.innerWidth >= 1920;
}

function setCanvasContainerPropertyStyling(width, height){
    let canvasContainer = document.getElementById('canvas-container');
    canvasContainer.style.width = `${width}`; 
    canvasContainer.style.height = `${height}`; 
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.right = `calc((100dvw - ${width})/2)`;
    canvasContainer.style.bottom = `calc((100dvh - ${height})/2)`;
}

function setCanvasPropertiesForBigDesktop(){
    if(isDesktopOfBiggerSize()){
        setCanvasProperties('720px', '480px'); 
    } else if(isDesktopOfVeryBigSize()){
        setCanvasProperties('840px', '560px');
    }
}

function setCanvasProperties(width, height){
    let canvas = document.getElementById('canvas');
    canvas.style.width = `${width}`;
    canvas.style.height = `${height}`; 
}

function showUiDesktopStyle(){
    let uiDesktop = document.getElementById('ui-desktop');
    uiDesktop.classList.remove('d-none');
    if(window.innerWidth < 1025){
        handleLinksImagesTouchStyle();
    }
}

function setStyleForDesktopDevice(){
    let uiDesktop = document.getElementById('ui-desktop');
    if(uiDesktop.style.display !== 'none' && window.innerWidth < 1024){
        uiDesktop.style.display = 'none'
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

function isEventOfTypeTouchAndSoundIconTriggered(event) {
    return event.type.startsWith('touch') && checkIfSoundIconWasTriggered(event) == true;
}

function handleKeyUpEvents(){
    document.addEventListener('keyup', (event) => { 
        keyUpHandler(event);
    });
}

function handleKeyDownEvents(){
    document.addEventListener('keydown', (event) => { 
        keyDownHandler(event);
    });
}

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

function isCharacterAliveAndNotHurt() {
    return world.character.energy > 0 && world.character.isHurt() == false;
}

function prepareForThrowingLeft() {
    keyboard.LEFT = true;
    if (keyboard.rightForThrow == true) {
        keyboard.rightForThrow = false;
    }
    keyboard.leftForThrow = true;
}

function prepareForThrowingRight() { 
    keyboard.RIGHT = true;
    if (keyboard.leftForThrow == true) {
        keyboard.leftForThrow = false;
    }
    keyboard.rightForThrow = true;
}

function setTimeActivationVariablesForKeyD() {
    timeWhenKeyDWasReleased = new Date().getTime();
    timeDifferenceBetweenKeyDPressedReleased = Math.abs(timeWhenKeyDWasReleased - timeWhenKeyDWasPressed);
}

function keyLeftReleasedAndCharacterWithinBorder(event) {
    return event.keyCode == 37 || world.character.x <= world.level.level_start_x - 100;
}

function keyRightReleasedAndCharacterWithinBorder(event) {
    return event.keyCode == 39 || world.character.x >= world.level.level_end_x;
}