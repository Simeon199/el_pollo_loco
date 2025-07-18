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

function settingStyleForTouchDevice(){
    document.getElementById('canvas-container').classList.remove('d-none');
    if(document.getElementById('canvas-container').classList.contains('d-flex')){
        document.getElementById('canvas-container').classList.remove('d-flex');
    }
    document.getElementById('screen-control-container').classList.remove('d-none');
}

function showUiTouchStyle(){ 
    let uiTouch = document.getElementById('ui-touch');
    uiTouch.classList.remove('d-none');
}

function changeMainPageLinkColorOnTouchStart(){
    let mainPageLink = document.getElementById('main-page-link');
    mainPageLink.style.background = 'goldenrod';
}

function setCaseForTouchEndSpaceBar(target){
    keyboard.SPACE = false;
    world.character.isKeySpaceReleased = true;
    momentKeySpaceWasReleased = new Date().getTime();
    target.style.background = 'wheat';
}

function setCaseForTouchEndButtonLeft(target){
    keyboard.LEFT = false;
    world.audioManager.muteSound(true, 'walking_sound');
    target.style.background = 'wheat';
}

function setCaseForTouchEndButtonRight(target){
    keyboard.RIGHT = false;
    world.audioManager.muteSound(true, 'walking_sound');
    target.style.background = 'wheat';
}

function setCaseForTouchEndButtonThrow(target){
    world.utilityClass.checkThrowObjects();
    keyboard.keyD = false;
    target.style.background = 'wheat';
}

function setCaseForTouchStartButtonLeft(target){
    prepareForThrowingLeft();
    target.style.background = 'rgb(75, 61, 35)';
}

function setCaseForTouchStartButtonRight(target){
    prepareForThrowingRight();
    target.style.background = 'rgb(75, 61, 35)';
}

function setCaseForTouchStartSpaceBar(target){
    keyboard.SPACE = true;
    target.style.background = 'rgb(75, 61, 35)';
}

function setCaseForTouchStartButtonThrow(target){
    keyboard.keyD = true;
    target.style.background = 'rgb(75, 61, 35)';
}

function setExitGameContainersButtonStyle(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.background = 'rgb(75, 61, 35)';
}

function setStyleForExitGameContainerAndResetGame(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.background = 'wheat';
    resetGame();
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

function stopGameAndShowTurnDeviceMessage() {
    activateMessageToTurnDevice();
    clearAllIntervals();
    stopAllSounds();
    showMessageToTurnDevice();
}