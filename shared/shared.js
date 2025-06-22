document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.endsWith('/privacy_policy/privacy_policy.html')){
        document.getElementById('link-to-imprint').addEventListener('click', () => {
            toLegalNoticePage();
        });
        document.getElementById("back-to-game-page").addEventListener('click', () => {
            redirectToPlayPage();
        });
    } else if(window.location.pathname.endsWith('/legal_notice/legal_notice.html')){
        document.getElementById('link-to-privacy-policy').addEventListener('click', () => {
            toPrivacyPolicyPage();
        });
        document.getElementById("back-to-game-page").addEventListener('click', () => {
            redirectToPlayPage();
        });
    }
});

function toPrivacyPolicyPage(){
    window.location.href = "../privacy_policy/privacy_policy.html";
}

function toLegalNoticePage(){
    window.location.href = "../legal_notice/legal_notice.html";
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

/**
 * Adds the 'canvas-style' class to the canvas.
 */

function changeStyleWhenIndependentOfWinningOrLosing() {
    document.getElementById('canvas-container').style.display = 'none';
}

/**
 * Changes the style to display the losing screen.
 */

function changeStyleWhenLosing() {
    if (document.getElementById('intro-image').style.display !== 'none') {
        document.getElementById('intro-image').style.display = 'none';
    }
    document.getElementById('losing-image').style.display = 'flex';
    document.getElementById('losing-image').classList.add('losing-image-properties');
    document.getElementById('main-title').style.display = 'none';
}

/**
 * Changes the style to display the winning screen.
 */

function changeStyleWhenWinning() {
    if (document.getElementById('intro-image').style.display !== 'none') {
        document.getElementById('intro-image').style.display = 'none';
    }
    document.getElementById('winning-image').style.display = 'flex';
    document.getElementById('winning-image').classList.add('winning-image-properties');
    document.getElementById('main-title').style.display = 'none';
}

/**
 * Manages the style and layout when the game is stopped. Stops all game intervals, sounds, and exits fullscreen mode.
 */

function manageStyleWhenGameIsStopped(string) {
    clearAllIntervals();
    stopAllSounds();
    isGamePlaying = false;
    document.getElementById('canvas').style.display = 'none';
    changeStyleWhenIndependentOfWinningOrLosing(string);
    exitFullscreen();
}

/**
 * Manages the style depending on whether the player won or lost the game.
 * 
 * @param {string} string - The game outcome, either 'losing' or 'winning'.
 */

function manageStyleDependingOnWinndingOrLosing(string) {
    prepareDisplayWinningLosingStyle();
    if (string === 'losing') {
        changeStyleWhenLosing(string);
    } else if (string === 'winning') {
        changeStyleWhenWinning(string);
    } else {
        resetGame();
    }
}

/**
 * Prepares the overlay and hides the intro image if it is visible, setting up for a "winning" or "losing" display style. Ensures the overlay is shown to provide visual feedback.
 */

function prepareDisplayWinningLosingStyle() {
    document.getElementById('overlay').style.display = 'flex';
    if (document.getElementById('intro-image').style.display !== 'none') {
        document.getElementById('intro-image').style.display = 'none';
    }
}

/**
* Resets the necessary styling by hiding or showing certain containers when playAgain()-button is pressed.
*/

function settingUpStyleWhenPlayAgainButtonPressed() {
    if (document.getElementById('overlay').style.display !== 'none') {
        document.getElementById('overlay').style.display = 'none';
    }
    document.getElementById('canvas-container').style.display = 'flex';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('losing-image').style.display = 'none';
    document.getElementById('winning-image').style.display = 'none';
    if (isDesktopDevice()) {
        document.getElementById('main-title').style.display = 'block';
    }
}