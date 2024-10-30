// All the global variables that are used to control the game

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
let wasGameWon = null;
let soundOn = true;

/**
 * Checks the current screen orientation and manages fullscreen mode accordingly.
 */

function checkOrientation() {
    if (proveIfBackgroundIsEmpty()) {
        location.reload();
    }
    if (isChangingToFullscreenActivated()) {
        if (wasFullscreenActivated()) {
            location.reload();
        } else {
            exitFullscreen();
        }
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
        addControlPanelInCaseOfMobileDevice();
    }
}

/**
 * Stops the game and displays a message instructing the user to turn the device.
 */

function stopGameAndShowTurnDeviceMessage() {
    activateMessageToTurnDevice();
    clearAllIntervals();
    stopAllSounds();
    showMessageToTurnDevice();
}

/**
 * Adds the control panel if the device is not a mobile device.
 */

function addControlPanelInCaseOfMobileDevice() {
    if (!isMobileDevice()) {
        document.getElementById('control-panel-everything').style.display = 'flex';
    }
}

/**
 * Shows the intro image and hides the "turn device" message.
 */

function showIntroImageAndDeactivateTurnDeviceMessage() {
    document.getElementById('message-to-turn-device').style.display = 'none';
    document.getElementById('intro-image').style.display = 'flex';
}

/**
 * Activates and displays the "turn device" message.
 */

function activateMessageToTurnDevice() {
    document.getElementById('message-to-turn-device').style.display = 'flex';
    document.getElementById('intro-image').style.display = 'none';
    document.getElementById('canvas').style.display = 'none';
}

/**
 * Checks if fullscreen mode was previously activated.
 * 
 * @returns {boolean} - Returns true if fullscreen mode was previously activated.
 */

function wasFullscreenActivated() {
    return !isFullscreenActivated;
}

/**
 * Checks if the screen is currently transitioning to fullscreen mode.
 * 
 * @returns {boolean} - Returns true if the screen is not transitioning to fullscreen mode.
 */

function isChangingToFullscreenActivated() {
    return !isChangingToFullscreen;
}

/**
 * Checks if the screen is in landscape orientation.
 * 
 * @returns {boolean} - Returns true if the screen width is greater than the screen height.
 */

function isLandscapeScreenActivated() {
    return window.innerWidth > window.innerHeight;
}


/**
 * Deletes the current game world instance and clears all active intervals. Ensures no game logic persists from a previous game session.
 */

function deleteWorldInstance() {
    if (world) {
        clearAllIntervals();
        world = null;
    }
}

/**
 * Initializes the game by resetting all variables and listeners. Sets up a fresh game world and begins with default configurations.
 */

function init() {
    deleteWorldInstance();
    removeAllListeners();
    addAllEventListenersWhenInitGame();
    setRemainingObjectsAndVariablesWhenInitGame();
}

/**
 * Adds all essential event listeners needed when starting the game. Includes listeners for key and touch events.
 */

function addAllEventListenersWhenInitGame() {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    window.addEventListener('touchstart', touchStartHandler);
    window.addEventListener('touchend', touchEndHandler);
}

/**
 * Sets up essential game objects and variables needed for game initialization. Creates the game world, sets the canvas context, and verifies character states.
 */

function setRemainingObjectsAndVariablesWhenInitGame() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    checkIfEnemyOrCharacterIsDead();
    hasGameStarted = true;
}

/**
 * Periodically checks if the character or enemies are dead and stops the game accordingly.
 */

function checkIfEnemyOrCharacterIsDead() {
    if (!isGamePlaying) {
        return;
    }
    setInterval(() => {
        if (world.character.energy == 0) {
            wasGameWon = false;
            stopGame('losing');
        } else if (world.enemiesNumber <= 0) {
            wasGameWon = true;
            stopGame('winning');
        }
    }, 2000);
}

/**
 * Prevents event bubbling (propagation) for the given event.
 * 
 * @param {Event} event - The event object.
 */

function preventBubbling(event) {
    event.stopPropagation();
}

