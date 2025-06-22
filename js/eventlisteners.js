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
    document.addEventListener('touchstart', (event) => {
        settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
    });
    document.addEventListener('touchend', () => {
        settingGlobalVariablesInKeyUpOrTouchEndEvent();
    });
    touchStartHandler();
    touchEndHandler();
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