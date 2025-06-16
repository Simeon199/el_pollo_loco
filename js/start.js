let isExplainContainerOpen = false;

document.addEventListener('DOMContentLoaded', () => {
    let allIconsMiniVersion = document.getElementById('all-icons-container-mini-version');
    let explainGameContainer = document.getElementById("explain-game-container");
    if(explainGameContainer){
        explainGameContainer.addEventListener('click', async () => {
            await loadTemplate('../templates/explain-game.html');
            openOverlay('explain-game-container');
        });
    }
    
    if(allIconsMiniVersion){
        allIconsMiniVersion.addEventListener('click', (event) => {
            preventBubbling(event);
        });
        allIconsMiniVersion.querySelector('img').addEventListener('click', () => {
            closeOverlay('all-icons-container-overlay');
        });
    }
    document.getElementById('privacy').addEventListener('click', () => {
        redirectToPrivacyPolicyPage();
    });
    document.getElementById('imprint').addEventListener('click', () => {
        redirectToLegalNoticePage();
    });
    document.getElementById('cartwheel-image-container').addEventListener('click', () => {
        openOverlay('explain-game-container');
    });
    document.querySelectorAll('.all-icons-button-container')[0].addEventListener('click', async () => {
        await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
        openOverlay('all-icons-container-overlay');
    });
    document.getElementById('imprint-and-privacy-policy-overlay').querySelector('img').addEventListener('click', () => {
        closeOverlay('imprint-and-privacy-policy-overlay');
    });
    document.getElementById('all-icons-container-overlay').addEventListener('click', () => {
        closeOverlay('all-icons-container-overlay');
    });
    document.getElementById('sound-off-icon').addEventListener('click', () => {
        turnSoundOnOrOff();
    });
    document.getElementById('sound-on-icon').addEventListener('click', () => {
        turnSoundOnOrOff();
    });
    document.getElementById('cartwheel-image-container-small-version').addEventListener('click', () => {
        openOverlay('explain-game-container');
    });
    document.getElementById('winning-image').querySelector('button').addEventListener('click', () => {
        playAgain();
    });
    document.getElementById('losing-image').querySelector('button').addEventListener('click', () => {
        playAgain();
    });
    document.getElementById('iconSource').addEventListener('click', () => {
        openOverlay('all-icons-container-overlay');
    });
    document.getElementById('overlay-icon-for-imprint-privacy').addEventListener('click', () => {
        openOverlay('imprint-and-privacy-policy-overlay');
    });
    document.getElementById('explain-game-container-small-version').addEventListener('click', () => {
        console.log('cartwheel-image-container-small-version is triggered');
        openOverlay('explain-game-container');
    });
    document.getElementById('explain-game-container').addEventListener('click', () => {
        closeOverlay('explain-game-container');
    });
    document.getElementById('game-functions-container').addEventListener('click', (event) => {
        preventBubbling(event);
    });
    document.getElementById('game-functions-container').querySelector('img').addEventListener('click', () => {
        closeOverlay('explain-game-container');
    });
    document.getElementById('icon-and-settings-container-in-intro-image').querySelectorAll('div')[0].addEventListener('click', () => {
        openOverlay('all-icons-container-overlay');
    });
    document.getElementById('icon-and-settings-container-in-intro-image').querySelectorAll('div')[1].addEventListener('click', () => {
        redirectToLegalNoticePage()    
    });
});

/**
 * Redirects the user to the play page.
 */

function redirectToPlayPage() {
    window.location.href = "../index.html";
}

/**
 * Redirects the user to the legal notice page.
 */

function redirectToLegalNoticePage() {
    window.location.href = "./legal_notice/legal_notice.html";
}

/**
 * Redirects the user to the privacy policy page.
 */

function redirectToPrivacyPolicyPage(){
    window.location.href = "./privacy_policy/privacy_policy.html";
}

/**
 * Prevents event bubbling (propagation) for the given event.
 * 
 * @param {Event} event - The event object.
 */

function preventBubbling(event) {
    event.stopPropagation();
}

// Die folgenden Funktionen sind noch nicht nach JSDoc-Standard kommentiert worden

function closeOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if (!overlay.classList.contains('d-none')) {
        overlay.classList.add('d-none');
    }
}

function openOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if(overlay.classList.contains('d-none')){
        overlay.classList.remove('d-none');
    }
}

async function loadTemplate(url, placeholderId){
    let response = await fetch(url);
    let html = await response.text();
    document.getElementById(placeholderId).innerHTML = html;
}