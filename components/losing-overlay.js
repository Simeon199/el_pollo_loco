let losingOverlay = {
    html: '../templates/losing-overlay.html',
    setUp(container){
        container.classList.remove('d-none');
        function onClick(event){
            if(event.target.matches('#play-again-after-losing')){
                container.classList.add('d-none');
                try {
                    startGame();
                } catch(error){
                    console.error('Startgame doesnt work as expected', error);
                }
            }
        }
        container.addEventListener('click', onClick);
    }
};