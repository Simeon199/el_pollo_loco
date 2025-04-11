let isExplainContainerOpen = false;

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
 * Opens the container displaying all icons in a minimized version.
 */

function openAllIconsContainer() {
    let allIconsOverlay = document.getElementById('all-icons-container-overlay');
    if (allIconsOverlay.classList.contains('d-none')) {
        allIconsOverlay.classList.remove('d-none');
    }
}

/**
 * Opens the container displaying the imprint and privacy-policy-page.
 */

function openImprintAndPrivacyOverlay(){
    let imprintAndPrivacyOverlay = document.getElementById('imprint-and-privacy-policy-overlay');
    if(imprintAndPrivacyOverlay.classList.contains('d-none')){
        imprintAndPrivacyOverlay.classList.remove('d-none');
    }
}

/**
 * Closes the container displaying all icons in a minimized version.
 */

function closeAllIconsContainer() {
    let allIconsOverlay = document.getElementById('all-icons-container-overlay');
    if (!allIconsOverlay.classList.contains('d-none')) {
        allIconsOverlay.classList.add('d-none');
    }
}

/**
 * Opens the settings section, explaining the game if it is hidden.
 */

function openSettingsFunction() {
    let explainGameContainer = document.getElementById('explain-game-container');
    if (explainGameContainer.classList.contains('d-none')) {
        explainGameContainer.classList.remove('d-none');
    }
}

/**
 * Closes the settings section explaining the game if it is visible.
 */

function closeExplainGameContainer() {
    let explainGameContainer = document.getElementById('explain-game-container');
    if (!explainGameContainer.classList.contains('d-none')) {
        explainGameContainer.classList.add('d-none');
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