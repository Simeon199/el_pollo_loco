/**
 * Displays the canvas and hides the intro image when the screen orientation is correct.
 */

function setCanvasElementsRightInCaseOfRightOrientation() {
    document.getElementById('canvas-container').style.display = 'flex';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('intro-image').style.display = 'none';
}

/**
 * Checks if the canvas does not contain the 'fullscreen-mode' and 'normal-mode' classes.
 * 
 * @returns {boolean} - Returns true if the canvas has neither 'fullscreen-mode' nor 'normal-mode'.
 */

function canvasNotContainFullscreenModeAndNormalModeClass() {
    let fullscreenMode = document.getElementById('canvas').classList.contains('fullscreen-mode');
    let normalMode = document.getElementById('canvas').classList.contains('normal-mode');
    return !fullscreenMode && !normalMode;
}

/**
 * Adds the 'fullscreen-mode' class to the canvas element.
 */

function removeStyleCanvasClassAndAddFullscreenModeClass() {
    document.getElementById('canvas').classList.add('fullscreen-mode');
}

/**
 * Checks if the canvas contains the 'normal-mode' class but not the 'fullscreen-mode' class.
 * 
 * @returns {boolean} - Returns true if the canvas contains 'normal-mode' but not 'fullscreen-mode'.
 */

function canvasContainsNormalModeClassButNotFullscreenModeClass() {
    let fullscreenMode = document.getElementById('canvas').classList.contains('fullscreen-mode');
    let normalMode = document.getElementById('canvas').classList.contains('normal-mode');
    return !fullscreenMode && normalMode;
}

/**
 * Removes all other classes from the canvas and adds the 'fullscreen-mode' class.
 */

function addFullscreenModeClassAndRemoveAllTheOtherClassesFromCanvas() {
    document.getElementById('canvas').classList.remove('style-canvas');
    document.getElementById('canvas').classList.remove('normal-mode');
    document.getElementById('canvas').classList.add('fullscreen-mode');
}

/**
 * Sets the styling for the sound icons when the game is in fullscreen mode.
 */

function setSoundStylingForFullscreen() {
    document.getElementById('sound-on-icon').style.borderRadius = '16px';
    document.getElementById('sound-on-icon').style.border = '4px solid black';
    document.getElementById('sound-on-icon').style.padding = '6px';
    document.getElementById('sound-off-icon').style.borderRadius = '16px';
    document.getElementById('sound-off-icon').style.border = '4px solid black';
    document.getElementById('sound-off-icon').style.padding = '6px';
}

/**
 * Manages the addition and removal of classes and styles when entering fullscreen mode.
 */

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

/**
 * Manages the addition and removal of classes and styles when entering fullscreen mode.
 */

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

/**
 * Manages the addition and removal of classes and styles when exiting fullscreen mode.
 */

function addNormalClassAndStyleCanvasModeAndRemoveFullscreenMode() {
    document.getElementById('canvas').classList.remove('fullscreen-mode');
    document.getElementById('canvas').classList.add('normal-mode');
    document.getElementById('canvas').classList.add('canvas-style');
}

/**
 * Adds the 'normal-mode' class and the 'canvas-style' class to the canvas.
 * Removes the 'fullscreen-mode' class.
 */

function changeStyleWhenIndependentOfWinningOrLosing() {
    document.getElementById('canvas-container').style.display = 'none';
}

/**
 * Changes the style to display the losing screen.
 */

function changeStyleWhenLosing() {
    document.getElementById('losing-image').style.display = 'flex';
    document.getElementById('losing-image').classList.add('winning-image-properties');
    document.getElementById('main-title').style.display = 'none';
}

/**
 * Changes the style to display the winning screen.
 */

function changeStyleWhenWinning() {
    document.getElementById('winning-image').style.display = 'flex';
    document.getElementById('winning-image').classList.add('winning-image-properties');
    document.getElementById('main-title').style.display = 'none';
}

/**
 * Activates fullscreen mode for the given element, managing necessary changes for entering fullscreen.
 * 
 * @param {HTMLElement} element - The element to be displayed in fullscreen mode.
 */

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

/**
 * Exits fullscreen mode and resets fullscreen-related flags.
 */

function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    isFullscreenActivated = false;
    isChangingToFullscreen = false;
}

/**
 * Toggles fullscreen mode for the canvas container. 
 * Enters or exits fullscreen depending on the current state.
 */

function fullscreen() {
    let fullscreen = document.getElementById('canvas-container');
    if (!isFullscreenActivated) {
        enterFullscreen(fullscreen);
    } else {
        exitFullscreen();
    }
}

/**
 * Manages the style and layout when the game is stopped.
 * Stops all game intervals, sounds, and exits fullscreen mode.
 */

function manageStyleWhenGameIsStopped() {
    clearAllIntervals();
    stopAllSounds();
    isGamePlaying = false;
    document.getElementById('canvas').style.display = 'none';
    changeStyleWhenIndependentOfWinningOrLosing();
    exitFullscreen();
}

/**
 * Manages the style depending on whether the player won or lost the game.
 * 
 * @param {string} string - The game outcome, either 'losing' or 'winning'.
 */

function manageStyleDependingOnWinndingOrLosing(string) {
    if (string === 'losing') {
        changeStyleWhenLosing(string);
    } else if (string === 'winning') {
        changeStyleWhenWinning(string);
    }
    else {
        resetGame();
    }
}

/**
 * Hides the fullscreen button.
 */

function setFullscreenStyle() {
    document.getElementById('fullscreen').style.display = 'none';
}

/**
 * Toggles the visibility of the control panel.
 */

function setControlPanelStyle() {
    let controlPanel = document.getElementById('control-panel-everything');
    if (controlPanel.style.display == 'none') {
        controlPanel.style.display = 'flex';
    }
}

/**
 * Opens the container displaying all icons in a minimized version.
 */

function openAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    if (allIconsMiniVersionContainer.style.display !== 'flex') {
        allIconsMiniVersionContainer.style.display = ' flex';
    }
}

/**
 * Closes the container displaying all icons in a minimized version.
 */

function closeAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    if (allIconsMiniVersionContainer.style.display !== 'none') {
        allIconsMiniVersionContainer.style.display = ' none';
    }
}

/**
 * Opens the settings section, explaining the game if it is hidden.
 */

function openSettingsFunction() {
    let explainGameContainer = document.getElementById('explain-game-container');
    if (explainGameContainer.classList.contains('d-none')) {
        explainGameContainer.classList.remove('d-none');
    }
}

/**
 * Closes the settings section explaining the game if it is visible.
 */

function closeExplainGameContainer() {
    let explainGameContainer = document.getElementById('explain-game-container');
    if (!explainGameContainer.classList.contains('d-none')) {
        explainGameContainer.classList.add('d-none');
    }
}

/**
* Resets the necessary styling by hiding or showing certain containers when playAgain()-button is pressed.
*/

function settingUpStyleWhenPlayAgainButtonPressed() {
    document.getElementById('canvas-container').style.display = 'flex';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('losing-image').style.display = 'none';
    document.getElementById('winning-image').style.display = 'none';
    document.getElementById('main-title').style.display = 'none';
}