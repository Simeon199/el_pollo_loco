/**
 * Media query for touch devices.
 * @type {MediaQueryList}
 */

let mqTouch = window.matchMedia('(hover: none)');

/**
 * Media query for desktop devices.
 * @type {MediaQueryList}
 */

let mqDesktop = window.matchMedia('(hover: hover)');

/**
 * Media query for medium-sized desktops in landscape orientation.
 * @type {MediaQueryList}
 */

let mqMediumDesktop = window.matchMedia('(min-width: 1025px) and (orientation: landscape)');

/**
 * Media query for small desktops in landscape orientation.
 * @type {MediaQueryList}
 */

let mqSmallDesktop = window.matchMedia('(max-width: 1024px) and (orientation: landscape)');

/**
 * Tracks if privacy or imprint touch overlay is activated.
 * @type {boolean}
 */

let privacyOrImprintTouchActivated = false;

/**
 * Array of click event handlers for the index (main) page.
 * Each object contains a condition function and a handler function.
 * @type {{condition: function(EventTarget): boolean, handler: function(Event, EventTarget): void|Promise<void>}[]}
 */

let clickEventsHandleOnIndexPageCommon = [
    {
        condition: (target) => isSettingsButtonPressed(target),
        handler: async (event, target) => await loadComponent(explainGamePopUp, 'explain-game-container')  
    },
    {
        condition: (target) => isAllIconsButtonPressed(target),
        handler: async (event, target) => await loadComponent(showAllIconsPopUp, 'all-icons-container-overlay')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#imprint'),
        handler: (event, target) => redirectToWebPage('../imprint/imprint.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy'),
        handler: (event, target) => redirectToWebPage('../privacy_policy/privacy_policy.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up'),
        handler: async (event, target) => await loadComponent(privacyImprintOverlay, 'privacy-imprint-overlay')
    }, 
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#playIcon'),
        handler: (event, target) => {
            handleAllClickEventsForPlayableGame();
            startGameAndSetStyleForDesktopDevice();
        }
    }
]

/**
 * Array of click event handlers for the imprint page.
 * @type {{condition: function(EventTarget): boolean, handler: function(Event, EventTarget): void}[]}
 */

let clickEventsHandleOnImprintPageCommon = [
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#back-to-game-page'),
        handler: (event, target) => redirectToWebPage('../index.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy'),
        handler: (event, target) => redirectToWebPage('../privacy_policy/privacy_policy.html')
    }
]

/**
 * Array of click event handlers for the privacy policy page.
 * @type {{condition: function(EventTarget): boolean, handler: function(Event, EventTarget): void}[]}
 */

let clickEventsHandleOnPrivacyPageCommon = [
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#back-to-game-page'),
        handler: (event, target) => redirectToWebPage('../index.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#imprint'),
        handler: (event, target) => redirectToWebPage('../imprint/imprint.html')
    }
]

/**
 * Array of touchstart event handlers for various UI elements.
 * @type {{condition: function(EventTarget): boolean, handler: function(Event, EventTarget): void}[]}
 */

let touchStartEventsCommon = [
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#main-page-link'),
        handler: (event, target) => changeMainPageLinkColorOnTouchStart()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up'),
        handler: (event, target) => setDivBackgroundColor('privacy-and-imprint-pop-up', 'gold')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#all-icons-button'),
        handler: (event, target)  => setDivBackgroundColor('all-icons-button', 'gold')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#imprint-touch'),
        handler: (event, target) => setDivBackgroundColor('imprint-touch', 'goldenrod')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy-touch'),
        handler: (event, target) => setDivBackgroundColor('privacy-touch', 'goldenrod')
    }
]

/**
 * Array of touchend event handlers for various UI elements.
 * @type {{condition: function(EventTarget): boolean, handler: function(Event, EventTarget): void}[]}
 */

let touchEndEventsCommon = [
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#main-page-link'),
        handler: (event, target) => redirectToWebPage('../index.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up'),
        handler: (event, target) => setDivBackgroundAndShowPrivacyAndImprint()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#settings-container-touch'),
        handler: (event, target) => setDivBackgroundAndShowSettingsPopUp()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#all-icons-button'),
        handler: (event, target)  => setDivBackgroundAndShowAllIconSources()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#imprint-touch'),
        handler: (event, target) => setDivBackgroundColor('imprint-touch', 'gold')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy-touch'),
        handler: (event, target) => setDivBackgroundColor('privacy-touch', 'gold')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#playIcon'),
        handler: async (event, target) => {            
            event.preventDefault();
            handleAllEventsNecessaryForPlayableGame();
            startGameAndSetStyleForTouchDevice();
        }
    }
]

/**
 * Shows the loading spinner while running an async operation.
 * @param {Function} asyncCallback - The async function to run while showing the spinner.
 */

function withLoadingSpinner(asyncCallback){
    let loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'flex';
    }
    try {
        asyncCallback();
    } finally {
        hideSpinner();
    }
}

/**
 * Hides the loading spinner element if it exists.
 */

function hideSpinner(){
    let loadingSpinner = document.getElementById('loading-spinner');
    if(loadingSpinner){
        loadingSpinner.style.display = 'none';
    }
}