let isExplainContainerOpen = false;

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.endsWith('/index.html')){      
        handleSettingIconListener();
        handleAllIConsMiniVersionListener()
        handlePlayIconListener();
        handleExplainGameSmallVersionIconListener();
        handleImprintAndPrivacyIconListener();
        handleIconSourceListener();
        handlePrivacyListener();
        handleImprintListener();
        handleWinningButtonImageListener();
        handleLosingButtonImageListener();
        handleImprintAndPrivacyOverlayListener();
        handleAllIconsButtonListener();
        handleAllIconsContainerOverlayListener();
        handleExplainGameContainerListener();
    }   
});

/**
 *  Event listener for the resize event. In the case of a resize event the checkOrientation is invoked.
 */

window.addEventListener("resize", checkOrientation);

/**
 *  Event listener for screen orientation. In the case of a orientationchange the checkOrientation is invoked.
 */

window.addEventListener("orientationchange", checkOrientation);

/**
 * Prevents the context menu from appearing on touch devices when a user performs a long press.
 */

if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }, { passive: false, capture: true });
}

function handleSettingIconListener(){
    let settingsIcon = document.getElementById('cartwheel-image-container');
    if(settingsIcon){
        settingsIcon.addEventListener('click', async () => {
            await loadTemplate('../templates/explain-game.html', 'explain-game-container');
            openOverlay('explain-game-container');
        });
    }
}

function handleAllIConsMiniVersionListener(){
    let allIconsMiniVersion = document.getElementById('all-icons-container-mini-version');
    if(allIconsMiniVersion){
        allIconsMiniVersion.addEventListener('click', (event) => {
            preventBubbling(event);
        });
        allIconsMiniVersion.querySelector('img').addEventListener('click', () => {
            closeOverlay('all-icons-container-overlay');
        });
    }
}

function handlePlayIconListener(){
    let playIcon = document.getElementById('playIcon');
    if(playIcon){
        playIcon.addEventListener('click', async () => {
            await loadTemplate('../templates/canvas-container.html', 'canvas-container');
            startGame();
            manageSoundIconEventListeners();
        });
    }
}

function handleExplainGameSmallVersionIconListener(){
    let explainGameSmallVersionIcon = document.getElementById('explain-game-container-small-version');
    if(explainGameSmallVersionIcon){
        explainGameSmallVersionIcon.addEventListener('click', async () => {
            await loadTemplate('../templates/explain-game.html', 'explain-game-container');
            openOverlay('explain-game-container');
        });
    }
}

function handleImprintAndPrivacyIconListener(){
    let imprintAndPrivacyIcon = document.getElementById('overlay-icon-for-imprint-privacy');
    if(imprintAndPrivacyIcon){
        imprintAndPrivacyIcon.addEventListener('click', async () => {
            await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
            openOverlay('imprint-and-privacy-policy-overlay');
        });
    }
}

function handleIconSourceListener(){
    let iconSource = document.getElementById('iconSource');
    if(iconSource){
        iconSource.addEventListener('click', async () => {
            await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
            openOverlay('all-icons-container-overlay');
        });
    }
}

function handlePrivacyListener(){
    let privacy = document.getElementById('privacy');
    privacy.addEventListener('click', () => {
        redirectToPrivacyPolicyPage();
    });
}

function handleImprintListener(){
    let imprint = document.getElementById('imprint');
    imprint.addEventListener('click', () => {
        redirectToLegalNoticePage();
    });
}

function handleWinningButtonImageListener(){
    let winningImageButton = document.getElementById('winning-image').querySelector('button');
    winningImageButton.addEventListener('click', () => {
        playAgain();
    });
}

function handleLosingButtonImageListener(){
    let losingImageButton = document.getElementById('losing-image').querySelector('button');
    losingImageButton.addEventListener('click', () => {
        playAgain();
    });
}

function handleImprintAndPrivacyOverlayListener(){
    let imprintAndPrivacyOverlay = document.getElementById('imprint-and-privacy-policy-overlay').querySelector('img');
    imprintAndPrivacyOverlay.addEventListener('click', () => {
        closeOverlay('imprint-and-privacy-policy-overlay');
    });
}

function handleAllIconsButtonListener(){
    let allIconsButton = document.querySelectorAll('.all-icons-button-container')[0];
    allIconsButton.addEventListener('click', async () => {
        await loadTemplate('../templates/icons-container.html', 'all-icons-container-overlay');
        openOverlay('all-icons-container-overlay');
    });
}

function handleAllIconsContainerOverlayListener(){
    let allIconsContainerOverlay = document.getElementById('all-icons-container-overlay');
    allIconsContainerOverlay.addEventListener('click', () => {
        closeOverlay('all-icons-container-overlay');
    });
}

function handleExplainGameContainerListener(){
    let explainGameContainer = document.getElementById('explain-game-container');
    explainGameContainer.addEventListener('click', () => {
        closeOverlay('explain-game-container');
    });
}

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