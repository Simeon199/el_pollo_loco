// All Global Variables

let wasRandomKeyOncePressed = false;
let isKeyPressed = false;
let someKeyWasPressedAgain = 0;
let lastTimeKeyPressed = 0;
let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let hasGameStarted = false;
let isFullscreenActivated = false;

// Check Orientation 
document.addEventListener('DOMContentLoaded', togglePanelsForMobileVersion);

function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        return false;
    } else if (window.matchMedia("(orientation: landscape)").matches) {
        return true;
    }
}

function togglePanelsForMobileVersion() {
    let controlPanel = document.getElementById('control-panel-everything');
    if (checkOrientation()) { // Eventuell hier hinzufügen, dass das Spiel automatisch abgebrochen wird, wenn das Handy im Hochformat gehalten wird.
        controlPanel.classList.remove('d-none');
        controlPanel.classList.add('d-flex');
    } else {
        controlPanel.classList.remove('d-flex');
        controlPanel.classList.add('d-none');
    }
}

// Initialize Game

function init() {
    if (world) {
        world.reset();
    } else {
        canvas = document.getElementById("canvas");
        world = new World(canvas, keyboard);
    }
    ctx = canvas.getContext('2d');
    checkIfEnemyOrCharacterIsDead();
}

function checkIfEnemyOrCharacterIsDead() {
    setInterval(() => {
        if (world.character.energy == 0) {
            stopGame('losing');
        } else if (world.enemiesNumber <= 0) {
            stopGame('winning');
        }
    }, 100);
}

// Section which explains the game

function openSettingsFunction() {
    let explainGameContainer = document.getElementById('explain-game-container');
    if (explainGameContainer.classList.contains('d-none')) {
        explainGameContainer.classList.remove('d-none');
    }
}

function closeExplainGameContainer() {
    let explainGameContainer = document.getElementById('explain-game-container');
    if (!explainGameContainer.classList.contains('d-none')) {
        explainGameContainer.classList.add('d-none');
    }
}

function preventBubbling(event) {
    event.stopPropagation();
}

// Open and Close Mini-Version of All-Icons-Container (Kann man in einer Funktion behandeln --> später: Vereinfache dies!)

function openAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    if (allIconsMiniVersionContainer.style.display !== 'flex') {
        allIconsMiniVersionContainer.style.display = ' flex';
    }
}

function closeAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    if (allIconsMiniVersionContainer.style.display !== 'none') {
        allIconsMiniVersionContainer.style.display = ' none';
    }
}

// Start-or-Stop Game Related Logic

function startGame() {
    if (checkOrientation() == true) {
        setCanvasElementsRightInCaseOfRightOrientation();
        init();
    } else if (checkOrientation() == false) {
        showButtonToTurnDeviceInCaseOfWrongOrientation();
    }
}

function stopGame(string) {
    setTimeout(() => {
        clearAllIntervals();
        document.getElementById('canvas').style.display = 'none';
        if (string == 'losing') {
            changeStyleWhenLosing();
        } else if (string == 'winning') {
            changeStyleWhenWinning();
        }
        changeStyleWhenIndependentOfWinningOrLosing();
        exitFullscreen();
    }, 1000);
    stopAllSounds();
}

