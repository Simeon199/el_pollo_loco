function redirectToPlayPage() {
    window.location.href = "index.html";
}

function redirectToLegalNoticePage() {
    window.location.href = "legal_notice.html"
}

function redirectToStart() {
    window.location.href = "start.html";
}

// Open and Close Mini-Version of All-Icons-Container (Kann man in einer Funktion behandeln --> später: Vereinfache dies!)

function openAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    let allIconsButton = document.getElementById('all-icons-button');
    if (allIconsMiniVersionContainer.style.display !== 'flex') {
        allIconsMiniVersionContainer.style.display = ' flex';
        allIconsButton.style.display = 'none';
    }
    window.scrollBy(0, 200);
}

function closeAllIconsContainer() {
    let allIconsMiniVersionContainer = document.getElementById('all-icons-container-mini-version');
    let allIconsButton = document.getElementById('all-icons-button');
    if (allIconsMiniVersionContainer.style.display !== 'none') {
        allIconsMiniVersionContainer.style.display = ' none';
        allIconsButton.style.display = 'block';
    }
    window.scrollBy(0, 200);
}