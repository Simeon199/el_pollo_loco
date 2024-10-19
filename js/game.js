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

// function addControlPanelInCaseOfMobileDevice() {
//     if (!(isMobileDevice() || isTabletDevice())) {
//         console.log('test');
//         document.getElementById('control-panel-everything').style.display = 'none';
//     } else {
//         document.getElementById('control-panel-everything').style.display = 'flex';
//     }
// }

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


window.addEventListener("orientationchange", checkOrientation);
window.addEventListener('resize', checkOrientation);
// window.addEventListener('resize', () => {
//     if (isGamePlaying) {
//         stopGame();
//     }
// });

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

function setFullscreenStyle() {
    document.getElementById('fullscreen').style.display = 'none';
}

function setControlPanelStyle() {
    let controlPanel = document.getElementById('control-panel-everything');
    if (controlPanel.style.display == 'none') {
        controlPanel.style.display = 'flex';
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

function manageStyleWhenGameIsStopped() {
    clearAllIntervals();
    stopAllSounds();
    isGamePlaying = false;
    document.getElementById('canvas').style.display = 'none';
    changeStyleWhenIndependentOfWinningOrLosing();
    exitFullscreen();
}

function manageStyleDependingOnWinndingOrLosing(string) {
    if (string === 'losing') {
        changeStyleWhenLosing(string);
    } else if (string === 'winning') {
        changeStyleWhenWinning(string);
    } else {
        resetGame();
    }
}

function resetGame() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('intro-image').style.display = 'block';
    isGamePlaying = false;
    world = null;
}

function stopAllSounds() {
    if (world && world.backgroundMusic) {
        world.backgroundMusic.pause();
    }
    if (world && world.level && world.level.enemies && world.level.enemies.length > 0) {
        world.level.enemies.forEach(enemy => {
            if (enemy.chickenSound) {
                enemy.chickenSound.pause();
            }
        });
    }
}

function turnSoundOnOrOff() {
    soundIsMuted = !soundIsMuted;
    if (soundIsMuted) {
        muteUnmuteSound(true);
        showTurningSoundOffIcon();
    } else {
        muteUnmuteSound(false);
        showTurningSoundOnIcon();
    }
}

function showTurningSoundOffIcon() {
    soundOn = false;
    document.getElementById('sound-off-icon').style.display = 'flex';
    document.getElementById('sound-on-icon').style.display = 'none'
}

function showTurningSoundOnIcon() {
    soundOn = true;
    document.getElementById('sound-off-icon').style.display = 'none';
    document.getElementById('sound-on-icon').style.display = 'flex';
}

function setAllWorldAudioSound(bolean) {
    manageBackgroundMusic(bolean);
    manageAudioRelatedToHitting(bolean);
    manageAudioRelatedToCollectingItems(bolean);
}

function manageBackgroundMusic(bolean) {
    if (world.backgroundMusic) {
        world.backgroundMusic.muted = bolean;
    }
}

function manageAudioRelatedToHitting(bolean) {
    if (world.hit) {
        world.hit.muted = bolean;
    }
    if (world.punchAndOuch) {
        world.punchAndOuch.muted = bolean;
    }
    if (world.bottleHit) {
        world.bottleHit.muted = bolean;
    }
}

function manageAudioRelatedToCollectingItems(bolean) {
    if (world.loadingSound) {
        world.loadingSound.muted = bolean;
    }
    if (world.bellSound) {
        world.bellSound.muted = bolean;
    }
}

function setAllCharacterAudioSound(bolean) {
    if (world.character.walking_sound) {
        world.character.walking_sound.muted = bolean;
    }
    if (world.character.snorring_sound) {
        world.character.snorring_sound.muted = bolean;
    }
}

function setThrowableObjectsAudioSound(bolean) {
    world.throwableObjects.forEach(throwableObject => {
        if (throwableObject.bottleLanding) {
            throwableObject.bottleLanding.muted = bolean;
        }
    });
}

function setEnemiesAudioSound(bolean) {
    world.level.enemies.forEach(enemy => {
        if (enemy.chickenSound) {
            enemy.chickenSound.muted = bolean;
        }
        if (enemy.chickenScream) {
            enemy.chickenScream.muted = bolean;
        }
        if (enemy.hitAndScream) {
            enemy.hitAndScream.muted = bolean;
        }
    });
}

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

function muteUnmuteSound(bolean) {
    if (doesWorldExist()) {
        setAllWorldAudioSound(bolean);
        if (doesCharacterExistInWorld()) {
            setAllCharacterAudioSound(bolean);
        }
        if (doThrowableObjectsExistInWorld()) {
            setThrowableObjectsAudioSound(bolean);
        }
        if (doEnemiesExistInWorld()) {
            setEnemiesAudioSound(bolean);
        }
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
}

// All CSS-Styling-Related Code

function setCanvasElementsRightInCaseOfRightOrientation() {
    document.getElementById('canvas-container').style.display = 'flex';
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

function setSoundStylingForFullscreen() {
    // document.getElementById('sound-on-icon').style.width = '100px';
    document.getElementById('sound-on-icon').style.borderRadius = '16px';
    document.getElementById('sound-on-icon').style.border = '4px solid black';
    document.getElementById('sound-on-icon').style.padding = '6px';
    // document.getElementById('sound-off-icon').style.width = '100px';
    document.getElementById('sound-off-icon').style.borderRadius = '16px';
    document.getElementById('sound-off-icon').style.border = '4px solid black';
    document.getElementById('sound-off-icon').style.padding = '6px';
    // document.getElementById('sound-screen-control-container').style.top = '85%';
}

function manageAddRemoveClassesWhenEnterFullscreen() {
    document.getElementById('canvas').classList.add('fullscreen-mode');
    document.getElementById('fullscreen').style.display = 'none';
    if (isTabletOrCloseToDesktopSize()) {
        document.getElementById('minimize-button').style.display = 'none';
    } else {
        document.getElementById('minimize-button').style.display = 'flex';
    }
    if (soundOn) {
        document.getElementById('sound-off-icon').style.display = 'none';
        document.getElementById('sound-on-icon').style.display = 'flex';
    } else {
        document.getElementById('sound-off-icon').style.display = 'flex';
        document.getElementById('sound-on-icon').style.display = 'none';
    }
    setSoundStylingForFullscreen();
}

function manageAddRemoveClassesWhenExitFullscreen() {
    document.getElementById('canvas').classList.remove('fullscreen-mode');
    document.getElementById('fullscreen').style.display = 'block';
    document.getElementById('minimize-button').style.display = 'none';
    if (soundIsMuted) {
        document.getElementById('sound-off-icon').style.display = 'flex';
    } else {
        document.getElementById('sound-on-icon').style.display = 'flex';
    }
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

// window.addEventListener('keydown', (event) => {
//     if (event.keyCode == 27) {
//         if (isFullscreenActivated) {
//             exitFullscreen();
//         }
//     }
// });

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

window.addEventListener('touchstart', (event) => {
    if (wasntPlayIconPressed(event)) {
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
    if (wasntPlayIconPressed(event)) {
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