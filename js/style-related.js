/**
 * Displays the canvas and hides the intro image when the screen orientation is correct.
 */

function setCanvasElementsRightInCaseOfRightOrientation() {
    prepareAllContainersStyleWhenRightOrientation();
}

/**
 * Changes the display of the fullscreen button on flex if the device is a desktop.
 */

// function toggleFullscreenInCaseOfDesktopDevice() {
//     document.getElementById('fullscreen').style.display = 'flex';
// }

/**
 * Prepares and adjusts the style of all relevant HTML-containers when the device orientation is correct.
 */

function prepareAllContainersStyleWhenRightOrientation() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('canvas-container').style.display = 'flex';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('canvas-container').style.justifyContent = 'center';
    document.getElementById('canvas-container').style.alignItems = 'center';
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
 * Manages the addition and removal of classes and styles when entering fullscreen mode.
 */

function manageAddRemoveClassesWhenEnterFullscreen() {
    handleEnterFullscreenStylingClasses();
    controlMuteCondition();
}

/**
 * Applies styling classes to elements when entering fullscreen mode. Adds a class to the canvas for fullscreen mode and hides the fullscreen button.
 */

function handleEnterFullscreenStylingClasses() {
    document.getElementById('canvas').classList.add('fullscreen-mode');
    // document.getElementById('fullscreen').style.display = 'none';
}

/**
 * Controls the mute state based on the game's start status. Mutes or unmutes sound depending on whether the game has started or is paused.
 */

function controlMuteCondition() {
    if (hasGameStarted) {
        manageLogicOfSoundOnOrSoundOff();
    } else {
        manageSoundOnSoundOffWhenGameIsntPlaying();
    }
}

/**
 * Manages the display of sound icons when the game is not playing. Shows the sound-on icon and hides the sound-off icon.
 */

function manageSoundOnSoundOffWhenGameIsntPlaying() {
    document.getElementById('sound-off-icon').style.display = 'none';
    document.getElementById('sound-on-icon').style.display = 'flex';
}

/**
 * Manages the display of sound icons based on the sound state when the game is playing. Shows or hides sound-on and sound-off icons depending on the value of `soundOn`.
 */

function manageLogicOfSoundOnOrSoundOff() {
    if (soundOn) {
        document.getElementById('sound-off-icon').style.display = 'none';
        document.getElementById('sound-on-icon').style.display = 'flex';
    } else {
        document.getElementById('sound-off-icon').style.display = 'flex';
        document.getElementById('sound-on-icon').style.display = 'none';
    }
}

/**
 * Toggles the sound icon based on whether the sound is muted. Displays either the sound-on or sound-off icon depending on the `soundIsMuted` state.
 */

function toggleSoundIconBasedOnSoundIsMuted() {
    if (soundIsMuted) {
        document.getElementById('sound-off-icon').style.display = 'flex';
    } else {
        document.getElementById('sound-on-icon').style.display = 'flex';
    }
}

/**
 * Manages the addition and removal of classes and styles when entering fullscreen mode.
 */

function manageAddRemoveClassesWhenExitFullscreen() {
    document.getElementById('canvas').classList.remove('fullscreen-mode');
    // document.getElementById('fullscreen').style.display = 'block';
    toggleSoundIconBasedOnSoundIsMuted();
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
 * Adds the 'normal-mode' class and the 'canvas-style' class to the canvas. Removes the 'fullscreen-mode' class.
 */

function changeStyleWhenIndependentOfWinningOrLosing() {
    document.getElementById('canvas-container').style.display = 'none';
}

/**
 * Displays a message prompting the user to turn their device for better viewing. Hides the canvas container and other elements, and displays a rotation message overlay.
 */

function showMessageToTurnDevice() {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('canvas-container').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
    makeContainersDisappearIfTheyAreStillThere();
    document.getElementById('message-to-turn-device').style.display = 'flex';
}

/**
 * Hides any remaining intro, winning, or losing image containers if they are visible. Ensures no unnecessary containers remain visible when displaying the turn device message.
 */

function makeContainersDisappearIfTheyAreStillThere() {
    if (document.getElementById('intro-image') !== 'none') {
        document.getElementById('intro-image').style.display = 'none';
    } else if (document.getElementById('winning-image') !== 'none') {
        document.getElementById('winning-image').style.display = 'none';
    } else if (document.getElementById('losing-image') !== 'none') {
        document.getElementById('losing-image') = 'none';
    }
}

/**
 * Changes the style to display the losing screen.
 */

function changeStyleWhenLosing() {
    if (document.getElementById('intro-image').style.display !== 'none') {
        document.getElementById('intro-image').style.display = 'none';
    }
    document.getElementById('losing-image').style.display = 'flex';
    document.getElementById('losing-image').classList.add('losing-image-properties');
    document.getElementById('main-title').style.display = 'none';
}

/**
 * Changes the style to display the winning screen.
 */

function changeStyleWhenWinning() {
    if (document.getElementById('intro-image').style.display !== 'none') {
        document.getElementById('intro-image').style.display = 'none';
    }
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
    requesFullscreenFunction(element);
}

/**
 * Requests fullscreen mode for a specified element, accounting for browser compatibility.
 */

function requesFullscreenFunction(element) {
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
 * Toggles fullscreen mode for the canvas container. Enters or exits fullscreen depending on the current state.
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
 * Manages the style and layout when the game is stopped. Stops all game intervals, sounds, and exits fullscreen mode.
 */

function manageStyleWhenGameIsStopped(string) {
    clearAllIntervals();
    stopAllSounds();
    isGamePlaying = false;
    document.getElementById('canvas').style.display = 'none';
    changeStyleWhenIndependentOfWinningOrLosing(string);
    exitFullscreen();
}

/**
 * Manages the style depending on whether the player won or lost the game.
 * 
 * @param {string} string - The game outcome, either 'losing' or 'winning'.
 */

function manageStyleDependingOnWinndingOrLosing(string) {
    prepareDisplayWinningLosingStyle();
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
 * Prepares the overlay and hides the intro image if it is visible, setting up for a "winning" or "losing" display style. Ensures the overlay is shown to provide visual feedback.
 */

function prepareDisplayWinningLosingStyle() {
    document.getElementById('overlay').style.display = 'flex';
    if (document.getElementById('intro-image').style.display !== 'none') {
        document.getElementById('intro-image').style.display = 'none';
    }
}

/**
* Resets the necessary styling by hiding or showing certain containers when playAgain()-button is pressed.
*/

function settingUpStyleWhenPlayAgainButtonPressed() {
    if (document.getElementById('overlay').style.display !== 'none') {
        document.getElementById('overlay').style.display = 'none';
    }
    document.getElementById('canvas-container').style.display = 'flex';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('losing-image').style.display = 'none';
    document.getElementById('winning-image').style.display = 'none';
    document.getElementById('main-title').style.display = 'none';
}

/**
 * Manages the style and layout depending on whether the screen is in landscape mode.
 */

function manageStyleDependingOnLandscapeScreenActivated() {
    if (!isLandscapeScreenActivated()) {
        stopGameAndShowTurnDeviceMessage();
    } else {
        showIntroImageAndDeactivateTurnDeviceMessage();
    }
}