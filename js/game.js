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

let deviceTypeActivated = {
    'desktop': false,
    'touch': false
}

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
    stopGame('losing');
    clearInterval(stopGameInterval);
}

function handleGameWonLogic(){
    wasGameWon = true;
    stopGame('winning');
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

function showCanvasWhenGameStarts(){
    document.getElementById('canvas-container').classList.remove('d-none');
}

function hideAllNeededStylingsWhenGameInitialized(){
    hideContainerIfVisible('ui-touch');
    hideIntroImageDependingOnUsedDevice();
    removeLinksImagesTouchIfStillPresent();
}

function hideIntroImageDependingOnUsedDevice(){
    if(!isTouch()){ 
        hideContainerIfVisible('intro-image-desktop');
    } else if(isTouch()){
        hideContainerIfVisible('intro-image-touch');
    }
}

function initializeTimePointWhenGameStarted(){
    timePointWhenGameInitialized = new Date().getTime();
}

function stopGame(string) {
    breakUpFunctionIfisGamePayingAlreadyFalse();
    manageStyleAndVariablesWhenStoppingGame(string);
}

function breakUpFunctionIfisGamePayingAlreadyFalse(){
    if (!isGamePlaying) {
        return;
    }
}

function manageStyleAndVariablesWhenStoppingGame(string){
    manageStyleWhenGameIsStopped();
    manageStyleDependingOnWinndingOrLosing(string);
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
    settingUpStyleWhenPlayAgainButtonPressed();
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

function settingUpStyleWhenPlayAgainButtonPressed() {
    setCanvasContainerVisibleIfHidden();
    setCanvasVisibleIfHidden();
    hideLosingImageIfVisible();
    hideWinningImageIfVisible();
    setMainTitleVisibleIfDesktopDevice();
}

function setCanvasVisibleIfHidden(){
    if(isCanvasHidden()){
        document.getElementById('canvas').style.display = 'block';
    }
}

function isCanvasHidden(){
    return document.getElementById('canvas').style.display === 'none';
}

function setCanvasContainerVisibleIfHidden(){
    if(isCanvasContainerHidden()){
        document.getElementById('canvas-container').style.display = 'flex';
    }
}

function isCanvasContainerHidden(){
    return document.getElementById('canvas-container').style.display === 'none';
}

function hideLosingImageIfVisible(){
    if(isLosingImageVisible()){
        document.getElementById('losing-image').style.display = 'none'
    }
}

function isLosingImageVisible(){
    return document.getElementById('losing-image').style.display !== 'none';
}

function hideWinningImageIfVisible(){
    if(isWinningImageVisible()){
        document.getElementById('winning-image').style.display = 'none';
    }
}

function isWinningImageVisible(){
    return document.getElementById('winning-image').style.display !== 'none';
}

function manageStyleWhenGameIsStopped() {
    clearAllIntervals();
    stopAllSounds();
    isGamePlaying = false;
    hideContainerIfVisible('canvas-container');
    // exitFullscreen();
}

function manageStyleDependingOnWinndingOrLosing(string) {
    prepareDisplayWinningLosingStyle();
    if (isGamerLosing(string)) {
        changeStyleWhenLosing(string);
    } else if (isGamerWinning(string)) {
        changeStyleWhenWinning(string);
    } else {
        resetGame();
    }
}

function isGamerLosing(string){
    return string === 'losing'
}

function isGamerWinning(string){
    return string === 'winning';
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
        // showContainerIfHidden('winning-image-desktop');    
    } else if(isTouch()){
        await showWinningImageForTouchDevice();
        // showContainerIfHidden('winning-image-touch');
    }
}

async function showLosingImageDependingOnUsedDevice(){
    if(!isTouch()){
        await showLosingImageForDesktopDevice();
        // showContainerIfHidden('losing-image-desktop');
    } else if(isTouch()){
        await showLosingImageForTouchDevice();
        // showContainerIfHidden('losing-image-touch');    
    }
}

function prepareDisplayWinningLosingStyle() {
    hideContainerIfVisible('canvas-container');
    decideIfTouchOrDesktopVersionIsActive();
    hideIntroImageDependingOnUsedDevice();
}

// function showContainerIfHidden(container){
//     let containerToShow = document.getElementById(`${container}`);
//     if(containerToShow.classList.contains('d-none')){
//         containerToShow.classList.remove('d-none');
//     }
// }

function hideUiDesktopIfVisible(){
    if(doesUiDesktopContainFlexboxClasses()){
        hideUiDesktopStyle();
        hideContainerIfVisible('ui-desktop');
    }
}

function hideUiDesktopStyle(){
    let uiDesktop = document.getElementById('ui-desktop');
    uiDesktop.classList.remove('d-column');
    uiDesktop.classList.remove('d-flex');
}

function doesUiDesktopContainFlexboxClasses(){
    return uiDesktop.classList.contains('d-flex') && uiDesktop.classList.contains('d-column'); 
}

function hideContainerIfVisible(container){
    let containerToHide = document.getElementById(`${container}`);
    if(!containerToHide.classList.contains('d-none')){
        containerToHide.classList.add('d-none');
    } 
}

function decideIfTouchOrDesktopVersionIsActive(){
    if(isDeviceTypeDeactivated('ui-desktop')){ 
        deviceTypeActivated['desktop'] = true;
        deviceTypeActivated['touch'] = false; 
        setLinksImagesDependingOnDeviceType('links-images-desktop');
    } else if(isDeviceTypeDeactivated('ui-touch')){
        deviceTypeActivated['desktop'] = false;
        deviceTypeActivated['touch'] = true;
        setLinksImagesDependingOnDeviceType('links-images-touch');
    }
}

function setLinksImagesDependingOnDeviceType(deviceType){
    document.getElementById(`${deviceType}`).style.display = 'none';
}

function isDeviceTypeDeactivated(deviceType){
    let device = document.getElementById(`${deviceType}`);
    return device.style.display === 'none';
}