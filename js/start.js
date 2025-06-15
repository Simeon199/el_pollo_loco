let isExplainContainerOpen = false;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.h2-title-section')[0].addEventListener('click', () => {
        redirectToPrivacyPolicyPage();
    });
    document.querySelectorAll('.h2-title-section')[1].addEventListener('click', () => {
        redirectToLegalNoticePage();
    });
    document.getElementById('cartwheel-image-container').addEventListener('click', () => {
        openOverlay('explain-game-container');
    });
    document.querySelectorAll('.all-icons-button-container')[0].addEventListener('click', () => {
        openOverlay('all-icons-container-overlay');
    });
    document.getElementById('imprint-and-privacy-policy-overlay').querySelector('img').addEventListener('click', () => {
        closeOverlay('imprint-and-privacy-policy-overlay');
    });
    document.getElementById('all-icons-container-overlay').addEventListener('click', () => {
        closeOverlay('all-icons-container-overlay');
    });
    document.getElementById('all-icons-container-mini-version').addEventListener('click', (event) => {
        preventBubbling(event);
    });
    document.getElementById('all-icons-container-mini-version').querySelector('img').addEventListener('click', () => {
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
    document.getElementById('icon-and-settings-container').querySelectorAll('.all-icons-button-container-small-version')[0].addEventListener('click', () => {
        openOverlay('all-icons-container-overlay');
    });
    document.getElementById('icon-and-settings-container').querySelectorAll('.all-icons-button-container-small-version')[1].addEventListener('click', () => {
        openOverlay('imprint-and-privacy-policy-overlay');
    });
    document.getElementById('cartwheel-image-container-small-version').addEventListener('click', () => {
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

/**
 * Prevents event bubbling (propagation) for the given event.
 * 
 * @param {Event} event - The event object.
 */

function preventBubbling(event) {
    event.stopPropagation();
}