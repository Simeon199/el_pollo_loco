let showAllIconsPopUp = {
    html: '../templates/icons-container.html',
    setUp(container){ 
        container.classList.remove('d-none');
        function onClick(event){
            if(event.target.matches('.closeBtn')){
                container.classList.add('d-none');
            }
        }
        container.addEventListener('click', onClick);
    }
};

export default showAllIconsPopUp;