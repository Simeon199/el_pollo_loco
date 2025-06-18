document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.endsWith('/privacy_policy/privacy_policy.html')){
        document.getElementById('link-to-imprint').addEventListener('click', () => {
            toLegalNoticePage();
        });
        document.getElementById("back-to-game-page").addEventListener('click', () => {
            backToGamePage();
        });
    } else if(window.location.pathname.endsWith('/legal_notice/legal_notice.html')){
        document.getElementById('link-to-privacy-policy').addEventListener('click', () => {
            toPrivacyPolicyPage();
        });
        document.getElementById("back-to-game-page").addEventListener('click', () => {
            backToGamePage();
        });
    }
});

function toPrivacyPolicyPage(){
    window.location.href = "../privacy_policy/privacy_policy.html";
}

function toLegalNoticePage(){
    window.location.href = "../legal_notice/legal_notice.html";
}

function backToGamePage(){
    window.location.href = "../index.html";
}