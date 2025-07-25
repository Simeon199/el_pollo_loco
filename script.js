/**
 * Initializes the application after DOM content is loaded.
 */

document.addEventListener('DOMContentLoaded', () => {
    checkDeviceForMobileOrDesktopType();
    handleAllClickEvents();
    handleAllTouchEventsIfUserOnIndexPage();
    handleKeyEventsIfUserOnIndexPage();
    handleAllChangeEvents();
    handleOrientationChange();    
});

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
        handleAccordingEvents(clickEventsHandleOnIndexPage, 'click'); 
    } else if(isLocationWebPage('/privacy_policy/privacy_policy.html')){
        handleAccordingEvents(clickEventsHandleOnPrivacyPage, 'click');
    } else if(isLocationWebPage('/imprint/imprint.html')){
        handleAccordingEvents(clickEventsHandleOnImprintPage, 'click');
    }
}

/**
 * Sets up touch event handlers if the user is on the index page.
 */

function handleAllTouchEventsIfUserOnIndexPage(){
    if(isLocationWebPage('/index.html')){
        handleAccordingEvents(touchStartEvents, 'touchstart');
        handleAccordingEvents(touchEndEvents, 'touchend');
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
 * Starts the game and applies the style for touch devices.
 */

function startGameAndSetStyleForTouchDevice(){
    startGame();
    settingStyleForTouchDevice();
}

/**
 * Starts the game and applies the style for desktop devices.
 */

function startGameAndSetStyleForDesktopDevice(){
    startGame();
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

// === METHODS FOR BUNDLED FILES ===

function loadBundledJS(jsPath){
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.scr = jsPath;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function loadBundledCSS(cssPath){
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
}