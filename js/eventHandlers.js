let mqTouch = window.matchMedia('(hover: none)');
let mqDesktop = window.matchMedia('(hover: hover)');
let mqMediumDesktop = window.matchMedia('(min-width: 1025px) and (orientation: landscape)');
let mqSmallDesktop = window.matchMedia('(max-width: 1024px) and (orientation: landscape)');
let privacyOrImprintTouchActivated = false;

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
        handler: (event, target) => startGameAndSetStyleForDesktopDevice()
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
    }
]

let clickEventsHandleOnImprintPage = [
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#main-page-link'),
        handler: (event, target) => redirectToWebPage('../index.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy'),
        handler: (event, target) => redirectToWebPage('../privacy_policy/privacy_policy.html')
    }
]

let clickEventsHandleOnPrivacyPage = [
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#main-page-link'),
        handler: (event, target) => redirectToWebPage('../index.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#imprint'),
        handler: (event, target) => redirectToWebPage('../imprint/imprint.html')
    }
]

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
        handler: (event, target) =>  startGameAndSetStyleForTouchDevice()
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