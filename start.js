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