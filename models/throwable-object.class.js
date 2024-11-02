/**
 * Class representing a throwable object (e.g., a salsa bottle) in the game.
 * Extends the MovableObject class, which includes movement and gravity-related functionality.
 */

class ThrowableObject extends MovableObject {
    bottleBrokenIntervalId = null;
    isBottleBroken = false;
    throwObjectsArray = [];
    intervalID = null;
    height = 60;
    width = 60 * 1.2;
    spliceable = false;
    keyboard;

    BOTTLE_ROTATE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLE_BROKEN_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    STANDING_BOTTLE_LEFT_DIRECTION = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
    STANDING_BOTTLE_RIGHT_DIRECTION = ['img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];


    /**
    * Constructor for the ThrowableObject class. It sets the initial position of the bottle,
    * loads the necessary images, and links the keyboard input for controlling the throw.
    * 
    * @param {number} x - The initial x-coordinate of the bottle
    * @param {number} y - The initial y-coordinate of the bottle
    * @param {object} z - The keyboard control object for handling user input
    */

    constructor(x, y, z) {
        super();
        this.loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.STANDING_BOTTLE_LEFT_DIRECTION);
        this.loadImages(this.STANDING_BOTTLE_RIGHT_DIRECTION);
        this.loadImages(this.BOTTLE_ROTATE_IMAGES);
        this.loadImages(this.BOTTLE_BROKEN_IMAGES);
        this.x = x;
        this.y = y;
        this.keyboard = z;
    }

    /**
    * Checks if the bottle is already broken. If the bottle is broken, the image source is cleared.
    */

    checkIfBottleIsAlreadyBroken() {
        if (this.isBottleBroken == true) {
            this.img.src = '';
        }
    }

    /**
    * Checks whether the bottle has landed on the ground.
    * 
    * @returns {boolean} True if the bottle's y-position is greater than or equal to 360 (ground-level).
    */

    proveIfBottleIsOnGround() {
        return this.y >= 360;
    }

    /**
    * Initiates the bottle throwing action. Determines the direction (left or right) based on the character's position and handles speed and gravity of the throw.
    */

    throw() {
        if (this.pepeIsWatchingRight()) {
            this.applyThrowingSetInterval('right');
        } else if (this.pepeIsWatchingLeft()) {
            this.applyThrowingSetInterval('left');
        }
        this.handleSpeedAndGravityOfThrowedBottle();
    }

    /**
    * Sets the initial speed for the bottle and applies gravity to simulate a realistic throw trajectory.
    */

    handleSpeedAndGravityOfThrowedBottle() {
        this.speedY = 30;
        this.applyGravity();
    }

    /**
    * Starts the bottle throw animation by applying an interval for continuous motion based on the direction.
    * 
    * @param {string} direction - The direction of the throw, either 'left' or 'right'.
    */

    applyThrowingSetInterval(direction) {
        this.throwBottleFunction(direction);
    }

    /**
    * Clears the currently active interval for the bottle's motion, if it exists.
    */

    clearIntervalIDFunction() {
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
    }

    /**
    * Moves the bottle left or right based on the specified direction.
    * 
    * @param {string} direction - The direction to move the bottle, either 'left' or 'right'.
    */

    checkDirectionLeftOrRightMovingBottle(direction) {
        if (direction == 'right') {
            this.x += 10;
        } else if (direction == 'left') {
            this.x -= 10;
        }
    }

    /**
    * Checks if the bottle is flying in the air or has landed on the ground. If it's still in the air,
    * the bottle will continue moving and rotating. If it has landed, the motion is stopped.
    * 
    * @param {string} direction - The direction the bottle is moving.
    */

    checkWhetherBottleIsFlyingInTheAirOrLanding(direction) {
        if (this.y >= 350) {
            this.stopBottleMotionOnceItLands(direction);
        } else {
            this.checkDirectionLeftOrRightMovingBottle(direction);
            this.playAnimation(this.BOTTLE_ROTATE_IMAGES);
        }
    }

    /**
    * Controls the bottle's flight and checks whether the bottle has landed or is still in motion. 
    * It sets the necessary intervals for updating the motion.
    * 
    * @param {string} direction - The direction the bottle is moving.
    */

    throwBottleFunction(direction) {
        this.clearIntervalIDFunction();
        if (!this.isBottleBroken) {
            this.intervalID = setInterval(() => {
                this.checkWhetherBottleIsFlyingInTheAirOrLanding(direction)
            }, 25);
        } else if (this.isBottleBroken) {
            this.playBottleBrokenAnimation();
        }
    }

    /**
    * Stops the speed and acceleration of the bottle once it lands, setting its y-position to 360.
    */

    stopSpeedAccelerationAndHeightOfBottle() {
        this.speedY = 0;
        this.acceleration = 0;
        this.y = 360;
    }

    /**
    * Sets the image direction of the bottle upon landing based on the direction it was thrown.
    * 
    * @param {string} direction - The direction of the throw, either 'left' or 'right'.
    */

    setLandingBottleDirection(direction) {
        if (direction == 'left') {
            this.img.src = this.STANDING_BOTTLE_RIGHT_DIRECTION[0];
        } else if (direction == 'right') {
            this.img.src = this.STANDING_BOTTLE_LEFT_DIRECTION[0];
        }
    }

    /**
    * Stops the bottle's motion once it has landed, plays the landing sound, and clears the interval controlling its motion.
    * 
    * @param {string} direction - The direction of the throw, either 'left' or 'right'.
    */

    stopBottleMotionOnceItLands(direction) {
        if (!this.isBottleBroken) {
            this.stopSpeedAccelerationAndHeightOfBottle();
            this.setLandingBottleDirection(direction);
            clearInterval(this.intervalID);
        }
    }

    /**
    * Determines if the character is facing right. Used to check the direction of the throw.
    * 
    * @returns {boolean} True if the character is facing right.
    */

    pepeIsWatchingRight() {
        let boleanValue = this.keyboard.rightForThrow == true && this.keyboard.leftForThrow == false;
        return boleanValue;
    }

    /**
    * Determines if the character is facing left, used to check the direction of the throw.
    * 
    * @returns {boolean} True if the character is facing left.
    */

    pepeIsWatchingLeft() {
        let boleanValue = this.keyboard.rightForThrow == false && this.keyboard.leftForThrow == true;
        return boleanValue;
    }

    /**
    * Sets an interval to play the bottle broken animation, cycling through the frames until the animation finishes.
    * 
    * @param {number} totalFrames - The total number of frames in the broken bottle animation.
    * @param {number} animationInterval - The time in milliseconds between each frame.
    */

    setAndPlayBottleBrokenIntervalId(totalFrames, animationInterval) {
        this.bottleBrokenIntervalId = setInterval(() => {
            this.img.src = this.BOTTLE_BROKEN_IMAGES[this.currentImage];
            this.currentImage++;
            if (this.currentImage >= totalFrames) {
                clearInterval(this.bottleBrokenIntervalId);
                this.img.src = '';
            }
        }, animationInterval);
    }

    /**
    * Plays the bottle breaking animation by cycling through the frames of the bottle broken image sequence.
    * If an interval for the animation already exists, it will be cleared before starting a new one.
    */

    playBottleBrokenAnimation() {
        this.currentImage = 0;
        let animationInterval = 50;
        let totalFrames = this.BOTTLE_BROKEN_IMAGES.length;
        if (this.bottleBrokenIntervalId) {
            clearInterval(this.bottleBrokenIntervalId);
        }
        if (this.isBottleBroken) {
            this.setAndPlayBottleBrokenIntervalId(totalFrames, animationInterval);
        }
    }
}