/**
 * Checks if the user is using a mobile device.
 * 
 * @returns {boolean} - Returns true if the device is a mobile device.
 */

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone|webOS|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);
}

/**
 * Checks if the user is using a tablet device.
 * 
 * @returns {boolean} - Returns true if the device is a tablet.
 */

function isTabletDevice() {
    return /iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk|Kindle/i.test(navigator.userAgent);
}

/**
 * Starts the game, initializes necessary elements, and handles screen orientation.
 */

function startGame() {
    checkForMobileVersion();
    setCanvasElementsRightInCaseOfRightOrientation();
    isGamePlaying = true;
    init();
}

/**
 * Checks the device type and adjusts the screen mode (fullscreen, control panel) accordingly.
 */

function checkForMobileVersion() {
    if (isMobileOrSmallDevice()) {
        setFullscreenStyle();
    } else if (isTabletOrCloseToDesktopSize()) {
        fullscreen();
    } else if (isDesktopDevice()) {
        setControlPanelStyle();
    }
}

/**
 * Checks if the device is a desktop.
 * 
 * @returns {boolean} - Returns true if the device is a desktop with a screen width greater than 1400px.
 */

function isDesktopDevice() {
    return window.innerWidth > window.innerHeight && window.innerWidth > 1400 && !isTabletDevice() && !isMobileDevice();
}

/**
 * Checks if the device is a mobile or small device (screen width < 1000px).
 * 
 * @returns {boolean} - Returns true if the device is a mobile or small device.
 */

function isMobileOrSmallDevice() {
    return isMobileDevice() && window.innerWidth < 1000;
}

/**
 * Checks if the device is a tablet or a device close to desktop size.
 * 
 * @returns {boolean} - Returns true if the device is a tablet or has a screen width between 1000px and 1400px.
 */

function isTabletOrCloseToDesktopSize() {
    return isTabletDevice() || (window.innerWidth > 1000 && window.innerWidth < 1400 && window.innerWidth > window.innerHeight);
}

/**
 * Stops the game and manages the style based on the outcome (winning or losing).
 * 
 * @param {string} string - The outcome of the game, either 'winning' or 'losing'.
 */

function stopGame(string) {
    if (!isGamePlaying) {
        return;
    }
    manageStyleWhenGameIsStopped();
    manageStyleDependingOnWinndingOrLosing(string);
    isGamePlaying = false;
}

/**
 * Resets the game, hiding the canvas and showing the intro image.
 */

function resetGame() {
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('intro-image').style.display = 'block';
    isGamePlaying = false;
    world = null;
}

/**
 * Checks if the world object exists.
 * 
 * @returns {boolean} - Returns true if the world exists.
 */

function doesWorldExist() {
    if (world) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if the character exists in the world.
 * 
 * @returns {boolean} - Returns true if the character exists.
 */

function doesCharacterExistInWorld() {
    if (world.character) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if throwable objects exist in the world.
 * 
 * @returns {boolean} - Returns true if throwable objects exist.
 */

function doThrowableObjectsExistInWorld() {
    if (world.throwableObject) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if enemies exist in the world.
 * 
 * @returns {boolean} - Returns true if enemies exist in the world.
 */

function doEnemiesExistInWorld() {
    if (world && world.level && world.level.enemies && world.level.enemies.length > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Clears all active intervals in the game.
 */

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

/**
 * Sets the global variable `isGamePlaying` to true if it is currently false. Ensures that the game state reflects an active game session.
 */

function setIsGamePlayingTrueIfFalse() {
    if (isGamePlaying == false) {
        isGamePlaying = true;
    }
}

/**
 * Prepares the game to be played again, resetting the world and calling the function "settingUpStyleWhenPlayAgainButtonPressed()".
 */

function playAgain() {
    wasGameWon = null;
    settingUpStyleWhenPlayAgainButtonPressed();
    hasGameStarted = false;
    if (!isDesktopDevice() && !isFullscreenActivated) {
        fullscreen();
    }
    setIsGamePlayingTrueIfFalse();
    init();
}