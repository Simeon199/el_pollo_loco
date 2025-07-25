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
 * Checks if the current location matches the given URL ending.
 * @param {string} url - The URL ending to check.
 * @returns {boolean} True if the pathname ends with the URL.
 */

function isLocationWebPage(url){
    return window.location.pathname.endsWith(`${url}`);
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