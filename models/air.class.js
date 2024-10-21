/**
 * Represents an air object in the game.
 * Inherits from the MovableObject class.
 * 
 * @extends MovableObject
 */

class Air extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 0;
    constructor() {
        super().loadImage('img/5_background/layers/air.png');
    }
}