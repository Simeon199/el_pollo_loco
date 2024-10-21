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
    document.getElementById('sound-on-icon').style.borderRadius = '16px';
    document.getElementById('sound-on-icon').style.border = '4px solid black';
    document.getElementById('sound-on-icon').style.padding = '6px';
    document.getElementById('sound-off-icon').style.borderRadius = '16px';
    document.getElementById('sound-off-icon').style.border = '4px solid black';
    document.getElementById('sound-off-icon').style.padding = '6px';
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
    isFullscreenActivated = false;
    isChangingToFullscreen = false;
}

function fullscreen() {
    let fullscreen = document.getElementById('canvas-container');
    if (!isFullscreenActivated) {
        enterFullscreen(fullscreen);
    } else {
        exitFullscreen();
    }
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

function setFullscreenStyle() {
    document.getElementById('fullscreen').style.display = 'none';
}

function setControlPanelStyle() {
    let controlPanel = document.getElementById('control-panel-everything');
    if (controlPanel.style.display == 'none') {
        controlPanel.style.display = 'flex';
    }
}

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