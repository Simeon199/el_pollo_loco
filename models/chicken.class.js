class Chicken extends MovableObject {
    intervalMoveLeft = null;
    intervalChangeWalkingImages = null;
    playingDeadEnemyId = null;
    enemyArrayIndex;
    isDead = false;
    y = 340;
    height = 90;
    width = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD_CHICKEN = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];



    constructor(enemyArrayIndex) {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD_CHICKEN);
        this.enemyArrayIndex = enemyArrayIndex;
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate(array = [], throwId = -1) {
        this.proveIfIntervalsAlreadyExists();
        this.animateMovingChickens();
        if (this.isChickenDeadAndAreTheRemainingParametersCorrect(array, throwId)) {
            this.clearAllRelevantIntervalsWhenChickenDies(throwId);
            this.playingDeadEnemyId = setInterval(() => {
                this.playAnimation(this.IMAGE_DEAD_CHICKEN);
                console.log("Animate Dead Chicken function was executed!");
            }, 100);
            // this.stopPlayingDeadAnimation();
        }
    };

    isChickenDeadAndAreTheRemainingParametersCorrect(array, throwId) {
        return this.isDead == true && array.length > 0 && throwId > -1;
    }

    clearAllRelevantIntervalsWhenChickenDies(throwId) {
        clearInterval(this.intervalMoveLeft);
        clearInterval(this.intervalChangeWalkingImages);
        clearInterval(throwId);
    }

    proveIfIntervalsAlreadyExists() {
        if (this.intervalMoveLeft) {
            clearInterval(this.intervalMoveLeft);
        }
        if (this.intervalChangeWalkingImages) {
            clearInterval(this.intervalChangeWalkingImages);
        }
    }

    animateMovingChickens() {
        this.intervalMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.intervalChangeWalkingImages = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 100);
    }

    // stopPlayingDeadAnimation() {
    //     if (this.playingDeadEnemyId) {
    //         clearInterval(this.playingDeadEnemyId);
    //         this.playingDeadEnemyId = null;
    //     }
    // }
}