/**
 * Represents a movable object in the game that can be drawn and has motion properties. Inherits from the DrawableObject class.
 * 
 * @extends DrawableObject
 */

class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    timePassedLimit = 1;
    timePassedVariable = 0;
    lastHit = 0;

    /**
     * Creates an instance of the MovableObject class.
     */

    constructor() {
        super();
    }

    /**
     * Applies gravity to the object, updating its vertical position and speed.
     * Gravity affects the object when it is above the ground or moving upwards.
     */

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGroundOrUpwardSpeedPositive()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground or has a positive upward speed.
     * 
     * @returns {boolean} True if the object is above ground or has upward speed; otherwise, false.
     */

    isAboveGroundOrUpwardSpeedPositive() {
        return this.isAboveGround() || this.speedY > 0;
    }

    /**
     * Determines if the object is above the ground level.
     * 
     * @returns {boolean} True if the object is above ground; otherwise, false.
     */

    isAboveGround() {
        if (this.isInstanceOfThrowableObject()) {
            return true;
        } else {
            return this.y < 135;
        }
    }

    /**
     * Checks if the object is an instance of ThrowableObject.
     * 
     * @returns {boolean} True if the object is a ThrowableObject; otherwise, false.
     */

    isInstanceOfThrowableObject() {
        return this instanceof ThrowableObject;
    }

    /**
     * Checks if the object is colliding with another movable object.
     * 
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} True if the objects are colliding; otherwise, false.
     */

    isColliding(mo) {
        let tolerance = this.returnCorrectTolerance();
        return this.x + this.width - tolerance > mo.x &&
            this.y + this.height - tolerance > mo.y &&
            this.x + tolerance < mo.x + mo.width &&
            this.y + tolerance < mo.y + mo.height;
    }

    /**
    * Returns the correct tolerance value for collision detection based on the object's state.
    * 
    * @returns {number} The appropriate tolerance value for the object.
    */

    returnCorrectTolerance() {
        let tolerance = 0;
        if (this.isCharacterAndAboveGround()) {
            tolerance = 5;
        } else if (this.isCharacterAndNotAboveGround()) {
            tolerance = 20;
        }
        return tolerance;
    }

    /**
     * Checks if the object is a Character and is above ground.
     * 
     * @returns {boolean} True if the object is a Character and is above ground; otherwise, false.
     */

    isCharacterAndAboveGround() {
        return this instanceof Character && this.isAboveGround();
    }

    /**
     * Checks if the object is a Character and is not above ground.
     * 
     * @returns {boolean} True if the object is a Character and is not above ground; otherwise, false.
     */

    isCharacterAndNotAboveGround() {
        return this instanceof Character && !this.isAboveGround();
    }

    /**
     * Reduces the object's energy when it gets hit. The amount of energy deducted depends on whether the object is an Endboss.
     */

    substractCorrectEnergyAmountWhenGetHit() {
        if (this.isEndboss()) {
            this.energy -= 10;
        } else {
            this.energy -= 5;
        }
    }

    /**
     * Checks if the object is an instance of Endboss.
     * 
     * @returns {boolean} True if the object is an Endboss; otherwise, false.
     */

    isEndboss() {
        return this instanceof Endboss;
    }

    /**
     * Handles the hit event, reducing the object's energy and updating the last hit timestamp.
     */

    hit() {
        this.substractCorrectEnergyAmountWhenGetHit();
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Checks if the object is currently hurt based on the time passed since the last hit.
    * 
    * @returns {boolean} True if the object is still hurt; otherwise, false.
    */

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        this.timePassedVariable = timepassed;
        return timepassed < this.timePassedLimit;
    }

    /**
     * Checks if the object's energy is depleted.
     * 
     * @returns {boolean} True if the object is dead (energy == 0); otherwise, false.
     */

    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays the next frame of the object's animation.
     * 
     * @param {string[]} images - An array of image paths for the animation.
     */

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right based on its speed, considering its state.
     */

    moveRight() {
        if (this.isMovableObjectCharacterAndHurtOrDead()) {
            this.x += 0;
        } else {
            this.x += this.speed;
        }
    }

    /**
     * Moves the object to the left based on its speed, considering its state.
     */

    moveLeft() {
        if (this.isMovableObjectCharacterAndHurtOrDead()) {
            this.x -= 0;
        } else {
            this.x -= this.speed;
        }
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */

    jump() {
        if (this.isMovableObjectCharacterAndHurtOrDead()) {
            this.speedY = 0;
        } else {
            this.speedY = 30;
        }
    }

    /**
    * Checks if the object is a Character and is either hurt or dead.
    * 
    * @returns {boolean} True if the object is a Character and is hurt or dead; otherwise, false.
    */

    isMovableObjectCharacterAndHurtOrDead() {
        return this instanceof Character && (this.isHurt() || this.isDead());
    }
}