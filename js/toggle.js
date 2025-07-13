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
    if(window.innerWidth < 1024){
        let introImageDiv = document.getElementById('intro-image-desktop');
        if(introImageDiv.classList.contains('intro-image-desktop')){
            introImageDiv.classList.remove('intro-image-desktop');
            introImageDiv.classList.add('intro-image-desktop-fullscreen-size');
        }
    } else if(window.innerWidth > 1024){
        let introImageDiv = document.getElementById('intro-image-desktop');
        if(introImageDiv.classList.contains('intro-image-desktop-fullscreen-size')){
            introImageDiv.classList.remove('intro-image-desktop-fullscreen-size');
            introImageDiv.classList.add('intro-image-desktop');
        }
    }
}

function handleLinksImagesTouchStyle(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    linksImagesTouch.classList.remove('d-none');
    linksImagesTouch.classList.add('d-flex');
    linksImagesTouch.classList.add('d-gap');
}