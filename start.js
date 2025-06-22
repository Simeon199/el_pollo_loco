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
 * Prevents event bubbling (propagation) for the given event.
 * 
 * @param {Event} event - The event object.
 */

function preventBubbling(event) {
    event.stopPropagation();
}