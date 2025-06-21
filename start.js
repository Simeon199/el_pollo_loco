let isExplainContainerOpen = false;

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