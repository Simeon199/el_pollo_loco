/**
 * Initializes the application after DOM content is loaded.
 */

document.addEventListener('DOMContentLoaded', async () => {
    retrieveAllEventListenersAfterDOMLoaded();
});


/**
 * Initializes and attaches all event listeners required after the DOM has fully loaded.
 * This includes device type checks, click, touch, key, media query, and orientation change events.
 */

function retrieveAllEventListenersAfterDOMLoaded(){
    checkDeviceForMobileOrDesktopType();
    handleAllClickEvents();
    handleAllTouchEventsIfUserOnIndexPage();
    handleKeyEventsIfUserOnIndexPage();
    handleAllChangeEvents();
    handleOrientationChange();
}

/**
 * Checks if the current page is the privacy policy or imprint page.
 * @returns {boolean} True if on privacy or imprint page, false otherwise.
 */

function isLocationPrivacyOrImprint(){
    return isLocationWebPage('/privacy_policy/privacy_policy.html') || isLocationWebPage('/imprint/imprint.html');
}

/**
 * Dynamically loads a bundled JavaScript file by adding a script tag to the document.
 * @param {string} jsPath - The path to the JS bundle.
 * @returns {Promise<void>} Resolves when the script is loaded.
 */

function loadBundledJS(jsPath){
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = jsPath;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
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
 * Checks the device type and applies the appropriate UI style for mobile or desktop.
 */

function checkDeviceForMobileOrDesktopType(){
    if(isLocationWebPage('/index.html')){
        if(shouldUiTouchBeDisplayed()){
            showUiTouchStyle();
            handleLinksImagesTouchStyle();
        } else if(!isTouch()) {
            showUiDesktopStyle();
        }
    }
}

/**
 * Sets up click event handlers for the current page.
 */

function handleAllClickEvents(){
    if(isLocationWebPage('/index.html')){
        handleAccordingEvents(clickEventsHandleOnIndexPageCommon, 'click');
    } else if(isLocationWebPage('/privacy_policy/privacy_policy.html')){
        handleAccordingEvents(clickEventsHandleOnPrivacyPageCommon, 'click');
    } else if(isLocationWebPage('/imprint/imprint.html')){
        handleAccordingEvents(clickEventsHandleOnImprintPageCommon, 'click');
    }
}

/**
 * Sets up touch event handlers if the user is on the index page.
 */

function handleAllTouchEventsIfUserOnIndexPage(){
    if(isLocationWebPage('/index.html')){
        handleAccordingEvents(touchStartEventsCommon, 'touchstart');
        handleAccordingEvents(touchEndEventsCommon, 'touchend');
    }
}

/**
 * Sets up key event handlers if the user is on the index page.
 */

function handleKeyEventsIfUserOnIndexPage(){
    if(isLocationWebPage('/index.html')){
        handleKeyUpEvents();
        handleKeyDownEvents();
    }
}

/**
 * Sets up listeners for media query and device change events.
 */

function handleAllChangeEvents(){
    mqTouch.addEventListener('change', reloadDeviceAfterTimeOut);
    mqDesktop.addEventListener('change', reloadDeviceAfterTimeOut);

    mqMediumDesktop.addEventListener('change', (event) => {
        hideLinksImagesTouchIfEventMatches(event);
    });

    mqSmallDesktop.addEventListener('change', (event) => {
        showLinksImagesTouchIfEventMatches(event);
    });
}

/**
 * Sets up a listener to reload the page on orientation change.
 */

function handleOrientationChange(){
    screen.orientation.addEventListener('change', () => {
        window.location.reload();
    });
}

/**
 * Attaches event listeners and delegates events to the appropriate handler array.
 * @param {{condition: function(EventTarget): boolean, handler: function(Event, EventTarget): void|Promise<void>}[]} eventHandler - Array of handler objects.
 * @param {string} eventType - The event type to listen for (e.g., 'click', 'touchstart').
 */

async function handleAccordingEvents(eventHandler, eventType){
    document.addEventListener(`${eventType}`, (event) => {
        returnGlobalSettingsManagerDependingOnEventType(eventType, event);
        let target = event.target;
        for(let {condition, handler} of eventHandler){
            if(condition(target)){
                handler(event, target);
                break;
            }
        }
    }, {passive: false});
}

/**
 * Calls the appropriate global variable setter based on the event type.
 * @param {string} eventType - The event type.
 * @param {Event} event - The event object.
 */

function returnGlobalSettingsManagerDependingOnEventType(eventType, event){
    if(isEventTypeTouchStart(eventType)){
        settingGlobalVariablesInKeyDownOrTouchStartEvent(event);
    } else if(isEventTypeTouchEnd(eventType)){
        settingGlobalVariablesInKeyUpOrTouchEndEvent(event);
    } else if(isEventTypeClick(eventType)) {
        return ;
    }
}

/**
 * Sets the background color and loads the privacy and imprint overlay component.
 * @returns {Promise<void>}
 */

async function setDivBackgroundAndShowPrivacyAndImprint(){
    setDivBackgroundColor('privacy-and-imprint-pop-up', 'goldenrod');
    await loadComponent(privacyImprintOverlay, 'privacy-imprint-overlay'); 
}

/**
 * Sets the background color and loads the all icons sources overlay component.
 * @returns {Promise<void>}
 */

async function setDivBackgroundAndShowAllIconSources(){
    setDivBackgroundColor('all-icons-button', 'goldenrod');
    await loadComponent(showAllIconsPopUp, 'all-icons-container-overlay');
}

/**
 * Sets the background color and loads the settings popup component.
 * @returns {Promise<void>}
 */

async function setDivBackgroundAndShowSettingsPopUp(){
    setDivBackgroundColor('settings-container-touch', 'goldenrod');
    await loadComponent(explainGamePopUp, 'explain-game-container'); 
}

/**
 * Handles click events on links in the privacy policy page.
 * @param {EventTarget} target - The event target.
 */

function handleClickEventsOnLinksOnPrivacyPolicyPage(target){
    if(isContainerTouchedOrClicked(target, '#back-to-game-page')){
        redirectToWebPage('../index.html');
    } else if(isContainerTouchedOrClicked(target, '#imprint')){
        redirectToWebPage('../imprint/imprint.html');
    }
}

/**
 * Handles click events on links in the imprint page.
 * @param {EventTarget} target - The event target.
 */

function handleClickEventsOnLinksOnImprintPage(target){
    if(isContainerTouchedOrClicked(target, '#back-to-game-page')){
        redirectToWebPage('../index.html');
    } else if(isContainerTouchedOrClicked(target, '#privacy')){
        redirectToWebPage('../privacy_policy/privacy_policy.html');
    }
}

/**
 * Starts the game asynchronously and applies the style for touch devices.
 */

async function startGameAndSetStyleForTouchDevice(){
    await startGame();
    settingStyleForTouchDevice();
}

/**
 * Starts the game asynchronously and applies the style for desktop devices.
 */

async function startGameAndSetStyleForDesktopDevice(){
    await startGame();
    setStyleForDesktopDevice();
}

/**
 * Shows the links/images for touch if the event matches and they are currently hidden.
 * @param {MediaQueryListEvent} event - The media query event.
 */

function showLinksImagesTouchIfEventMatches(event){
    if(event.matches){
        if(isLinksImagesTouchHidden()){
            showLinksImagesTouchVisible();
        }
    }
}

/**
 * Hides the links/images for touch if the event matches and they are currently visible.
 * @param {MediaQueryListEvent} event - The media query event.
 */

function hideLinksImagesTouchIfEventMatches(event){
    if(event.matches){
        if(isLinksImagesTouchVisible()){
            hideLinksImagesTouchVisible();
        }
    }
}

/**
 * Reloads the device after a short timeout (used for device type switching).
 */

function reloadDeviceAfterTimeOut(){
    setTimeout(() => {
        reloadOnDeviceTypeSwitch();
    }, 100);
}

/**
 * Sets the overlay element to fill the full viewport height.
 */

function setOverlayToFullViewport(){
    let overlay = document.querySelector('.explain-game-container');
    if(overlay){
        overlay.style.height = window.innerHeight + 'px';
    }
}