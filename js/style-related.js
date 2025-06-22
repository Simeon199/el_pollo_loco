

/**
 * Checks if the canvas does not contain the 'fullscreen-mode' and 'normal-mode' classes.
 * 
 * @returns {boolean} - Returns true if the canvas has neither 'fullscreen-mode' nor 'normal-mode'.
 */

// function canvasNotContainFullscreenModeAndNormalModeClass() {
//     let fullscreenMode = document.getElementById('canvas').classList.contains('fullscreen-mode');
//     let normalMode = document.getElementById('canvas').classList.contains('normal-mode');
//     return !fullscreenMode && !normalMode;
// }

/**
 * Adds the 'fullscreen-mode' class to the canvas element.
 */

// function removeStyleCanvasClassAndAddFullscreenModeClass() {
//     document.getElementById('canvas').classList.add('fullscreen-mode');
// }

/**
 * Checks if the canvas contains the 'normal-mode' class but not the 'fullscreen-mode' class.
 * 
 * @returns {boolean} - Returns true if the canvas contains 'normal-mode' but not 'fullscreen-mode'.
 */

// function canvasContainsNormalModeClassButNotFullscreenModeClass() {
//     let fullscreenMode = document.getElementById('canvas').classList.contains('fullscreen-mode');
//     let normalMode = document.getElementById('canvas').classList.contains('normal-mode');
//     return !fullscreenMode && normalMode;
// }

/**
 * Removes all other classes from the canvas and adds the 'fullscreen-mode' class.
 */

// function addFullscreenModeClassAndRemoveAllTheOtherClassesFromCanvas() {
//     document.getElementById('canvas').classList.remove('style-canvas');
//     document.getElementById('canvas').classList.remove('normal-mode');
//     document.getElementById('canvas').classList.add('fullscreen-mode');
// }

/**
 * Manages the addition and removal of classes and styles when entering fullscreen mode.
 */

// function manageAddRemoveClassesWhenEnterFullscreen() {
//     handleEnterFullscreenStylingClasses();
//     controlMuteCondition();
// }

/**
 * Applies styling classes to elements when entering fullscreen mode. Adds a class to the canvas for fullscreen mode and hides the fullscreen button.
 */

// function handleEnterFullscreenStylingClasses() {
//     document.getElementById('canvas').classList.add('fullscreen-mode');
// }

/**
 * Manages the addition and removal of classes and styles when entering fullscreen mode.
 */

// function manageAddRemoveClassesWhenExitFullscreen() {
//     document.getElementById('canvas').classList.remove('fullscreen-mode');
//     toggleSoundIconBasedOnSoundIsMuted();
// }

/**
 * Manages the addition and removal of classes and styles when exiting fullscreen mode.
 */

// function addNormalClassAndStyleCanvasModeAndRemoveFullscreenMode() {
//     document.getElementById('canvas').classList.remove('fullscreen-mode');
//     document.getElementById('canvas').classList.add('normal-mode');
//     document.getElementById('canvas').classList.add('canvas-style');
// }

/**
 * Activates fullscreen mode for the given element, managing necessary changes for entering fullscreen.
 * 
 * @param {HTMLElement} element - The element to be displayed in fullscreen mode.
 */

// function enterFullscreen(element) {
//     if (!isFullscreenActivated) {
//         isFullscreenActivated = true;
//         isChangingToFullscreen = true;
//         manageAddRemoveClassesWhenEnterFullscreen();
//     }
//     requesFullscreenFunction(element);
// }

/**
 * Requests fullscreen mode for a specified element, accounting for browser compatibility.
 */

// function requesFullscreenFunction(element) {
//     if (element.requestFullscreen) {
//         element.requestFullscreen();
//     } else if (element.msRequestFullscreen) {
//         element.msRequestFullscreen();
//     } else if (element.webkitRequestFullscreen) {
//         element.webkitRequestFullscreen();
//     }
// }

/**
 * Exits fullscreen mode and resets fullscreen-related flags.
 */

// function exitFullscreen() {
//     if (document.fullscreenElement) {
//         document.exitFullscreen();
//     }
//     isFullscreenActivated = false;
//     isChangingToFullscreen = false;
// }

/**
 * Toggles fullscreen mode for the canvas container. Enters or exits fullscreen depending on the current state.
 */

// function fullscreen() {
//     let fullscreen = document.getElementById('canvas-container');
//     if (!isFullscreenActivated) {
//         enterFullscreen(fullscreen);
//     } else {
//         exitFullscreen();
//     }
// }