function stopAllSounds() {
    world.backgroundMusic.pause();
    world.level.enemies[world.level.enemies.length - 1].chickenSound.pause();
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

function playAgain() {
    if (checkOrientation() == true) {
        document.getElementById('canvas-container').style.display = 'block';
        document.getElementById('canvas').style.display = 'block';
        document.getElementById('losing-image').style.display = 'none';
        document.getElementById('winning-image').style.display = 'none';
        document.getElementById('main-title').style.display = 'none';
        world = new World(canvas, keyboard);
        hasGameStarted = false;
        checkIfEnemyOrCharacterIsDead();
    } else {
        document.getElementById('winning-image').style.display = 'none';
        document.getElementById('losing-image').style.display = 'none';
        showButtonToTurnDeviceInCaseOfWrongOrientation();
    }
}

// All CSS-Styling-Related Code

function playGameWhenDeviceHasRightOrientation() {
    if (document.getElementById('message-to-turn-device').classList.contains('d-flex') && window.matchMedia("(orientation: landscape)").matches) {
        document.getElementById('message-to-turn-device').classList.remove('d-flex');
        document.getElementById('message-to-turn-device').classList.add('d-none');
        document.getElementById('intro-image').style.display = 'block';
        document.getElementById('playIcon').style.right = '45%';
        document.getElementById('fullscreen').style.display = 'block';
    }
}

function showButtonToTurnDeviceInCaseOfWrongOrientation() {
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('message-to-turn-device').classList.remove('d-none');
    document.getElementById('message-to-turn-device').classList.add('d-flex');
    document.getElementById('control-panel-everything').classList.remove('d-flex');
    document.getElementById('control-panel-everything').classList.add('d-none');
}

function setCanvasElementsRightInCaseOfRightOrientation() {
    document.getElementById('canvas-container').style.display = 'block';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('fullscreen').style.display = 'block';
}

function canvasNotContainFullscreenModeAndNormalModeClass() {
    let fullscreenMode = document.getElementById('canvas').classList.contains('fullscreen-mode');
    let normalMode = document.getElementById('canvas').classList.contains('normal-mode');
    return !fullscreenMode && !normalMode;
}

function removeStyleCanvasClassAndAddFullscreenModeClass() {
    document.getElementById('canvas').classList.add('fullscreen-mode');
}

function canvasContainsNormalModeClassButNotFullscreenModeClass() {
    let fullscreenMode = document.getElementById('canvas').classList.contains('fullscreen-mode');
    let normalMode = document.getElementById('canvas').classList.contains('normal-mode');
    return !fullscreenMode && normalMode;
}

function addFullscreenModeClassAndRemoveAllTheOtherClassesFromCanvas() {
    document.getElementById('canvas').classList.remove('style-canvas');
    document.getElementById('canvas').classList.remove('normal-mode');
    document.getElementById('canvas').classList.add('fullscreen-mode');
}

function manageAddRemoveClassesWhenEnterFullscreen() {
    document.getElementById('canvas').classList.add('fullscreen-mode');
    document.getElementById('fullscreen').style.display = 'none';
    document.getElementById('minimize-button').style.display = 'block';
}

function manageAddRemoveClassesWhenExitFullscreen() {
    document.getElementById('canvas').classList.remove('fullscreen-mode');
    document.getElementById('fullscreen').style.display = 'block';
    document.getElementById('minimize-button').style.display = 'none';
}

function addNormalClassAndStyleCanvasModeAndRemoveFullscreenMode() {
    document.getElementById('canvas').classList.remove('fullscreen-mode');
    document.getElementById('canvas').classList.add('normal-mode');
    document.getElementById('canvas').classList.add('canvas-style');
}

function changeStyleWhenIndependentOfWinningOrLosing() {
    document.getElementById('canvas-container').style.display = 'none';
}

function changeStyleWhenLosing() {
    document.getElementById('losing-image').style.display = 'flex';
    document.getElementById('losing-image').classList.add('winning-image-properties');
    document.getElementById('main-title').style.display = 'none';
}

function changeStyleWhenWinning() {
    document.getElementById('winning-image').style.display = 'flex';
    document.getElementById('winning-image').classList.add('winning-image-properties');
    document.getElementById('main-title').style.display = 'none';
}

// Back-and-Forth-Shifting Fullscreen and Normal Mode Screen

function enterFullscreen(element) {
    if (!isFullscreenActivated) {
        isFullscreenActivated = true;
        manageAddRemoveClassesWhenEnterFullscreen();
    }
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function fullscreen() {
    let fullscreen = document.getElementById('canvas-container');
    if (isFullscreenActivated == false) {
        enterFullscreen(fullscreen);
    } else if (isFullscreenActivated == true) {
        exitFullscreen();
    }
}

// All Event-Listener-Functions Collected

document.addEventListener('fullscreenchange', () => {
    isFullscreenActivated = !!document.fullscreenElement;
    if (!isFullscreenActivated) {
        manageAddRemoveClassesWhenExitFullscreen();
    }
});

window.addEventListener("orientationchange", checkOrientation);

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) {
        if (isFullscreenActivated) {
            exitFullscreen();
        }
    }
});

window.addEventListener('keydown', (event) => {
    wasRandomKeyOncePressed = true;
    isKeyPressed = true;
    someKeyWasPressedAgain = new Date().getTime();
    world.character.wasRandomKeyOncePressed = wasRandomKeyOncePressed;
    world.character.someKeyWasPressedAgain = someKeyWasPressedAgain;
    world.character.isKeyStillPressed = isKeyPressed;
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
        if (keyboard.leftForThrow == true) {
            keyboard.leftForThrow = false;
        }
        keyboard.rightForThrow = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
        if (keyboard.rightForThrow == true) {
            keyboard.rightForThrow = false;
        }
        keyboard.leftForThrow = true;
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
    isKeyPressed = false;
    lastTimeKeyPressed = new Date().getTime();
    world.character.lastTimeKeyPressed = lastTimeKeyPressed;
    world.character.isKeyStillPressed = isKeyPressed;
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

window.addEventListener('touchstart', (event) => {
    if (event.target == document.getElementById('buttonLeft')) {
        keyboard.LEFT = true;
        if (keyboard.rightForThrow == true) {
            keyboard.rightForThrow = false;
        }
        keyboard.rightForThrow = true;
    }

    if (event.target == document.getElementById('buttonRight')) {
        keyboard.RIGHT = true;
        if (keyboard.rightForThrow == true) {
            keyboard.rightForThrow = false;
        }
        keyboard.rightForThrow = true;
    }

    if (event.target == document.getElementById('buttonUp')) {
        keyboard.SPACE = true;
    }

    if (event.target == document.getElementById('buttonThrow')) {
        keyboard.keyD = true;
    }
})

window.addEventListener('touchend', (event) => {
    if (event.target == document.getElementById('buttonLeft')) {
        keyboard.LEFT = false;
    }

    if (event.target == document.getElementById('buttonRight')) {
        keyboard.RIGHT = false;
    }

    if (event.target == document.getElementById('buttonUp')) {
        keyboard.SPACE = false;
    }

    if (event.target == document.getElementById('buttonThrow')) {
        keyboard.keyD = false;
    }
});