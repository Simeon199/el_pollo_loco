/**
 * Checks if the spacebar div or related jump buttons were touched.
 * @param {EventTarget} target - The event target.
 * @returns {Element|null} The matched element or null.
 */

function wasSpacebarDivTouched(target){
    return target.closest('#jumpButton') || target.closest('#buttonUp') || target.closest('spacebar');
}

/**
 * Checks if one of the desktop button containers was clicked.
 * @param {EventTarget} target - The event target.
 * @returns {Element|null} The matched element or null.
 */

function isOneOfDesktopButtonContainersClicked(target){
    return target.closest('#button-container') || target.closest('#icon-button-top');
}

/**
 * Checks if a specific container was touched or clicked.
 * @param {EventTarget} target - The event target.
 * @param {string} containerRef - The CSS selector for the container.
 * @returns {Element|null} The matched element or null.
 */

function isContainerTouchedOrClicked(target, containerRef){
    return target.closest(`${containerRef}`);
}

/**
 * Checks if the target has the 'touched' class (for touch controls).
 * @param {Element} target - The event target.
 * @returns {boolean} True if touched, false otherwise.
 */

function areTouchControlButtonsTouched(target){
    return target.classList.contains('touched');
}

/**
 * Checks if the sound icon (on or off) was pressed.
 * @param {EventTarget} target - The event target.
 * @returns {Element|null} The matched element or null.
 */

function wasSoundIconPressed(target){
    return target.closest('sound-off-icon') || target.closest('sound-on-icon');
}

/**
 * Checks if either the 'play again after winning' or 'play again after losing' button was pressed.
 * @param {EventTarget} target - The event target.
 * @returns {Element|null} The matched element or null.
 */

function isEitherPlayAgainAfterWinningOrLosingPressed(target){
    return isContainerTouchedOrClicked(target, '#play-again-after-winning') || isContainerTouchedOrClicked(target, '#play-again-after-losing');
}

/**
 * Determines if the current device supports touch events.
 * @returns {boolean} True if touch is supported, false otherwise.
 */

function isTouch(){
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Determines if the UI touch controls should be displayed based on device and screen ratio.
 * @returns {boolean} True if touch UI should be displayed.
 */

function shouldUiTouchBeDisplayed(){
    return isTouch() || (isHeightToWidthRatioBelowThreshold() && isMinHeightBelowThreshold());
}

/**
 * Checks if the 'all icons' button or a desktop button container was pressed.
 * @param {EventTarget} target - The event target.
 * @returns {Element|null} The matched element or null.
 */

function isAllIconsButtonPressed(target){
    return isContainerTouchedOrClicked(target, '#all-icons-button') || isOneOfDesktopButtonContainersClicked(target);
}

/**
 * Checks if the settings button (desktop or touch) was pressed.
 * @param {EventTarget} target - The event target.
 * @returns {Element|null} The matched element or null.
 */

function isSettingsButtonPressed(target){
    return isContainerTouchedOrClicked(target, '#settings-container') || isContainerTouchedOrClicked(target, '#settings-container-touch');
}

/**
 * Checks if the window's inner height is below the minimum threshold.
 * @returns {boolean} True if below threshold, false otherwise.
 */

function isMinHeightBelowThreshold(){
    let minHeightThreshold = 850;
    return window.innerHeight < minHeightThreshold;
}

/**
 * Checks if the height-to-width ratio is below a set threshold.
 * @returns {boolean} True if below threshold, false otherwise.
 */

function isHeightToWidthRatioBelowThreshold(){
    let ratio = 0.5;
    return window.innerHeight / window.innerWidth < ratio; 
}

/**
 * Checks if the event type is 'touchstart'.
 * @param {string} eventType - The event type string.
 * @returns {boolean} True if 'touchstart', false otherwise.
 */

function isEventTypeTouchStart(eventType){
    return eventType === 'touchstart';
}

/**
 * Checks if the event type is 'touchend'.
 * @param {string} eventType - The event type string.
 * @returns {boolean} True if 'touchend', false otherwise.
 */

function isEventTypeTouchEnd(eventType){
    return eventType === 'touchend';
}

/**
 * Checks if the event type is 'click'.
 * @param {string} eventType - The event type string.
 * @returns {boolean} True if 'click', false otherwise.
 */

function isEventTypeClick(eventType){
    return eventType === 'click';
}

/**
 * Checks if the device is a mobile type or of small size.
 * @returns {boolean}
 */

function isDeviceMobileTypeOrOfSmallSize(){
    return isTouch() || window.innerWidth < 1024; 
}

/**
 * Checks if the device supports touch events.
 * @returns {boolean}
 */

function isTouch(){
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Checks if the device is a big desktop and the game has started.
 * @returns {boolean}
 */

function isBigDesktopSizeAndHasGameStarted(){
    return window.innerWidth > 1024 && hasGameStarted
}

/**
 * Checks if the device is a small desktop and the game has started.
 * @returns {boolean}
 */

function isSmallDesktopSizeAndHasGameStarted(){
    return window.innerWidth < 1025 && hasGameStarted;
}

/**
 * Checks if 'links-images-touch' contains flexbox attributes.
 * @returns {boolean}
 */

function doesLinksImagesTouchContainsFlexboxAttributes(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-flex') && linksImagesTouch.classList.contains('d-gap'); 
}

/**
 * Checks if the world object is defined and exists.
 * @returns {boolean}
 */

function isWorldDefinedAndExistent(){
    return typeof world !== undefined && world;
}

/**
 * Checks if the device is a desktop (not touch).
 * @returns {boolean}
 */

function isDesktop(){
    return !isTouch();
}

/**
 * Checks if the 'links-images-touch' container is visible (has flex and gap classes, and not 'd-none').
 * @returns {boolean}
 */

function isLinksImagesTouchVisible(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-flex') 
    && linksImagesTouch.classList.contains('d-gap') 
    && !linksImagesTouch.classList.contains('d-none');
}

/**
 * Checks if the 'links-images-touch' container is hidden (has 'd-none' and not flex/gap classes).
 * @returns {boolean}
 */

function isLinksImagesTouchHidden(){
    let linksImagesTouch = document.getElementById('links-images-touch');
    return linksImagesTouch.classList.contains('d-none') 
    && !linksImagesTouch.classList.contains('d-flex') 
    && !linksImagesTouch.classList.contains('d-gap');
}

/**
 * Checks if the play icon is not pressed and the world object exists.
 * @param {Event} event - The event object.
 * @returns {boolean}
 */

function isPlayIconNotPressedAndWorldExistent(event){
    return !event.target.closest('#playIcon') && typeof world !== 'undefined';
}

/**
 * Checks if the sound icon was not pressed.
 * @returns {boolean}
 */

function soundIconWasNotPressed(){
    return !world.character.isSoundIconInteraction;
}


/**
 * Checks if the computed style's display property is set to 'none'.
 * @param {CSSStyleDeclaration} computedStyle - The computed style object of an element.
 * @returns {boolean} True if display is 'none', false otherwise.
 */
function computedStyleIsOfDisplayNone(computedStyle){
    return computedStyle.display === 'none';
}


/**
 * Checks if the computed style's display property is set to 'flex' or 'block'.
 * @param {CSSStyleDeclaration} computedStyle - The computed style object of an element.
 * @returns {boolean} True if display is 'flex' or 'block', false otherwise.
 */
function computedStyleIsEitherDisplayFlexOrBlock(computedStyle){
    return computedStyle.display === 'flex' || computedStyle.display === 'block';
}