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

let clickEventsHandleOnIndexPage = [
    {
        condition: (target) => isSettingsButtonPressed(target),
        handler: async (event, target) => await loadComponent(explainGamePopUp, 'explain-game-container')  
    },
    {
        condition: (target) => isAllIconsButtonPressed(target),
        handler: async (event, target) =>  await loadComponent(showAllIconsPopUp, 'all-icons-container-overlay')
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
        condition: (target) => isContainerTouchedOrClicked(target, '#playIcon'),
        handler: async (event, target) => await startGameAndSetStyleForDesktopDevice()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#exit-game-container'),
        handler: (event, target) => setStyleForExitGameContainerAndResetGame()
    },
    {
        condition: (target) => isSoundIconClicked(target),
        handler: (event, target) => turnSoundOnOrOff()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up'),
        handler: async (event, target) => await loadComponent(privacyImprintOverlay, 'privacy-imprint-overlay')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#enterFullscreen'),
        handler: (event, target) => enterFullscreen()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#exitFullscreen'),
        handler: (event, target) => exitFullscreen()
    }
]

/**
 * Array of click event handlers for the imprint page.
 * @type {{condition: function(EventTarget): boolean, handler: function(Event, EventTarget): void}[]}
 */

let clickEventsHandleOnImprintPage = [
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

let clickEventsHandleOnPrivacyPage = [
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

let touchStartEvents = [
    {
        condition: (target) => areTouchControlButtonsTouched(target),
        handler: (event, target) => preventDefaultAndHandleAllSwitchCasesForTouchStart(event, target)
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#exit-game-container'),
        handler: (event, target) => setExitGameContainersButtonStyle()
    },
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
        condition: (target) => isContainerTouchedOrClicked(target, '#play-again-after-losing'),
        handler: (event, target) => changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'goldenrod')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#play-again-after-winning'),
        handler: (event, target) => changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'goldenrod')
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

let touchEndEvents = [
    {
        condition: (target) => areTouchControlButtonsTouched(target),
        handler: (event, target) => preventDefaultAndHandleAllSwitchCasesForTouchEnd(event, target)
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#exit-game-container'),
        handler: (event, target) => setStyleForExitGameContainerAndResetGame()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#playIcon'),
        handler: async (event, target) => await startGameAndSetStyleForTouchDevice()
    },
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
        condition: (target) => isContainerTouchedOrClicked(target, '#play-again-after-losing'),
        handler: (event, target) => changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'gold')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#play-again-after-winning'),
        handler: (event, target) => changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'gold')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#imprint-touch'),
        handler: (event, target) => setDivBackgroundColor('imprint-touch', 'gold')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy-touch'),
        handler: (event, target) => setDivBackgroundColor('privacy-touch', 'gold')
    }
]