let winningOverlay = {
    html: '../templates/winning-overlay.html',
    setUp(container){
        container.classList.remove('d-none');
        function onClick(event){
            if(event.target.matches('#play-again-after-winning')){
                container.classList.add('d-none');
                try {
                    startGame();
                } catch (error) {
                    console.error('Startgame doesnt work as expected', error);
                }
            }
        }
        container.addEventListener('click', onClick);
    }
};