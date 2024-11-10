/**
 * Represents a cloud object in the game.
 * Inherits from the MovableObject class.
 * 
 * @extends MovableObject
 */

class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    /**
     * Creates an instance of the Cloud class. Loads the cloud image and sets a random x-coordinate for the cloud.
     * Initiates the animation for the cloud.
     */

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left.
     */

    animate() {
        this.moveLeft();
    }
}