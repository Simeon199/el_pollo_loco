let clickEventsHandleOnIndexPageGame = [
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
        condition: (target) => isContainerTouchedOrClicked(target, '#enterFullscreen'),
        handler: (event, target) => enterFullscreen()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#exitFullscreen'),
        handler: (event, target) => exitFullscreen()
    }
]

/**
 * Array of touchstart event handlers for various UI elements.
 * @type {{condition: function(EventTarget): boolean, handler: function(Event, EventTarget): void}[]}
 */

let touchStartEventsGame = [
    {
        condition: (target) => areTouchControlButtonsTouched(target),
        handler: (event, target) => preventDefaultAndHandleAllSwitchCasesForTouchStart(event, target)
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#exit-game-container'),
        handler: (event, target) => setExitGameContainersButtonStyle()
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#play-again-after-losing'),
        handler: (event, target) => changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'goldenrod')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#play-again-after-winning'),
        handler: (event, target) => changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'goldenrod')
    }
]

/**
 * Array of touchend event handlers for various UI elements.
 * @type {{condition: function(EventTarget): boolean, handler: function(Event, EventTarget): void}[]}
 */

let touchEndEventsGame = [
    {
        condition: (target) => areTouchControlButtonsTouched(target),
        handler: (event, target) => preventDefaultAndHandleAllSwitchCasesForTouchEnd(event, target)
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#exit-game-container'),
        handler: (event, target) => setStyleForExitGameContainerAndResetGame()
    },
    {
        condition: (target) => isSoundIconClicked(target),
        handler: (event, target) => {
            event.preventDefault();
            turnSoundOnOrOff();
        }
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#play-again-after-losing'),
        handler: (event, target) => changeBackgroundOfPlayAgainButtonPressed('play-again-after-losing', 'gold')
    },
    {
        condition: (target) => isContainerTouchedOrClicked(target, '#play-again-after-winning'),
        handler: (event, target) => changeBackgroundOfPlayAgainButtonPressed('play-again-after-winning', 'gold')
    }
]