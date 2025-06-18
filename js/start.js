let isExplainContainerOpen = false;

document.addEventListener('DOMContentLoaded', () => {
    let allIconsMiniVersion = document.getElementById('all-icons-container-mini-version');
    let settingsIcon = document.getElementById('cartwheel-image-container');
    let iconSource = document.getElementById('iconSource');
    let allIconsButton = document.querySelectorAll('.all-icons-button-container')[0];
    let playIcon = document.getElementById('playIcon');
    let privacy = document.getElementById('privacy');
    let imprint = document.getElementById('imprint');
    let winningImageButton = document.getElementById('winning-image').querySelector('button');
    let losingImageButton = document.getElementById('losing-image').querySelector('button');
    let imprintAndPrivacyOverlay = document.getElementById('imprint-and-privacy-policy-overlay').querySelector('img');
    let allIconsContainerOverlay = document.getElementById('all-icons-container-overlay');
    let explainGameContainer = document.getElementById('explain-game-container');
    let explainGameSmallVersionIcon = document.getElementById('explain-game-container-small-version');
    let imprintAndPrivacyIcon = document.getElementById('overlay-icon-for-imprint-privacy');

    if(settingsIcon){
        settingsIcon.addEventListener('click', async () => {
            await loadTemplate('../templates/explain-game.html', 'explain-game-container');
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

    if(playIcon){
        playIcon.addEventListener('click', async () => {
            await loadTemplate('../templates/canvas-container.html', 'canvas-container');
            startGame();
            manageSoundIconEventListeners();
        });
    }

    if(explainGameSmallVersionIcon){
        explainGameSmallVersionIcon.addEventListener('click', async () => {
            await loadTemplate('../templates/explain-game.html', 'explain-game-container');
            openOverlay('explain-game-container');
        });
    }
    
    if(imprintAndPrivacyIcon){
        imprintAndPrivacyIcon.addEventListener('click', async () => {
            await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
            openOverlay('imprint-and-privacy-policy-overlay');
        });
    }

    if(iconSource){
        iconSource.addEventListener('click', async () => {
            await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
            openOverlay('all-icons-container-overlay');
        });
    }

    privacy.addEventListener('click', () => {
        redirectToPrivacyPolicyPage();
    });

    imprint.addEventListener('click', () => {
        redirectToLegalNoticePage();
    });

    winningImageButton.addEventListener('click', () => {
        playAgain();
    });

    losingImageButton.addEventListener('click', () => {
        playAgain();
    });

    imprintAndPrivacyOverlay.addEventListener('click', () => {
        closeOverlay('imprint-and-privacy-policy-overlay');
    });

    allIconsButton.addEventListener('click', async () => {
        await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
        openOverlay('all-icons-container-overlay');
    });
    
    allIconsContainerOverlay.addEventListener('click', () => {
        closeOverlay('all-icons-container-overlay');
    });

    explainGameContainer.addEventListener('click', () => {
        closeOverlay('explain-game-container');
    });
});

/**
 * Adds click event listeners to the sound icon elements.
 * 
 * When either the 'sound-off-icon' or 'sound-on-icon' is clicked,
 * the `turnSoundOnOrOff` function is triggered to toggle the sound state.
 */

function manageSoundIconEventListeners(){
    let soundOff = document.getElementById('sound-off-icon');
    let soundOn = document.getElementById('sound-on-icon');
    soundOff.addEventListener('click', () => {
        turnSoundOnOrOff();
    });
    soundOn.addEventListener('click', () => {
        turnSoundOnOrOff();
    });
}

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

/**
 * Closes the overlay element by adding the 'd-none' class to hide it.
 * 
 * @param {string} overlayId - The ID of the overlay element to close.
 */

function closeOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if (!overlay.classList.contains('d-none')) {
        overlay.classList.add('d-none');
    }
}

/**
 * Opens the overlay element by removing the 'd-none' class to make it visible.
 * 
 * @param {string} overlayId - The ID of the overlay element to open.
 */

function openOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if(overlay.classList.contains('d-none')){
        overlay.classList.remove('d-none');
    }
}

/**
 * Loads an HTML template from a URL and inserts it into a placeholder element.
 * 
 * @async
 * @param {string} url - The URL of the HTML template to fetch.
 * @param {string} placeholderId - The ID of the element where the HTML content will be injected.
 * @returns {Promise<void>} - A Promise that resolves when the content is loaded and inserted.
 */

async function loadTemplate(url, placeholderId){
    let response = await fetch(url);
    let html = await response.text();
    document.getElementById(placeholderId).innerHTML = html;
}