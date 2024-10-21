/**
 * Represents a background object in the game.
 * Inherits from the MovableObject class.
 * 
 * @extends MovableObject
 */

class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates an instance of the BackgroundObject class. Loads the image specified by the imagePath parameter, sets the x position,
     * and calculates the y position based on the height of the object.
     * 
     * @param {string} imagePath - The path to the image to be loaded for the background object.
     * @param {number} x - The x-coordinate position of the background object.
     */

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}