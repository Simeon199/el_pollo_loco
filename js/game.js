// All the global variables that are used to control the game

let timePointWhenGameInitialized = 0;
let wasRandomKeyOncePressed = false;
let isKeyPressed = false;
let someKeyWasPressedAgain = 0;
let lastTimeKeyPressed = 0;
let timeWhenKeyDWasPressed = 0;
let timeWhenKeyDWasReleased = 0;
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
let stopGameInterval;

/**
 * Checks the current screen orientation and background state, 
 * and reloads the page or exits fullscreen mode based on conditions.
 */

function checkOrientation() {
    if (proveIfBackgroundIsEmpty()) {
        // debugger;
        location.reload();
    }
    if (isChangingToFullscreenActivated()) {
        // debugger;
        activateMessageToTurnDevice();
        if (wasFullscreenActivated()) {
            // activateMessageToTurnDevice();
            location.reload();
        } else {
            exitFullscreen();
        }
    }
    if (isMobileDevice() || isTabletDevice()) {
        activateMessageToTurnDevice();
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
    if ((window.innerWidth < 1300 || window.innerHeight < 800) && window.innerWidth > window.innerHeight) {
        // debugger;
        document.getElementById('message-to-turn-device').style.display = 'flex';
        document.getElementById('intro-image').style.display = 'none';
        document.getElementById('canvas').style.display = 'none';
    }
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
    return (window.innerWidth > window.innerHeight);
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
    muteUnmuteSound(soundIsMuted);
    controlTurnOnTurnOffIcon();
    timePointWhenGameInitialized = new Date().getTime();
}

/**
 * Controls the display of the sound icon based on the current mute state. If the sound is muted, it displays the "sound off" icon.
 * If the sound is unmuted, it displays the "sound on" icon.
 */

function controlTurnOnTurnOffIcon() {
    if (soundIsMuted) {
        showTurningSoundOffIcon();
    } else {
        showTurningSoundOnIcon();
    }
}

/**
 * Mutes all game sounds by updating the sound state variables. Sets `soundOn` to `false` and `soundIsMuted` to `true` to reflect
 * that the game sounds are turned off.
 */

function muteGameSounds() {
    soundOn = false;
    soundIsMuted = true;
}

/**
 * Unmutes all game sounds by updating the sound state variables. Sets `soundOn` to `true` and `soundIsMuted` to `false` to reflect
 * that the game sounds are turned on.
 */

function unmuteGameSounds() {
    soundOn = true;
    soundIsMuted = false;
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
 * If the game is not currently playing (`isGamePlaying` is `false`), the function exits early. If the game is playing, it calls 
 * `manageStopGameInterval()` to handle any necessary game interval adjustments.
 */

function checkIfEnemyOrCharacterIsDead() {
    if (!isGamePlaying) {
        return;
    }
    manageStopGameInterval();
}

/**
 * Periodically checks if the character or enemies are dead and stops the game accordingly.
 */

function manageStopGameInterval() {
    if (stopGameInterval) {
        clearInterval(stopGameInterval);
    }
    stopGameInterval = setInterval(() => {
        if (world.character.energy === 0) {
            wasGameWon = false;
            stopGame('losing');
            clearInterval(stopGameInterval);
        } else if (world.enemiesNumber <= 0) {
            wasGameWon = true;
            stopGame('winning');
            clearInterval(stopGameInterval);
        }
    }, 2000);
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
    setCanvasElementsRightInCaseOfRightOrientation();
    isGamePlaying = true;
    init();
}

/**
 * Checks if the device is a desktop.
 * 
 * @returns {boolean} - Returns true if the device is a desktop with a screen width greater than 1400px.
 */

// function isDesktopDevice() {
//     return window.innerWidth > window.innerHeight && window.innerWidth > 1400 && !isTabletDevice() && !isMobileDevice();
// }

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
 * @returns {boolean} - Returns true if the world exists, else false.
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
 * @returns {boolean} - Returns true if the character exists, else false.
 */

function doesCharacterExistInWorld() {
    if (world.character) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if enemies exist in the world.
 * 
 * @returns {boolean} - Returns true if enemies exist in the world, else false.
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
 * Resets the game state to allow the player to start a new game. Invokes the init()-method which starts a new game session.
 */

function playAgain() {
    wasGameWon = null;
    settingUpStyleWhenPlayAgainButtonPressed();
    hasGameStarted = false;
    isGamePlaying = true;
    init();
}

/**
 * Determines if fullscreen mode should be activated when playing button was pressed.
 *
 * @returns {boolean} - Returns `true` if all conditions are met and fullscreen should be activated, otherwise `false`.
 */
function checkIfFullscreenShouldBeActivatedWhenPlayAgain() {
    // return !isDesktopDevice() && !isFullscreenActivated && window.innerWidth < 1400;
    return !isFullscreenActivated && window.innerWidth < 1300;
}