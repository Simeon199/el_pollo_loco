/**
 * Represents a drawable object in the game. This class provides functionality to load and draw images, as well as manage their properties.
 */

class DrawableObject {
    x = 120;
    y = 280;
    height = 100;
    width = 80;
    img;
    imageCache = {}; 
    currentImage = 0;

    /**
     * Loads an image from a given path.
     * 
     * @param {string} path - The path to the image file.
     */

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and caches them for later use.
     * 
     * @param {Array<string>} arr - An array of image paths.
     */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the loaded image onto the canvas at the object's current position.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     */

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image:', e);
            console.log("relevant imageCache:", this.imageCache);
            console.log('relevant currentImage that cant be loaded (index):', this.currentImage);
        }
    }

    /**
     * Draws a frame around the drawable object if it is a specific type.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     */

    drawFrame(ctx) {
        if (this.proveIfInstanceOfCertainType()) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'yellow';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Determines if the current instance is of a certain type.
     * 
     * @returns {boolean} - True if the instance is one of the specified types, otherwise false.
     */

    proveIfInstanceOfCertainType() {
        let bolean = this.isInstanceOfTheFollowingObjects();
        return bolean;
    }

    /**
    * Checks if the current instance is an instance of specific classes.
    * 
    * @returns {boolean} - True if the instance is a Character, Chicken, ThrowableObject, Endboss, or Coin.
    */

    isInstanceOfTheFollowingObjects() {
        return this instanceof Character || this instanceof Chicken || this instanceof ThrowableObject || this instanceof Endboss || this instanceof Coin;
    }
}