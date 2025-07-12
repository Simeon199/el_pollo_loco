let winningOverlay = {
    html: '../templates/winning-overlay.html',
    setUp(container){
        container.classList.remove('d-none');
        function onClick(event){
            if(event.target.matches('#play-again-after-winning')){
                try {
                    playAgain();
                } catch (error) {
                    console.error('Play Again doesnt work as expected', error);
                }
                container.classList.add('d-none');
            }
        }
        container.addEventListener('click', onClick);
    }
};