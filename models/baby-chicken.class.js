/**
 * Represents a baby chicken, which is a type of chicken in the game. Inherits properties and methods from the Chicken class.
 * 
 * @extends Chicken
 */

class BabyChicken extends Chicken {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png'
    ];

    IMAGE_DEAD_CHICKEN = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    world;

    /**
     * Creates an instance of the BabyChicken class. Initializes the speed, loads the walking and dead images, 
     * sets a random position for the baby chicken, and starts the animation.
     */

    constructor() {
        super();
        this.scatterSpeedValues();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD_CHICKEN);
        this.x = 1000 + Math.random() * 1000;
        this.animate();
    }

    scatterSpeedValues() {
        let randomNumber = Math.random();
        if (randomNumber > 0.5) {
            this.speed = 0.25 + Math.random() * 2;
        } else if (randomNumber <= 0.5) {
            this.speed = 2 - Math.random() * 0.5;
        }
    }
}