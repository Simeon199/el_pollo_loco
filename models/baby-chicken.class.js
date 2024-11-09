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
        this.speed = 0.50 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD_CHICKEN);
        this.x = 400 + Math.random() * 700;
        this.animate();
    }
}