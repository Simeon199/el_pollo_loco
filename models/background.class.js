/**
 * Represents a background object in the game.
 * Inherits from the MovableObject class.
 * 
 * @extends MovableObject
 */

class Background extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    /**
     * Creates an instance of the Background class. Loads the background image from the specified path.
     */

    constructor() {
        super().loadImage('img/5_background/complete_background.png');
    }
}