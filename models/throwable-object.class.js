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

    bottleLanding = new Audio('audio/soft_landing.mp3');

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

    checkIfBottleIsAlreadyBroken() {
        if (this.isBottleBroken == true) {
            this.img.src = '';
        }
    }

    proveIfBottleIsOnGround() {
        return this.y >= 360;
    }

    throw() {
        if (this.pepeIsWatchingRight()) {
            this.applyThrowingSetInterval('right');
        } else if (this.pepeIsWatchingLeft()) {
            this.applyThrowingSetInterval('left');
        }
        this.handleSpeedAndGravityOfThrowedBottle();
    }

    handleSpeedAndGravityOfThrowedBottle() {
        this.speedY = 30;
        this.applyGravity();
    }

    applyThrowingSetInterval(direction) {
        this.throwBottleFunction(direction);
    }

    clearIntervalIDFunction() {
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
    }

    checkDirectionLeftOrRightMovingBottle(direction) {
        if (direction == 'right') {
            this.x += 10;
        } else if (direction == 'left') {
            this.x -= 10;
        }
    }

    checkWhetherBottleIsFlyingInTheAirOrLanding(direction) {
        if (this.y >= 350) {
            this.stopGame(direction);
        } else {
            this.checkDirectionLeftOrRightMovingBottle(direction);
            this.playAnimation(this.BOTTLE_ROTATE_IMAGES);
        }
    }

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

    stopSpeedAccelerationAndHeightOfBottle() {
        this.speedY = 0;
        this.acceleration = 0;
        this.y = 360;
    }

    setLandingBottleDirection(direction) {
        if (direction == 'left') {
            this.img.src = this.STANDING_BOTTLE_RIGHT_DIRECTION[0];
        } else if (direction == 'right') {
            this.img.src = this.STANDING_BOTTLE_LEFT_DIRECTION[0];
        }
    }

    stopGame(direction) {
        if (!this.isBottleBroken) {
            this.stopSpeedAccelerationAndHeightOfBottle();
            this.setLandingBottleDirection(direction);
            this.bottleLanding.play();
            clearInterval(this.intervalID);
        }
    }

    pepeIsWatchingRight() {
        let boleanValue = this.keyboard.rightForThrow == true && this.keyboard.leftForThrow == false;
        return boleanValue;
    }

    pepeIsWatchingLeft() {
        let boleanValue = this.keyboard.rightForThrow == false && this.keyboard.leftForThrow == true;
        return boleanValue;
    }

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