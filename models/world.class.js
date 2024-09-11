class World {
    runInterval = null;
    character = new Character();
    statusbar = new StatusBar();
    bottlebar = new BottleBar();
    endbossbar = new EndbossBar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.level = level1;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.bottlebar.bottleAmount = this.level.bottles.length;
        this.run();
    }

    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsWithBottles();
            this.checkThrowObjects();
            this.checkThrowableObjectsCollision();
            this.calibrateDistanceBetweenCharacterAndEndboss();
        }, 100);
    }

    setWorld() {
        this.character.world = this;
        this.bottlebar.world = this;
        this.endbossbar.world = this;
    }

    calibrateDistanceBetweenCharacterAndEndboss() {
        this.level.enemies[this.level.enemies.length - 1].mainCharacterPosition = this.character.x;
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.checkCasesThatCanOccurWhenCharacterGetsHit(enemy);
            }
        });
    }

    // Mit der Funktion checkCollisionsWithBottles wird das Einsammeln der Flaschen gesteuert! Die entsprechenden Methoden finden sich hier.

    checkCollisionsWithBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.collectBottles(bottle);
                this.bottlebar.updateBottleBar(this.bottlebar.bottleAmount);
            }
        });
        this.throwableObjects.forEach(bottle => {
            if (this.character.isColliding(bottle) && !bottle.isBottleBroken && bottle.proveIfBottleIsOnGround()) {
                this.collectGroundBottles(bottle);
                this.bottlebar.updateBottleBar(this.bottlebar.bottleAmount);
            }
        });
    }

    collectBottles(bottle) {
        let index = this.level.bottles.indexOf(bottle);
        this.bottlebar.bottlesCollected += 1;
        this.level.bottles.splice(index, 1);
    }

    collectGroundBottles(bottle) {
        let index = this.throwableObjects.indexOf(bottle);
        this.bottlebar.bottlesCollected += 1;
        bottle.img.scr = '';
        this.level.bottles.push(this.throwableObjects[index]);
        this.throwableObjects.splice(index, 1);
    }

    checkThrowObjects() {
        if (this.keyboard.keyD && this.bottlebar.bottlesCollected > 0) {
            this.bottlebar.bottlesCollected -= 1;
            this.bottlebar.updateBottleBar(this.bottlebar.bottleAmount);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.keyboard);
            this.throwableObjects.push(bottle);
            bottle.throwObjectsArray = this.throwableObjects;
            bottle.throw();
        }
    }

    checkThrowableObjectsCollision() {
        this.throwableObjects.forEach(bottle => {
            this.proveIfBottleIsCollidingWithEnemy(bottle);
        })
    }

    proveIfBottleIsCollidingWithEnemy(bottle) {
        this.level.enemies.forEach(enemy => {
            if (bottle.isColliding(enemy)) {
                this.enemyEitherDiesOrGetsHurt(enemy, bottle);
                return true;
            }
        });
    }

    enemyEitherDiesOrGetsHurt(enemy, bottle) {
        if (this.isBottleFlyingAndEnemyNotEndboss(bottle, enemy)) {
            this.executeFunctionsToAnimateDyingEnemy(bottle, enemy);
        } else if (this.isBottleFlyingAndEnemyIsEndboss(bottle, enemy)) {
            this.executeFunctionsToAnimateHurtOrDeadEndboss(bottle, enemy);
        }
    }

    executeFunctionsToAnimateDyingEnemy(bottle, enemy) {
        bottle.isBottleBroken = true;
        enemy.isDead = true;
        enemy.animate(this.level.enemies);
        bottle.playBottleBrokenAnimation();
    }

    executeFunctionsToAnimateHurtOrDeadEndboss(bottle, enemy) {
        bottle.isBottleBroken = true;
        enemy.isEndbossHurt = true;
        bottle.playBottleBrokenAnimation();
        enemy.hit();
        if (enemy.energy > 0) {
            this.endbossbar.percentage -= 5;
            this.endbossbar.setPercentage(enemy.energy, this.endbossbar.IMAGES_DEAD_ENDBOSS);
        } else {
            enemy.spliceable = true;
            enemy.enemiesArray = this.level.enemies;
        }
    }

    isBottleFlyingAndEnemyIsEndboss(bottle, enemy) {
        return bottle.proveIfBottleIsOnGround() == false && enemy.isDead == false && enemy instanceof Endboss;
    }

    isBottleFlyingAndEnemyNotEndboss(bottle, enemy) {
        return bottle.proveIfBottleIsOnGround() == false && enemy.isDead == false && !(enemy instanceof Endboss);
    }

    checkCasesThatCanOccurWhenCharacterGetsHit(enemy) {
        if (this.characterFallsOnEnemy(enemy) && !enemy.isDead && !(enemy instanceof Endboss)) {
            this.enemyIsDefeatedByJump(enemy);
        } else if (!enemy.isDead) {
            this.adjustStatusBarWhenCharacterGetsHit();
            this.applyKnockback(enemy);
        }
    }

    adjustStatusBarWhenCharacterGetsHit() {
        this.character.hit();
        this.statusbar.percentage -= 5;
        this.statusbar.setPercentage(this.character.energy);
    }

    applyKnockback(enemy) {
        let knockbackDistance = 100;
        let knockbackSpeed = 5;
        let direction = this.character.x < enemy.x ? -1 : 1;
        let distanceMoved = 0;
        let knockbackInterval = setInterval(() => {
            let newXPosition = this.character.x + direction * knockbackSpeed;
            if (newXPosition >= -this.level.level_end_x + 100 && newXPosition <= this.level.level_end_x) {
                if (distanceMoved < knockbackDistance) {
                    this.character.x = newXPosition;
                    distanceMoved += knockbackSpeed;
                } else {
                    clearInterval(knockbackInterval);
                }
            } else {
                clearInterval(knockbackInterval);
            }
        }, 1000 / 60);
    }

    characterFallsOnEnemy(enemy) {
        return this.character.speedY < 0 && this.character.y + this.character.height <= enemy.y + enemy.height * 0.5;
    }

    enemyIsDefeatedByJump(enemy) {
        enemy.isDead = true;
        enemy.animateDeadChickenWhenItGetsJumpedOn();
        this.character.bounce();
    }

    // Hier sind die draw()-Methoden sowie die flipImage()-Funktionen verortet

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addMainObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
        this.addAllStatusBarsToMap();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addMainObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
    }

    addAllStatusBarsToMap() {
        this.addToMap(this.statusbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.endbossbar);
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}