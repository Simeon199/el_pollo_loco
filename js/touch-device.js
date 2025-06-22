/**
 * Displays the canvas and hides the intro image when the screen orientation is correct.
 */

function setCanvasElementsRightInCaseOfRightOrientation() {
    prepareAllContainersStyleWhenRightOrientation();
}

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
 * Displays a message prompting the user to turn their device for better viewing. Hides the canvas container and other elements, and displays a rotation message overlay.
 */

function showMessageToTurnDevice() {
    if (window.innerWidth < 1300 && (window.innerHeight > window.innerWidth)) {
        document.getElementById('overlay').style.display = 'flex';
        document.getElementById('canvas-container').style.display = 'none';
        document.getElementById('canvas').style.display = 'none';
        makeContainersDisappearIfTheyAreStillThere();
        document.getElementById('message-to-turn-device').style.display = 'flex';
    }
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
 * Manages the style and layout depending on whether the screen is in landscape mode.
 */

function manageStyleDependingOnLandscapeScreenActivated() {
    if (!isLandscapeScreenActivated()) {
        stopGameAndShowTurnDeviceMessage();
    } else {
        showIntroImageAndDeactivateTurnDeviceMessage();
    }
}