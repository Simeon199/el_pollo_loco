class ThrowableObject extends MovableObject {
    isBottleBroken = false;
    intervalID = null;
    height = 60;
    width = 60 * 1.2;
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
        this.checkIfThrowMethodShouldBeExecuted();
        this.proveIfBottleIsOnGround();
    }

    proveIfBottleIsOnGround() {
        setInterval(() => {
            if (this.y == 360) {
                console.log("bottle is on ground!");
            }
        }, 25);
    }

    checkIfThrowMethodShouldBeExecuted() {
        if (this.keyboard.keyD) {
            this.throw();
        }
    }

    throw() {
        if (this.pepeIsWatchingRight()) {
            this.applyThrowingSetInterval('right');
        } else if (this.pepeIsWatchingLeft()) {
            this.applyThrowingSetInterval('left');
        }
        this.speedY = 30;
        this.applyGravity();
    }

    applyThrowingSetInterval(direction) {
        if (direction == 'left') {
            this.throwBottleToTheLeft();
        } else if (direction == 'right') {
            this.throwBottleToTheRight();
        }
    }

    throwBottleToTheRight() {
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
        this.intervalID = setInterval(() => {
            console.log(this.y);
            if (this.y >= 350) {
                // this.y = 150;
                // this.playAnimation(this.STANDING_BOTTLE_LEFT_DIRECTION);
                this.stopGame('right');
            } else {
                this.x += 10;
                this.playAnimation(this.BOTTLE_ROTATE_IMAGES);
            }
        }, 25);
    }

    throwBottleToTheLeft() {
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
        this.intervalID = setInterval(() => {
            console.log(this.y);
            if (this.y >= 350) {
                // this.y = 150;
                // this.playAnimation(this.STANDING_BOTTLE_RIGHT_DIRECTION);
                this.stopGame('left');
            } else {
                this.x -= 10;
                this.playAnimation(this.BOTTLE_ROTATE_IMAGES);
            }
        }, 25);
    }

    stopGame(direction) {
        this.speedY = 0;
        this.acceleration = 0;
        this.y = 360;
        if (direction = 'left') {
            this.img.src = this.STANDING_BOTTLE_RIGHT_DIRECTION[0];
        } else if (direction = 'right') {
            this.img.src = this.STANDING_BOTTLE_LEFT_DIRECTION[0];
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
}