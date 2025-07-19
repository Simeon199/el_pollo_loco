async function loadComponent(component, divId){
    let divRef = document.getElementById(`${divId}`);
    if(divRef){
        let response = await fetch(component.html);
        let html = await response.text();
        divRef.innerHTML = html;
        component.setUp(divRef);
    } else {
        console.log('Div ref is not accessible: ', divId, divRef);
    }
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
    // let divId = 'ui-desktop';
    let divId = 'losing-overlay';
    await loadComponent(losingOverlay, divId);
}

async function showLosingImageForTouchDevice(){
    // let divId = 'ui-desktop';
    let divId = 'losing-overlay';
    await loadComponent(losingOverlay, divId);
}

async function showWinningImageForDesktopDevice(){
    // let divId = 'ui-desktop';
    let divId = 'winning-overlay';
    await loadComponent(winningOverlay, divId);
}

async function showWinningImageForTouchDevice(){
    // let divId = 'ui-desktop';
    let divId = 'winning-overlay'
    await loadComponent(winningOverlay, divId);
}

async function showPrivacyAndImprintOverlay(){
    let divId = 'privacy-imprint-overlay';
    await loadComponent(privacyImprintOverlay, divId)
}