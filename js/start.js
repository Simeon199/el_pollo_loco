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
 * Redirects the user to the start page.
 */

function redirectToStart() {
    window.location.href = "start.html";
}

/**
 * Opens the mini-version of the icons container.
 * 
 * If the icons container is not currently displayed, it sets the display style to 'flex'
 * and hides the button that opens this container. The window is then scrolled down 
 * by 200 pixels to bring the icons into view.
 */
function openAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    let allIconsButton = document.getElementById('all-icons-button');
    if (allIconsMiniVersionContainer.style.display !== 'flex') {
        allIconsMiniVersionContainer.style.display = ' flex';
        allIconsButton.style.display = 'none';
    }
    window.scrollBy(0, 200);
}

/**
 * Closes the mini-version of the icons container.
 * 
 * If the icons container is currently displayed, it sets the display style to 'none'
 * and shows the button that opens this container. The window is then scrolled down 
 * by 200 pixels.
 */

function closeAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    let allIconsButton = document.getElementById('all-icons-button');
    if (allIconsMiniVersionContainer.style.display !== 'none') {
        allIconsMiniVersionContainer.style.display = ' none';
        allIconsButton.style.display = 'block';
    }
    window.scrollBy(0, 200);
}

/**
 * Opens the container displaying all icons in a minimized version.
 */

function openAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    if (allIconsMiniVersionContainer.style.display !== 'flex') {
        allIconsMiniVersionContainer.style.display = ' flex';
    }
}

/**
 * Closes the container displaying all icons in a minimized version.
 */

function closeAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    if (allIconsMiniVersionContainer.style.display !== 'none') {
        allIconsMiniVersionContainer.style.display = ' none';
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