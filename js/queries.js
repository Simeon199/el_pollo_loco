function wasSpacebarDivTouched(target){
    return target.closest('#jumpButton') || target.closest('#buttonUp') || target.closest('spacebar');
}

function isOneOfDesktopButtonContainersClicked(event){
    return event.target.closest('#button-container') || event.target.closest('#icon-button-top');
}

function isContainerTouchedOrClicked(target, containerRef){
    return target.closest(`${containerRef}`);
}

function areTouchControlButtonsTouched(target){
    return target.classList.contains('touched');
}

function isLocationWebPage(url){
    return window.location.pathname.endsWith(`${url}`);
}

function wasSoundIconPressed(target){
    return target.closest('sound-off-icon') || target.closest('sound-on-icon');
}

function isEitherPlayAgainAfterWinningOrLosingPressed(target){
    return isContainerTouchedOrClicked(target, '#play-again-after-winning') || isContainerTouchedOrClicked(target, '#play-again-after-losing');
}

function isTouch(){
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}