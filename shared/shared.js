document.addEventListener('DOMContentLoaded', () => {
    if(isLocationPrivacyPolicy()){
        handlePrivacyEventListeners();
    } else if(isLocationImprintPage()){
        handleImprintEventListeners();
    }
});

// function handlePrivacyEventListeners(){
//     document.getElementById('link-to-imprint').addEventListener('click', () => {
//         toLegalNoticePage();
//     });
//     document.getElementById("back-to-game-page").addEventListener('click', () => {
//         redirectToPlayPage();
//     });
// }

// function handleImprintEventListeners(){
//     document.getElementById('link-to-privacy-policy').addEventListener('click', () => {
//         toPrivacyPolicyPage();
//     });
//     document.getElementById("back-to-game-page").addEventListener('click', () => {
//         redirectToPlayPage();
//     });
// }

function toPrivacyPolicyPage(){
    window.location.href = "../privacy_policy/privacy_policy.html";
}

function toLegalNoticePage(){
    window.location.href = "../imprint/imprint.html";
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

function hideCanvasContainer() { // Ehemaliger Funktionenname: changeStyleWhenIndependentOfWinningOrLosing()
    document.getElementById('canvas-container').style.display = 'none';
}

/**
 * Changes the style to display the losing screen.
 */

function changeStyleWhenLosing() {
    hideIntroImageIfVisible();
    handleRemainingStyleInCaseOfLosing();
}

function handleRemainingStyleInCaseOfLosing(){
    document.getElementById('losing-image').style.display = 'flex';
    document.getElementById('losing-image').classList.add('losing-image-properties');
    document.getElementById('main-title').style.display = 'none';
}

function hideIntroImageIfVisible(){
    if (isIntroImageVisible()) {
        document.getElementById('intro-image').style.display = 'none';
    }
}

function isIntroImageVisible(){
    return document.getElementById('intro-image').style.display !== 'none';
}

/**
 * Changes the style to display the winning screen.
 */

function changeStyleWhenWinning() {
    hideIntroImageIfVisible();
    handleRemainingStyleInCaseOfWinning();
}

function handleRemainingStyleInCaseOfWinning(){
    document.getElementById('winning-image').style.display = 'flex';
    document.getElementById('winning-image').classList.add('winning-image-properties');
    document.getElementById('main-title').style.display = 'none';
}

/**
 * Manages the style and layout when the game is stopped. Stops all game intervals, sounds, and exits fullscreen mode.
 */

function manageStyleWhenGameIsStopped() { // string
    clearAllIntervals();
    stopAllSounds();
    isGamePlaying = false;
    document.getElementById('canvas').style.display = 'none';
    hideCanvasContainer();
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
    setCanvasContainerVisibleIfHidden();
    setCanvasVisibleIfHidden();
    hideLosingImageIfVisible();
    hideWinningImageIfVisible();
    setMainTitleVisibleIfDesktopDevice();
}

function setCanvasContainerVisibleIfHidden(){
    if(isCanvasContainerHidden()){
        document.getElementById('canvas-container').style.display = 'flex';
    }
}

function isCanvasContainerHidden(){
    return document.getElementById('canvas-container').style.display === 'none';
}

function setCanvasVisibleIfHidden(){
    if(isCanvasHidden()){
        document.getElementById('canvas').style.display = 'block';
    }
}

function isCanvasHidden(){
    return document.getElementById('canvas').style.display === 'none';
}

function hideLosingImageIfVisible(){
    if(isLosingImageVisible()){
        document.getElementById('losing-image').style.display = 'none'
    }
}

function isLosingImageVisible(){
    return document.getElementById('losing-image').style.display !== 'none';
}

function hideWinningImageIfVisible(){
    if(isWinningImageVisible()){
        document.getElementById('winning-image').style.display = 'none';
    }
}

function isWinningImageVisible(){
    return document.getElementById('winning-image').style.display !== 'none';
}

function setMainTitleVisibleIfDesktopDevice(){
    if (!isTouch) {
        document.getElementById('main-title').style.display = 'block';
    }
}