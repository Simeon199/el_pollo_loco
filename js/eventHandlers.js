let clickEventsHandleOnIndexPage = [
    {
        condition: (target) => isSettingsButtonPressed(target),
        handler: async () => await loadComponent(explainGamePopUp, 'explain-game-container')  
    },
    {
        condition: (target) => isAllIconsButtonPressed(target),
        handler: async () =>  await loadComponent(showAllIconsPopUp, 'all-icons-container-overlay')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#imprint'),
        handler: () => redirectToWebPage('../imprint/imprint.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy'),
        handler: () => redirectToWebPage('../privacy_policy/privacy_policy.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#playIcon'),
        handler: () => startGameAndSetStyleForDesktopDevice()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#exit-game-container'),
        handler: () => setStyleForExitGameContainerAndResetGame()
    },
    {
        condition: (target) => isSoundIconClicked(target),
        handler: () => turnSoundOnOrOff()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy-and-imprint-pop-up'),
        handler: async () => await loadComponent(privacyImprintOverlay, 'privacy-imprint-overlay')
    }
]

let clickEventsHandleOnImprintPage = [
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#main-page-link'),
        handler: () => redirectToWebPage('../index.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#privacy'),
        handler: () => redirectToWebPage('../privacy_policy/privacy_policy.html')
    }
]

let clickEventsHandleOnPrivacyPage = [
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#main-page-link'),
        handler: () => redirectToWebPage('../index.html')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#imprint'),
        handler: () => redirectToWebPage('../imprint/imprint.html')
    }
]