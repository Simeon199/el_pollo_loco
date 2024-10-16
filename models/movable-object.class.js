class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    timePassedLimit = 0.5;
    timePassedVariable = 0;
    lastHit = 0;

    constructor() {
        super();
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGroundOrUpwardSpeedPositive()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGroundOrUpwardSpeedPositive() {
        return this.isAboveGround() || this.speedY > 0;
    }

    isAboveGround() {
        if (this.isInstanceOfThrowableObject()) {
            return true;
        } else {
            return this.y < 135;
        }
    }

    isInstanceOfThrowableObject() {
        return this instanceof ThrowableObject;
    }

    isColliding(mo) {
        let tolerance = this.returnCorrectTolerance();
        return this.x + this.width - tolerance > mo.x &&
            this.y + this.height - tolerance > mo.y &&
            this.x + tolerance < mo.x + mo.width &&
            this.y + tolerance < mo.y + mo.height;
    }


    returnCorrectTolerance() {
        let tolerance = 0;
        if (this.isCharacterAndAboveGround()) {
            tolerance = 5;
        } else if (this.isCharacterAndNotAboveGround()) {
            tolerance = 20;
        }
        return tolerance;
    }

    isCharacterAndAboveGround() {
        return this instanceof Character && this.isAboveGround();
    }

    isCharacterAndNotAboveGround() {
        return this instanceof Character && !this.isAboveGround();
    }

    substractCorrectEnergyAmountWhenGetHit() {
        if (this.isEndboss()) {
            this.energy -= 10;
        } else {
            this.energy -= 5;
        }
    }

    isEndboss() {
        return this instanceof Endboss;
    }

    hit() {
        this.substractCorrectEnergyAmountWhenGetHit();
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        this.timePassedVariable = timepassed;
        return timepassed < this.timePassedLimit;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        if (this.isMovableObjectCharacterAndHurtOrDead()) {
            this.x += 0;
        } else {
            this.x += this.speed;
        }
    }

    moveLeft() {
        if (this.isMovableObjectCharacterAndHurtOrDead()) {
            this.x -= 0;
        } else {
            this.x -= this.speed;
        }
    }

    jump() {
        if (this.isMovableObjectCharacterAndHurtOrDead()) {
            this.speedY = 0;
        } else {
            this.speedY = 30;
        }
    }

    isMovableObjectCharacterAndHurtOrDead() {
        return this instanceof Character && (this.isHurt() || this.isDead());
    }
}