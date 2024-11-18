/**
 * Represents a chicken enemy in the game that can move, die, and play animations. It extends the MovableObject class.
*/

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
    offsetBottom = 5;
    offsetTop = 5;
    offsetRight = 5;
    offsetLeft = 5;
    world;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD_CHICKEN = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Creates an instance of Chicken and initializes its position and speed. Loads the images for the walking and dead animations.
     * 
     * @param {number} enemyArrayIndex - The index of this chicken in the enemies array.
     */

    constructor(enemyArrayIndex) {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD_CHICKEN);
        this.enemyArrayIndex = enemyArrayIndex;
        this.x = 500 + Math.random() * 1000;
        this.scatterSpeedValues();
        this.animate();
    }

    /**
     * Assigns a random speed value to the object based on a randomized logic.
     * 
     * This function generates a random number to determine the speed of an object:
     * - If the random number is greater than 0.5, the speed is set to a value between 0.25 and 1.75.
     * - If the random number is less than or equal to 0.5, the speed is set to a value between 1.5 and 0.75.
     */

    scatterSpeedValues() {
        let randomNumber = Math.random();
        if (randomNumber > 0.5) {
            this.speed = 0.25 + Math.random() * 2;
        } else if (randomNumber <= 0.5) {
            this.speed = 1.5 - Math.random() * 0.75;
        }
    }

    /**
     * Starts the animation loop for the chicken's movement and death state. Checks if the chicken is dead and and plays the dead animation in that case.
     * 
     * @param {array} [array=[]] - Optional array parameter for additional animation checks.
     */

    animate(array = []) {
        this.proveIfIntervalsAlreadyExists();
        this.animateMovingChickens();
        if (this.isChickenDeadAndAreTheRemainingParametersCorrect(array)) {
            this.clearAllRelevantIntervalsWhenChickenDies();
            this.playingDeadEnemyId = setInterval(() => {
                this.playAnimation(this.IMAGE_DEAD_CHICKEN);
            }, 150);
            this.stopPlayingDeadAnimation();
        }
    };

    /**
     * Animates the dead chicken when it gets jumped on. Stops all other relevant animations and plays the dead animation.
     */

    animateDeadChickenWhenItGetsJumpedOn() {
        if (this.isDead) {
            this.playingDeadEnemyId = setInterval(() => {
                this.playAnimation(this.IMAGE_DEAD_CHICKEN);
            }, 150);
        }
        this.clearAllRelevantIntervalsWhenChickenDies();
    }

    /**
     * Checks if the chicken is dead and if additional parameters are correct.
     * 
     * @param {array} array - An array of parameters for checking the condition.
     * @returns {boolean} True if the chicken is dead and the parameters are correct, false otherwise.
     */

    isChickenDeadAndAreTheRemainingParametersCorrect(array) {
        return this.isDead == true && array.length > 0;
    }

    /**
    * Clears all intervals related to the chicken's movement and animation when it dies.
    */

    clearAllRelevantIntervalsWhenChickenDies() {
        clearInterval(this.intervalMove);
        clearInterval(this.intervalChangeWalkingImages);
    }

    /**
    * Checks if the movement and animation intervals already exist and clears them if they do.
    */

    proveIfIntervalsAlreadyExists() {
        if (this.intervalMove) {
            clearInterval(this.intervalMove);
        }
        if (this.intervalChangeWalkingImages) {
            clearInterval(this.intervalChangeWalkingImages);
        }
    }

    /**
     * Decides whether the chicken moves left or right based on its current direction.
     */

    decideWhetherChickensAreMovingRightOrLeft() {
        if (this.movingDirection == 'left') {
            this.moveLeft();
        } else if (this.movingDirection == 'right') {
            this.moveRight();
        };
    }

    /**
     * Checks if the chicken is still alive.
     * 
     * @returns {boolean} True if the chicken is alive, false otherwise.
     */

    isChickenDead() {
        return this.isDead == false;
    }

    /**
     * Animates the chicken's movement and sets up intervals for updating its position and animation frames.
     */

    animateMovingChickens() {
        this.setMovingChickens();
        this.setIntervalChangeWalkingImages();
    }

    /**
     * Sets up the interval for moving the chicken.
     */

    setMovingChickens() {
        this.intervalMove = setInterval(() => {
            if (this.isChickenDead()) {
                this.decideWhetherChickensAreMovingRightOrLeft();
            }
        }, 100); // 1000 / 60
    }

    /**
     * Sets up the interval for changing the chicken's walking images.
     */

    setIntervalChangeWalkingImages() {
        this.intervalChangeWalkingImages = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 50); // 1000 / 100
    }

    /**
    * Stops the animation of the dead chicken after a certain time.
    */

    stopPlayingDeadAnimation() {
        if (this.playingDeadEnemyId) {
            setTimeout(function () {
                clearInterval(this.playingDeadEnemyId);
                this.playingDeadEnemyId = null;
            }, 100);
        }
    }
}