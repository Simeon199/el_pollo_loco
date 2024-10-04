class Chicken extends MovableObject {
    movingDirection = 'left'
    intervalMove = null;
    intervalChangeWalkingImages = null;
    playingDeadEnemyId = null;
    spliceable = false;
    isEndbossFinalEnemy = false;
    enemiesArray = [];
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
        this.x = 500 + Math.random() * 700;
        this.speed = 1 + Math.random() * 0.25;
        this.animate();
    }

    animate(array = []) {
        this.proveIfIntervalsAlreadyExists();
        this.animateMovingChickens();
        if (this.isChickenDeadAndAreTheRemainingParametersCorrect(array)) {
            this.clearAllRelevantIntervalsWhenChickenDies();
            this.playingDeadEnemyId = setInterval(() => {
                this.playAnimation(this.IMAGE_DEAD_CHICKEN);
            }, 100);
            this.stopPlayingDeadAnimation();
        }
    };

    animateDeadChickenWhenItGetsJumpedOn() {
        if (this.isDead) {
            this.playingDeadEnemyId = setInterval(() => {
                this.playAnimation(this.IMAGE_DEAD_CHICKEN);
            }, 100);
        }
        this.clearAllRelevantIntervalsWhenChickenDies();
    }

    isChickenDeadAndAreTheRemainingParametersCorrect(array) {
        return this.isDead == true && array.length > 0;
    }


    clearAllRelevantIntervalsWhenChickenDies() {
        clearInterval(this.intervalMove);
        clearInterval(this.intervalChangeWalkingImages);
    }

    proveIfIntervalsAlreadyExists() {
        if (this.intervalMove) {
            clearInterval(this.intervalMove);
        }
        if (this.intervalChangeWalkingImages) {
            clearInterval(this.intervalChangeWalkingImages);
        }
    }

    animateMovingChickens() {
        this.intervalMove = setInterval(() => {
            if (this.isDead == false) {
                if (this.movingDirection == 'left') {
                    this.moveLeft();
                } else if (this.movingDirection == 'right') {
                    this.moveRight();
                };
            }
        }, 1000 / 60);

        this.intervalChangeWalkingImages = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 100);
    }

    stopPlayingDeadAnimation() {
        if (this.playingDeadEnemyId) {
            setTimeout(function () {
                clearInterval(this.playingDeadEnemyId);
                this.playingDeadEnemyId = null;
            }, 100);
        }
    }
}