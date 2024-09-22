let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let hasGameStarted = false;
let isFullscreenActivated = false;

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

function canvasNotContainFullscreenModeAndNormalModeClass() {
    let fullscreenMode = document.getElementById('canvas').classList.contains('fullscreen-mode');
    let normalMode = document.getElementById('canvas').classList.contains('normal-mode');
    return !fullscreenMode && !normalMode;
}

function removeStyleCanvasClassAndAddFullscreenModeClass() {
    document.getElementById('canvas').classList.remove('style-canvas');
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
    if (canvasNotContainFullscreenModeAndNormalModeClass()) {
        removeStyleCanvasClassAndAddFullscreenModeClass();
    } else if (canvasContainsNormalModeClassButNotFullscreenModeClass()) {
        addFullscreenModeClassAndRemoveAllTheOtherClassesFromCanvas();
    }
    document.getElementById('fullscreen').style.display = 'none';
    document.getElementById('minimize-button').style.display = 'block';
}

function canvasContainsFullscreenModeClassButNotNormalModeClass() {
    let fullscreenMode = document.getElementById('canvas').classList.contains('fullscreen-mode');
    let normalMode = document.getElementById('canvas').classList.contains('normal-mode');
    return fullscreenMode && !normalMode;
}

function addNormalClassAndStyleCanvasModeAndRemoveFullscreenMode() {
    document.getElementById('canvas').classList.add('style-canvas');
    document.getElementById('canvas').classList.remove('fullscreen-mode');
    document.getElementById('canvas').classList.add('normal-mode');
}

function manageAddRemoveClassesWhenExitFullscreen() {
    if (canvasContainsFullscreenModeClassButNotNormalModeClass()) {
        addNormalClassAndStyleCanvasModeAndRemoveFullscreenMode();
    }
    document.getElementById('fullscreen').style.display = "block";
    document.getElementById('minimize-button').style.display = 'none';
}

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
    if (isFullscreenActivated == true) {
        isFullscreenActivated = false;
        manageAddRemoveClassesWhenExitFullscreen();
    }
    document.exitFullscreen();
}

function fullscreen() {
    let fullscreen = document.getElementById('canvas-container');
    if (isFullscreenActivated == false) {
        enterFullscreen(fullscreen);
    } else if (isFullscreenActivated == true) {
        exitFullscreen();
    }
}

function startGame() {
    document.getElementById('canvas-container').style.display = 'block';
    document.getElementById('canvas').classList.add('style-canvas');
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('fullscreen').style.display = 'block';
    init();
}

function playAgain() {
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('losing-image').style.display = 'none';
    document.getElementById('winning-image').style.display = 'none';
    document.getElementById('main-title').style.display = 'none';
    world = new World(canvas, keyboard);
    hasGameStarted = false;
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

function stopGame(string) {
    setTimeout(() => {
        clearAllIntervals();
        document.getElementById('canvas').style.display = 'none';
        if (string == 'losing') {
            document.getElementById('losing-image').style.display = 'flex';
            document.getElementById('winning-image').classList.add('winning-image-properties');
        } else if (string == 'winning') {
            document.getElementById('winning-image').style.display = 'flex';
            document.getElementById('winning-image').classList.add('winning-image-properties');
        }
    }, 100);
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

window.addEventListener('keydown', (event) => {
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

    if (event.keyCode == 27) {
        exitFullscreen();
    }
})

window.addEventListener('keyup', (event) => {
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

    if (event.keyCode == 27) {
        exitFullscreen();
    }
})