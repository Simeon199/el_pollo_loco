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

function removeLinksImagesTouchIfStillPresent(){
    if(doesLinksImagesTouchContainsFlexboxAttributes()){
        let linksImagesTouch = document.getElementById('links-images-touch');
        linksImagesTouch.classList.remove('d-gap');
        linksImagesTouch.classList.remove('d-flex');
        linksImagesTouch.classList.add('d-none');
    }
}

function doesLinksImagesTouchContainsFlexboxAttributes(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-flex') && linksImagesTouch.classList.contains('d-gap'); 
}

function hideIntroImageDependingOnUsedDevice(){
    if(isDeviceMobileTypeOrOfSmallSize()){
        hideContainerIfVisible('intro-image-touch');
    } else if(!isDeviceMobileTypeOrOfSmallSize()) {
        hideContainerIfVisible('intro-image-desktop');
    }
}

function isDeviceMobileTypeOrOfSmallSize(){
    return isTouch() || window.innerWidth < 1024; 
}

function isTouch(){
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function controlTurnOnTurnOffIcon() {
    if (soundIsMuted) {
        showTurningSoundOffIcon();
    } else {
        showTurningSoundOnIcon();
    }
}

function muteGameSounds() {
    soundOn = false;
    soundIsMuted = true;
}

function manageStopGameInterval() {
    clearStopGameIntervalIfItAlreadyExists();
    setStopGameIntervalAndClearIt();
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

function clearStopGameIntervalIfItAlreadyExists(){
    if (stopGameInterval) {
        clearInterval(stopGameInterval);
    }
}

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

function setStylingOfInitializedGame(){
    showCanvasWhenGameStarts();
    hideAllNeededStylingsWhenGameInitialized();
}

function hideAllNeededStylingsWhenGameInitialized(){
    hideContainerIfVisible('ui-touch');
    manageTouchDeviceVsDesktopDeviceStyle();
    removeLinksImagesTouchIfStillPresent();
}

function manageTouchDeviceVsDesktopDeviceStyle(){
    if(isDesktop()){ 
        handleDesktopDeviceVersion();
    } else if(isTouch()){
        handleTouchStyleVersion();
    }
}

function isDesktop(){
    return !isTouch();
}

function handleDesktopDeviceVersion(){
    hideContainerIfVisible('intro-image-desktop');
    if(isBigDesktopSizeAndHasGameStarted()){
        setCanvasContainerPropertiesForBigDesktop();
        setCanvasPropertiesForBigDesktop();
    } else if(isSmallDesktopSizeAndHasGameStarted()){
        setContainerToFullscreenSize('canvas-container');
        setContainerToFullscreenSize('canvas');
    }
}

function setCanvasContainerPropertiesForBigDesktop(){
    let canvasContainer = document.getElementById('canvas-container');
    canvasContainer.style.width = '720px';
    canvasContainer.style.height = '480px';
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.right = 'calc((100dvw - 720px)/2)';
    canvasContainer.style.bottom = 'calc((100dvh - 480px)/2)';
}

function setContainerToFullscreenSize(divName){
    let container = document.getElementById(`${divName}`);
    container.style.width = '100dvw';
    container.style.height = '100dvh';
    container.style.overflow = 'hidden';
}

function setCanvasPropertiesForBigDesktop(){
    let canvas = document.getElementById('canvas');
    canvas.style.width = '720px';
    canvas.style.height = '480px'; 
}

function isBigDesktopSizeAndHasGameStarted(){
    return window.innerWidth > 1024 && hasGameStarted
}

function isSmallDesktopSizeAndHasGameStarted(){
    return window.innerWidth < 1025 && hasGameStarted;
}

/* Additional proper styling for touch/desktop devices when game initialized - Starting Point */

function handleTouchStyleVersion(){
    hideContainerIfVisible('intro-image-touch');
    setContainerToFullscreenSize('canvas-container');
    setContainerToFullscreenSize('canvas');
}

function handleDesktopStyleDependingOnScreenSize(){
    if(window.innerWidth < 1025){
        handleLinksImagesTouchStyle();
    } else if(window.innerWidth > 1024){
        hideContainerIfVisible('intro-image-desktop');
    }
}

/* Additional proper styling for touch/desktop devices when game initialized - Ending Point */

function initializeTimePointWhenGameStarted(){
    timePointWhenGameInitialized = new Date().getTime();
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

function resetGame() {
    window.location.reload();
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

function doEnemiesExistInWorld() {
    if (doesWorldLevelsAndEnemiesObjectsExist()) {
        return true;
    } else {
        return false;
    }
}

function doesWorldLevelsAndEnemiesObjectsExist(){
    return world && world.level && world.level.enemies && world.level.enemies.length > 0; 
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

function setIsGamePlayingTrueIfFalse() {
    if (isGamePlaying == false) {
        isGamePlaying = true;
    }
}

function playAgain() {
    setWasGameWonWhenPlayAgainActivated();
    showContainerIfHidden('canvas-container');    
    setFlagsWhenPlayAgainIsActivated();
    init();
}

function setWasGameWonWhenPlayAgainActivated(){
    wasGameWon = null;
}

function setFlagsWhenPlayAgainIsActivated(){
    hasGameStarted = false;
    isGamePlaying = true;
}

function manageStyleWhenGameIsStopped() {
    clearAllIntervals();
    stopAllSounds();
    isGamePlaying = false;
    hideContainerIfVisible('canvas-container');
    // exitFullscreen();
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

function prepareDisplayWinningLosingStyle() {
    hideContainerIfVisible('canvas-container');
    hideIntroImageDependingOnUsedDevice();
}


function changeStyleWhenLosing() {
    hideIntroImageDependingOnUsedDevice();
    showLosingImageDependingOnUsedDevice();
}

function changeStyleWhenWinning() {
    hideIntroImageDependingOnUsedDevice();
    showWinningImageDependingOnUsedDevice();
}

async function showWinningImageDependingOnUsedDevice(){
    if(!isTouch()){ 
        await showWinningImageForDesktopDevice();
    } else if(isTouch()){
        await showWinningImageForTouchDevice();
    }
}

async function showLosingImageDependingOnUsedDevice(){
    if(!isTouch()){
        await showLosingImageForDesktopDevice();
    } else if(isTouch()){
        await showLosingImageForTouchDevice();
    }
}

function prepareDisplayWinningLosingStyle() {
    hideContainerIfVisible('canvas-container');
    hideIntroImageDependingOnUsedDevice();
}

function doesUiDesktopContainFlexboxClasses(){
    return uiDesktop.classList.contains('d-flex') && uiDesktop.classList.contains('d-column'); 
}