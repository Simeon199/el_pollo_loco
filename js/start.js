let isExplainContainerOpen = false;

/**
 * Redirects the user to the play page.
 */

function redirectToPlayPage() {
    window.location.href = "../index.html";
}

/**
 * Redirects the user to the legal notice page.
 */

function redirectToLegalNoticePage() {
    window.location.href = "./legal_notice/legal_notice.html";
}

/**
 * Redirects the user to the privacy policy page.
 */

function redirectToPrivacyPolicyPage(){
    window.location.href = "./privacy_policy/privacy_policy.html";
}

function closeOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if (!overlay.classList.contains('d-none')) {
        overlay.classList.add('d-none');
    }
}

function openOverlay(overlayId){
    let overlay = document.getElementById(`${overlayId}`);
    if(overlay.classList.contains('d-none')){
        overlay.classList.remove('d-none');
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