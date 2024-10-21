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
let soundIsMuted = false;
let isGamePlaying = false;
let soundOn = true;


function checkOrientation() {
    if (isChangingToFullscreenActivated()) {
        if (wasFullscreenActivated()) {
            manageStyleDependingOnLandscapeScreenActivated();
        } else {
            exitFullscreen();
        }
    }
}

function manageStyleDependingOnLandscapeScreenActivated() {
    if (isLandscapeScreenActivated()) {
        stopGameAndShowTurnDeviceMessage();
    } else {
        showIntroImageAndDeactivateTurnDeviceMessage();
        addControlPanelInCaseOfMobileDevice();
    }
}

function stopGameAndShowTurnDeviceMessage() {
    activateMessageToTurnDevice();
    clearAllIntervals();
    stopAllSounds();
    changeStyleWhenIndependentOfWinningOrLosing();
}

function addControlPanelInCaseOfMobileDevice() {
    if (isMobileDevice()) { //  || isTabletDevice()
        console.log('test');
        // document.getElementById('control-panel-everything').style.display = 'none';
    } else {
        document.getElementById('control-panel-everything').style.display = 'flex';
    }
}

function showIntroImageAndDeactivateTurnDeviceMessage() {
    document.getElementById('message-to-turn-device').style.display = 'none';
    document.getElementById('intro-image').style.display = 'flex';
}

function activateMessageToTurnDevice() {
    document.getElementById('message-to-turn-device').style.display = 'flex';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
}

function wasFullscreenActivated() {
    return !isFullscreenActivated;
}

function isChangingToFullscreenActivated() {
    return !isChangingToFullscreen;
}

function isLandscapeScreenActivated() {
    return window.innerHeight > window.innerWidth;
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
            isGamePlaying = false;
        } else if (world.enemiesNumber <= 0) {
            stopGame('winning');
        }
    }, 100);
}


function preventBubbling(event) {
    event.stopPropagation();
}

// Start-or-Stop Game Related Logic

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone|webOS|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);
}

function isTabletDevice() {
    return /iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk|Kindle/i.test(navigator.userAgent);
}


function startGame() {
    checkForMobileVersion();
    setCanvasElementsRightInCaseOfRightOrientation();
    isGamePlaying = true;
    init();
}

function checkForMobileVersion() {
    if (isMobileOrSmallDevice()) {
        setFullscreenStyle();
    } else if (isTabletOrCloseToDesktopSize()) {
        fullscreen();
    } else if (isDesktopDevice()) {
        setControlPanelStyle();
    }
}

function isDesktopDevice() {
    return window.innerWidth > window.innerHeight && window.innerWidth > 1400 && !isTabletDevice() && !isMobileDevice();
}

function isMobileOrSmallDevice() {
    return isMobileDevice() && window.innerWidth < 1000;
}

function isTabletOrCloseToDesktopSize() {
    return isTabletDevice() || (window.innerWidth > 1000 && window.innerWidth < 1400 && window.innerWidth > window.innerHeight);
}

function stopGame(string) {
    if (!isGamePlaying) return;
    setTimeout(() => {
        manageStyleWhenGameIsStopped();
        manageStyleDependingOnWinndingOrLosing(string);
    }, 1000);
}

function resetGame() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('intro-image').style.display = 'block';
    isGamePlaying = false;
    world = null;
}

// Exist Object Functions (should stay in game.js)

function doesWorldExist() {
    if (world) {
        return true;
    } else {
        return false;
    }
}

function doesCharacterExistInWorld() {
    if (world.character) {
        return true;
    } else {
        return false;
    }
}

function doThrowableObjectsExistInWorld() {
    if (world.throwableObject) {
        return true;
    } else {
        return false;
    }
}

function doEnemiesExistInWorld() {
    if (world && world.level && world.level.enemies && world.level.enemies.length > 0) {
        return true;
    } else {
        return false;
    }
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

function playAgain() {
    document.getElementById('canvas-container').style.display = 'flex';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('losing-image').style.display = 'none';
    document.getElementById('winning-image').style.display = 'none';
    document.getElementById('main-title').style.display = 'none';
    world = new World(canvas, keyboard);
    hasGameStarted = false;
    checkIfEnemyOrCharacterIsDead();
    if (!isFullscreenActivated) {
        fullscreen();
    }
}