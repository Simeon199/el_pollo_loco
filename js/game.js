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

function startGame() {
    isGamePlaying = true;
    init();
}

function init() {
    deleteWorldInstance();
    setRemainingObjectsAndVariablesWhenInitGame();
    muteUnmuteSound(soundIsMuted);
    controlTurnOnTurnOffIcon();
    initializeTimePointWhenGameStarted();
}

function deleteWorldInstance() {
    if (world) {
        clearAllIntervals();
        world = null;
    }
}

function setRemainingObjectsAndVariablesWhenInitGame() {
    setWorldAndContextObjects();
    checkIfEnemyOrCharacterIsDead();
    setHasGameStartedValue();
    setStylingOfInitializedGame();
}

function setWorldAndContextObjects(){
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
}

function checkIfEnemyOrCharacterIsDead() {
    if (!isGamePlaying) {
        return;
    }
    manageStopGameInterval();
}

function setHasGameStartedValue(){
    hasGameStarted = true;
}

function initializeTimePointWhenGameStarted(){
    timePointWhenGameInitialized = new Date().getTime();
}

function manageStopGameInterval() {
    clearStopGameIntervalIfItAlreadyExists();
    setStopGameIntervalAndClearIt();
}

function clearStopGameIntervalIfItAlreadyExists(){
    if (stopGameInterval) {
        clearInterval(stopGameInterval);
    }
}

function setStopGameIntervalAndClearIt(){
    stopGameInterval = setInterval(() => {
        if (wasCharacterDefeatedByEnemies()) {
            handleGameLostLogic();
        } else if (hasEnemiesBeenDefeatedByCharacter()) {
            handleGameWonLogic();
        }
    }, 5000);
}

function wasCharacterDefeatedByEnemies(){
    return world.character.energy === 0;
}

function hasEnemiesBeenDefeatedByCharacter(){
    return world.enemiesNumber <= 0;
}

function handleGameLostLogic(){
    wasGameWon = false;
    stopGame();
    clearInterval(stopGameInterval);
}

function handleGameWonLogic(){
    wasGameWon = true;
    stopGame();
    clearInterval(stopGameInterval);
}

function stopGame() {
    breakUpFunctionIfisGamePayingAlreadyFalse();
    manageStyleAndVariablesWhenStoppingGame();
}

function breakUpFunctionIfisGamePayingAlreadyFalse(){
    if (!isGamePlaying) {
        return;
    }
}

function manageStyleAndVariablesWhenStoppingGame(){
    manageStyleWhenGameIsStopped();
    manageStyleDependingOnWinndingOrLosing();
    isGamePlaying = false;
}

function manageStyleWhenGameIsStopped() {
    clearAllIntervals();
    stopAllSounds();
    setIsGamePlayingToFalse();
    hideContainerIfVisible('canvas-container');
    removePaddingFromUiDesktop();
}

function setIsGamePlayingToFalse(){
    isGamePlaying = false;
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

function manageStyleDependingOnWinndingOrLosing() {
    prepareDisplayWinningLosingStyle();
    if (isGamerLosing()) {
        changeStyleWhenLosing();
    } else if (isGamerWinning()) {
        changeStyleWhenWinning();
    } else {
        resetGame();
    }
}

function isGamerLosing(){
    return wasGameWon === false;
}

function isGamerWinning(){
    return wasGameWon === true;
}


function resetGame() {
    window.location.reload();
}