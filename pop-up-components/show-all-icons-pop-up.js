let showAllIconsPopUp = {
    html: '../templates/icons-container.html',
    setUp(container){
        let closeBtn = container.querySelector('.closeBtn');
        closeBtn.addEventListener('click', () => {
            container.remove();
        });
    }
};

export default showAllIconsPopUp;