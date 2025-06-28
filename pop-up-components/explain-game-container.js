let explainGamePopUp = {
    html: '../templates/explain-game.html',
    setUp(container){
        function onClick(event){
            if(event.target.matches('.closeBtn')){
                container.remove();
            }
        }
        container.addEventListener('click', onClick);
    }
};

export default explainGamePopUp;