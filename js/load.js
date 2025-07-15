async function loadComponent(component, divId){
    let divRef = document.getElementById(`${divId}`);
    let response = await fetch(component.html);
    let html = await response.text();
    divRef.innerHTML = html;
    component.setUp(divRef);
}

async function showAllIconSourcesPopUp(){
    let divId = 'all-icons-container-overlay';
    await loadComponent(showAllIconsPopUp, divId);
}

async function showExplainGamePopUp(){
    let divId = 'explain-game-container';
    await loadComponent(explainGamePopUp, divId);
}

async function showLosingImageForDesktopDevice(){
    let divId = 'ui-desktop';
    await loadComponent(losingOverlay, divId);
}

async function showLosingImageForTouchDevice(){
    let divId = 'ui-desktop';
    await loadComponent(losingOverlay, divId);
}

async function showWinningImageForDesktopDevice(){
    let divId = 'ui-desktop';
    await loadComponent(winningOverlay, divId);
}

async function showWinningImageForTouchDevice(){
    let divId = 'ui-desktop';
    await loadComponent(winningOverlay, divId);
}

async function showPrivacyAndImprintOverlay(){
    let divId = 'privacy-imprint-overlay';
    await loadComponent(privacyImprintOverlay, divId)
}