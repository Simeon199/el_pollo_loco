function hideContainerIfVisible(container){
    let containerToHide = document.getElementById(`${container}`);
    if(!containerToHide.classList.contains('d-none')){
        containerToHide.classList.add('d-none');
    } 
}

function showContainerIfHidden(container){
    let containerToShow = document.getElementById(`${container}`);
    if(containerToShow.classList.contains('d-none')){
        containerToShow.classList.remove('d-none');
    }
}

function hideExitGameDivIfVisible(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.display = 'none';
}

function showExitGameDivIfHidden(){
    let exitGameContainer = document.getElementById('exit-game-container');
    exitGameContainer.style.display = 'flex';
}

function setContainerToFullscreenSize(divName){
    let container = document.getElementById(`${divName}`);
    container.style.width = '100dvw';
    container.style.height = '100dvh';
    container.style.overflow = 'hidden';
}

function handleLinksImagesTouchStyle(){
    showContainerIfHidden('links-images-touch');
    addFlexboxClassesToLinksImagesTouch();
}

function addFlexboxClassesToLinksImagesTouch(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.add('d-flex');
    linksImagesTouch.classList.add('d-gap');
}

function changeBackgroundOfPlayAgainButtonPressed(playAgainId, color){
    let playAgainRef = document.getElementById(`${playAgainId}`);
    playAgainRef.style.background = `${color}`;
}

function showCanvasWhenGameStarts(){
    document.getElementById('canvas-container').classList.remove('d-none');
}

function showLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.remove('d-none');
    linksImagesTouch.classList.add('d-flex');
    linksImagesTouch.classList.add('d-gap');
}

function hideLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.remove('d-gap');
    linksImagesTouch.classList.remove('d-flex');
    linksImagesTouch.classList.add('d-none');
}

function isLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-flex') && linksImagesTouch.classList.contains('d-gap') && !linksImagesTouch.classList.contains('d-none');
}

function isLinksImagesTouchHidden(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-none') && !linksImagesTouch.classList.contains('d-flex') && !linksImagesTouch.classList.contains('d-gap');
}

function setDivBackgroundColor(divId, color){
    let div = document.getElementById(`${divId}`);
    div.style.background = `${color}`;
}

function reloadOnDeviceTypeSwitch(){
    window.location.reload();
}

function redirectToWebPage(url){
    window.location.href = `${url}`;
}

function settingGlobalVariablesInKeyDownOrTouchStartEvent(event) {
    if(isPlayIconNotPressedAndWorldExistent(event)){
        world.character.isSoundIconInteraction = isEventOfTypeTouchAndSoundIconTriggered(event);
        if (!world.character.isSoundIconInteraction) {
            setKeyPressedVariablesRight(event);
            someKeyWasPressedAgain = new Date().getTime();
            world.character.wasRandomKeyOncePressed = wasRandomKeyOncePressed;
            world.character.someKeyWasPressedAgain = someKeyWasPressedAgain;
            world.character.isKeyPressed = isKeyPressed;
        }
    }
}

function settingGlobalVariablesInKeyUpOrTouchEndEvent(event) {
    if(isPlayIconNotPressedAndWorldExistent(event)){
        isKeyPressed = false;
        lastTimeKeyPressed = new Date().getTime();
        world.character.lastTimeKeyPressed = lastTimeKeyPressed;
        // world.character.someKeyWasPressedAgain = 0;
        world.character.isKeyPressed = isKeyPressed;
    }
}

function isPlayIconNotPressedAndWorldExistent(event){
    return !event.target.closest('#playIcon') && typeof world !== 'undefined';
}