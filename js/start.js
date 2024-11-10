let isExplainContainerOpen = false;

/**
 * Redirects the user to the play page.
 */

function redirectToPlayPage() {
    window.location.href = "index.html";
}

/**
 * Redirects the user to the legal notice page.
 */

function redirectToLegalNoticePage() {
    window.location.href = "legal_notice.html"
}

/**
 * Opens the mini-version of the icons container. If the icons container is not currently displayed, it hides the button that opens this container.
 */
// function openAllIconsContainer() {
//     let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
//     let allIconsButton = document.getElementById('all-icons-button');
//     if (allIconsMiniVersionContainer.style.display !== 'flex') {
//         allIconsMiniVersionContainer.style.display = ' flex';
//         allIconsButton.style.display = 'none';
//     }
//     window.scrollBy(0, 200);
// }

/**
 * Closes the mini-version of the icons container. If the icons container is currently displayed, it shows the button that opens this container.
 */

// function closeAllIconsContainer() {
//     let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
//     let allIconsButton = document.getElementById('all-icons-button');
//     if (allIconsMiniVersionContainer.style.display !== 'none') {
//         allIconsMiniVersionContainer.style.display = ' none';
//         allIconsButton.style.display = 'block';
//     }
//     window.scrollBy(0, 200);
// }

/**
 * Opens the container displaying all icons in a minimized version.
 */

function openAllIconsContainer() {
    let allIconsOverlay = document.getElementById('all-icons-container-overlay');
    if (allIconsOverlay.classList.contains('d-none')) {
        allIconsOverlay.classList.remove('d-none');
    }
}

/**
 * Closes the container displaying all icons in a minimized version.
 */

function closeAllIconsContainer() {
    let allIconsOverlay = document.getElementById('all-icons-container-overlay');
    if (!allIconsOverlay.classList.contains('d-none')) {
        allIconsOverlay.classList.add('d-none');
    }
}

/**
 * Opens the settings section, explaining the game if it is hidden.
 */

function openSettingsFunction() {
    let explainGameContainer = document.getElementById('explain-game-container');
    if (explainGameContainer.classList.contains('d-none')) {
        explainGameContainer.classList.remove('d-none');
    }
}

/**
 * Closes the settings section explaining the game if it is visible.
 */

function closeExplainGameContainer() {
    let explainGameContainer = document.getElementById('explain-game-container');
    if (!explainGameContainer.classList.contains('d-none')) {
        explainGameContainer.classList.add('d-none');
    }
}

/**
 * Prevents event bubbling (propagation) for the given event.
 * 
 * @param {Event} event - The event object.
 */

function preventBubbling(event) {
    event.stopPropagation();
}
