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
 * Starts the game: shows the loading spinner, loads all bundles, then initializes all necessary variables and objects.
 * This function is now async to allow awaiting bundle loading before game logic starts.
 */

async function startGame() {
    isGamePlaying = true;
    init();
}

/**
 * Initializes the game by resetting the world, variables, and UI states.
 */

function init() {
    deleteWorldInstance();
    setRemainingObjectsAndVariablesWhenInitGame();
    muteUnmuteSound(soundIsMuted);
    controlTurnOnTurnOffIcon();
    initializeTimePointWhenGameStarted();
}

/**
 * Attaches all event listeners necessary for the playable game.
 * This includes click and touch event handlers for gameplay controls.
 */

function handleAllEventsNecessaryForPlayableGame(){
    handleAllClickEventsForPlayableGame();
    handleAllTouchEventsForPlayableGame();
}

/**
 * Sets up click event handlers for the playable game.
 * Attaches the appropriate click event handlers depending on the current page.
 */

function handleAllClickEventsForPlayableGame(){
    if(isLocationWebPage('/index.html')){
        handleAccordingEvents(clickEventsHandleOnIndexPageGame, 'click');  
    } else if(isLocationWebPage('/privacy_policy/privacy_policy.html')){
        handleAccordingEvents(clickEventsHandleOnPrivacyPageGame, 'click');
    } else if(isLocationWebPage('/imprint/imprint.html')){
        handleAccordingEvents(clickEventsHandleOnImprintPageGame, 'click');
    }
}

/**
 * Sets up touch event handlers for the playable game.
 * Attaches touchstart and touchend event handlers for gameplay controls.
 */

function handleAllTouchEventsForPlayableGame(){
    handleAccordingEvents(touchStartEventsGame, 'touchstart');
    handleAccordingEvents(touchEndEventsGame, 'touchend');
}

/**
 * Deletes the current world instance and clears all intervals.
 */

function deleteWorldInstance() {
    if (world) {
        clearAllIntervals();
        world = null;
    }
}

/**
 * Sets up world, context, and other variables when initializing the game.
 */

function setRemainingObjectsAndVariablesWhenInitGame() {
    setWorldAndContextObjects();
    checkIfEnemyOrCharacterIsDead();
    setHasGameStartedValue();
    setStylingOfInitializedGame();
}

/**
 * Initializes the canvas, world, and context objects.
 */

function setWorldAndContextObjects(){
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
}

/**
 * Checks if the enemy or character is dead and manages the stop game interval.
 */

function checkIfEnemyOrCharacterIsDead() {
    if (!isGamePlaying) {
        return;
    }
    manageStopGameInterval();
}

/**
 * Sets the hasGameStarted flag to true.
 */

function setHasGameStartedValue(){
    hasGameStarted = true;
}

/**
 * Initializes the time point when the game started.
 */

function initializeTimePointWhenGameStarted(){
    timePointWhenGameInitialized = new Date().getTime();
}

/**
 * Manages the interval that checks for game stop conditions.
 */

function manageStopGameInterval() {
    clearStopGameIntervalIfItAlreadyExists();
    setStopGameIntervalAndClearIt();
}

/**
 * Clears the stop game interval if it already exists.
 */

function clearStopGameIntervalIfItAlreadyExists(){
    if (stopGameInterval) {
        clearInterval(stopGameInterval);
    }
}

/**
 * Sets the interval to check for win/lose conditions and clears it when needed.
 */

function setStopGameIntervalAndClearIt(){
    stopGameInterval = setInterval(() => {
        if (wasCharacterDefeatedByEnemies()) {
            handleGameLostLogic();
        } else if (hasEnemiesBeenDefeatedByCharacter()) {
            handleGameWonLogic();
        }
    }, 5000);
}

/**
 * Checks if the character was defeated by enemies.
 * @returns {boolean}
 */

function wasCharacterDefeatedByEnemies(){
    return world.character.energy === 0;
}

/**
 * Checks if all enemies have been defeated by the character.
 * @returns {boolean}
 */

function hasEnemiesBeenDefeatedByCharacter(){
    return world.enemiesNumber <= 0;
}

/**
 * Handles the logic when the game is lost.
 */

function handleGameLostLogic(){
    wasGameWon = false;
    stopGame();
    clearInterval(stopGameInterval);
}

/**
 * Handles the logic when the game is won.
 */

function handleGameWonLogic(){
    wasGameWon = true;
    stopGame();
    clearInterval(stopGameInterval);
}

/**
 * Stops the game and manages style and variables accordingly.
 */

function stopGame() {
    breakUpFunctionIfisGamePayingAlreadyFalse();
    manageStyleAndVariablesWhenStoppingGame();
}

/**
 * Exits the function early if the game is already not playing.
 */

function breakUpFunctionIfisGamePayingAlreadyFalse(){
    if (!isGamePlaying) {
        return;
    }
}

/**
 * Manages style and variables when the game is stopped.
 */

function manageStyleAndVariablesWhenStoppingGame(){
    manageStyleWhenGameIsStopped();
    manageStyleDependingOnWinndingOrLosing();
    isGamePlaying = false;
}

/**
 * Handles UI and state changes when the game is stopped.
 */

function manageStyleWhenGameIsStopped() {
    clearAllIntervals();
    stopAllSounds();
    setIsGamePlayingToFalse();
    hideContainerIfVisible('canvas-container');
    removePaddingFromUiDesktop();
}

/**
 * Sets the isGamePlaying flag to false.
 */

function setIsGamePlayingToFalse(){
    isGamePlaying = false;
}

/**
 * Clears all intervals by iterating through a large range of possible interval IDs.
 */

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

/**
 * Manages the style depending on whether the player won or lost.
 */

function manageStyleDependingOnWinndingOrLosing() {
    prepareDisplayWinningLosingStyle();
    if (isGamerLosing()) {
        changeStyleWhenLosing();
    } else if (isGamerWinning()) {
        changeStyleWhenWinning();
    } 
}

/**
 * Checks if the player lost the game.
 * @returns {boolean}
 */

function isGamerLosing(){
    return wasGameWon === false;
}

/**
 * Checks if the player won the game.
 * @returns {boolean}
 */

function isGamerWinning(){
    return wasGameWon === true;
}

/**
 * Resets the game by reloading the page.
 */

function resetGame() {
    deleteWorldInstance();
    world = null;
    window.location.reload();
}