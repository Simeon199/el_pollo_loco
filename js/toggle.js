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

function showCanvasWhenGameStarts(){
    document.getElementById('canvas-container').classList.remove('d-none');
}

function showUiTouchStyle(){ 
    let uiTouch = document.getElementById('ui-touch');
    uiTouch.classList.remove('d-none');
}

function showUiDesktopStyle(){
    let uiDesktop = document.getElementById('ui-desktop');
    uiDesktop.classList.remove('d-none');
    uiDesktop.classList.add('d-flex');
    uiDesktop.classList.add('d-column');
}

function handleLinksImagesTouchStyle(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.remove('d-none');
    linksImagesTouch.classList.add('d-flex');
    linksImagesTouch.classList.add('d-gap');
}