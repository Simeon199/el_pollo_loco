/**
 * Represents a coin object in the game. Inherits from the DrawableObject class.
 * 
 * @extends DrawableObject
 */

class Coin extends DrawableObject {
    height = 100;
    width = 100;

    /**
    * Creates an instance of the Coin class. Loads the coin image and sets a random position for the coin on the screen.
    */

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_2.png');
        this.x = 200 + Math.random() * 1200;
        this.y = 340 - Math.random() * 100;
    }
}