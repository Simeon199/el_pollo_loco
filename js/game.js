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
let isIntroImageActivated = false;
let isFullscreenActivated = false;
let isChangingToFullscreen = false;

function handleOrientationChange() {
    if (isMobileDevice()) {
        if (checkOrientation()) {
            if (hasGameStarted = true) {
                stopGame('orientation');
            }
        }
    }
}

function checkOrientation() {
    // debugger;
    if (!isChangingToFullscreen) {
        if (!isFullscreenActivated) {
            if (window.innerHeight > window.innerWidth) {
                document.getElementById('message-to-turn-device').style.display = 'flex';
                document.getElementById('intro-image').style.display = 'none';
                document.getElementById('canvas').style.display = 'none';
                clearAllIntervals();
                stopAllSounds();
                changeStyleWhenIndependentOfWinningOrLosing();
            } else {
                document.getElementById('message-to-turn-device').style.display = 'none';
                document.getElementById('intro-image').style.display = 'block';
            }
        } else {
            exitFullscreen();
        }
    }
}


window.addEventListener("orientationchange", checkOrientation);
window.addEventListener('resize', checkOrientation);

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
    setCanvasElementsRightInCaseOfRightOrientation();
    init();
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
    if (world && world.backgroundMusic) {
        world.backgroundMusic.pause();
    }
    if (world && world.level && world.level.enemies && world.level.enemies.length > 0) {
        world.level.enemies[world.level.enemies.length - 1].chickenSound.pause();
    }
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

function playAgain() {
    document.getElementById('canvas-container').style.display = 'block';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('losing-image').style.display = 'none';
    document.getElementById('winning-image').style.display = 'none';
    document.getElementById('main-title').style.display = 'none';
    world = new World(canvas, keyboard);
    hasGameStarted = false;
    checkIfEnemyOrCharacterIsDead();
}

// All CSS-Styling-Related Code

function setCanvasElementsRightInCaseOfRightOrientation() {
    document.getElementById('canvas-container').style.display = 'block';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('intro-image').style.display = 'none';
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
        isChangingToFullscreen = true;
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
    if (!isFullscreenActivated) {
        enterFullscreen(fullscreen);
    } else {
        exitFullscreen();
    }
}

// All Event-Listener-Functions Collected

document.addEventListener('fullscreenchange', () => {
    isFullscreenActivated = !!document.fullscreenElement;
    if (!isFullscreenActivated) {
        manageAddRemoveClassesWhenExitFullscreen();
    } else {
        isChangingToFullscreen = false;
    }
});

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