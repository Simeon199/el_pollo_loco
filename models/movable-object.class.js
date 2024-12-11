/**
 * Represents a movable object in the game that can be drawn and has motion properties. Inherits from the DrawableObject class.
 * 
 * @extends DrawableObject
 */

class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.8; // 2.5
    energy = 100;
    timePassedLimit = 1;
    timePassedVariable = 0;
    lastHit = 0;
    offsetRight = 0;
    offsetLeft = 0;
    offsetTop = 0;
    offsetBottom = 0;

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
            } else {
                this.y = 145;
                this.isJumping = false;
            }
        }, 62); // 60
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
     * Determines if the object is above ground level.
     * 
     * - Returns `true` if the object is an instance of a throwable object, assuming throwable objects are always above ground.
     * - Otherwise, checks if the `y` coordinate is less than 135, which indicates the object is above a specific ground threshold.
     * 
     * @returns {boolean} `true` if the object is above ground level; otherwise, `false`.
     */

    isAboveGround() {
        if (this.isInstanceOfThrowableObject()) {
            return true;
        } else {
            return this.y < 145;
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
    * Checks if this object is colliding with another movable object. It applies offset values to verify a general collision.
    * 
    * @param {MovableObject} mo - The other movable object to check for collision.
    * @returns {boolean} True if this object is colliding with the other object; otherwise, false.
    */

    isColliding(mo) {
        this.returnCorrectTolerance();
        return this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft &&
            this.y + this.height - this.offsetBottom > mo.y + mo.offsetTop &&
            this.x + this.offsetLeft < mo.x + mo.width - mo.offsetRight &&
            this.y + this.offsetTop < mo.y + mo.height - mo.offsetBottom;
    }

    /**
    * Returns the correct offset values for collision detection based on the object's state.
    * 
    * @returns {number} The appropriate tolerance value for the object.
    */

    returnCorrectTolerance() {
        if (this.isCharacterAndAboveGround()) {
            this.offsetRight = 60;
            this.offsetLeft = 60;
            this.offsetTop = 30;
            this.offsetBottom = 40;
        } else if (this.isCharacterAndNotAboveGround()) {
            this.offsetRight = 40;
            this.offsetLeft = 40;
            this.offsetTop = -10;
            this.offsetBottom = 0;
        }
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
            this.energy -= 15;
        } else if (this.isCharacter()) {
            this.energy -= 20;
        }
    }

    isCharacter() {
        return this instanceof Character;
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
     * Checks if the object's energy is empty.
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
        // debugger;
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
        } else if (!this.isAboveGround()) {
            this.speedY = 18;
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