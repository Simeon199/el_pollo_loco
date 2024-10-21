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

function wasntPlayIconPressed(event) {
    return event.target !== document.getElementById('playIcon');
}

function wasButtonLeftPressed(event) {
    return event.target == document.getElementById('buttonLeft');
}

function wasButtonRightPressed(event) {
    return event.target == document.getElementById('buttonRight');
}

function wasButtonUpPressed(event) {
    return event.target == document.getElementById('buttonUp');
}

function wasButtonThrowPressed(event) {
    return event.target == document.getElementById('buttonThrow');
}

window.addEventListener("orientationchange", checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('resize', () => {
    if (isGamePlaying && !isFullscreenActivated) {
        document.getElementById('control-panel-everything').style.display = 'none';
    } else if (isGamePlaying && isFullscreenActivated) {
        document.getElementById('control-panel-everything').style.display = 'flex';
    }
});

document.addEventListener('fullscreenchange', () => {
    isFullscreenActivated = !!document.fullscreenElement;
    if (!isFullscreenActivated) {
        manageAddRemoveClassesWhenExitFullscreen();
    } else {
        isChangingToFullscreen = false;
    }
});

function settingGlobalVariablesInKeyDownOrTouchStartEvent() {
    wasRandomKeyOncePressed = true;
    isKeyPressed = true;
    someKeyWasPressedAgain = new Date().getTime();
    world.character.wasRandomKeyOncePressed = wasRandomKeyOncePressed;
    world.character.someKeyWasPressedAgain = someKeyWasPressedAgain;
    world.character.isKeyStillPressed = isKeyPressed;
}

function settingGlobalVariablesInKeyUpOrTouchEndEvent() {
    isKeyPressed = false;
    lastTimeKeyPressed = new Date().getTime();
    world.character.lastTimeKeyPressed = lastTimeKeyPressed;
    world.character.isKeyStillPressed = isKeyPressed;
}

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
})

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