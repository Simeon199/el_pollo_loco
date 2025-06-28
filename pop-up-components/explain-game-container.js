let explainGamePopUp = {
    html: '../templates/explain-game.html',
    setUp(container){
        let closeBtn = container.querySelector('.closeBtn');
        closeBtn.addEventListener('click', () => {
            container.remove();
        });
    }
};

export default explainGamePopUp;