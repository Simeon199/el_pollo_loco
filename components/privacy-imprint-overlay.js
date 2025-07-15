let privacyImprintOverlay = {
    html: '../templates/privacy-imprint-overlay.html',
    setUp(container){
        container.classList.remove('d-none');
        function onClick(event){
            if(event.target.matches('.closeBtn')){
                container.classList.add('d-none');
            } else if(event.target.closest('#privacy-touch')){
                privacyOrImprintTouchActivated = true;
                window.location.href = "../privacy_policy/privacy_policy.html";
            } else if(event.target.closest('#imprint-touch')){
                privacyOrImprintTouchActivated = true;
                window.location.href = "../imprint/imprint.html";
            }
        }
        container.addEventListener('click', onClick);
    }
}