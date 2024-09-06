class World {
    runInterval = null;
    character = new Character();
    statusbar = new StatusBar();
    bottlebar = new BottleBar();
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
        }, 100);
    }

    checkThrowableObjectsCollision() {
        this.throwableObjects.forEach(bottle => {
            this.proveIfBottleIsCollidingWithEnemy(bottle);
        })
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
            this.executeFunctionsToAnimateHurtEndboss(bottle, enemy);
        }
    }

    executeFunctionsToAnimateDyingEnemy(bottle, enemy) {
        bottle.isBottleBroken = true;
        enemy.isDead = true;
        enemy.animate(this.level.enemies);
        bottle.playBottleBrokenAnimation();
        console.log("throwable Object: ", this.throwableObjects)
        // bottle.spliceable = true;
        // console.log("Throw Objects Array Object: ", bottle.throwObjectsArray);
    }

    executeFunctionsToAnimateHurtEndboss(bottle, enemy) {
        bottle.isBottleBroken = true;
        enemy.isHurt = true;
        clearInterval(enemy.animateInterval);
        bottle.spliceable = true;
        bottle.playBottleBrokenAnimation();
        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
        // setTimeout(function () {
        //     this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
        // }, 10);
        // console.log("Throw Objects Array Object: ", bottle.throwObjectsArray);
    }

    isBottleFlyingAndEnemyIsEndboss(bottle, enemy) {
        return bottle.proveIfBottleIsOnGround() == false && enemy.isDead == false && enemy instanceof Endboss;
    }

    isBottleFlyingAndEnemyNotEndboss(bottle, enemy) {
        return bottle.proveIfBottleIsOnGround() == false && enemy.isDead == false && !(enemy instanceof Endboss);
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.checkCasesThatCanOccurWhenCharacterHitsEnemy(enemy);
            }
        });
    }

    checkCasesThatCanOccurWhenCharacterHitsEnemy(enemy) {
        if (this.characterFallsOnEnemy(enemy) && !enemy.isDead) {
            this.enemyIsDefeatedByJump(enemy);
        } else if (!enemy.isDead) {
            this.adjustStatusBarWhenCharacterGetsHit();
        }
    }

    adjustStatusBarWhenCharacterGetsHit() {
        this.character.hit();
        this.statusbar.percentage -= 1;
        this.statusbar.setPercentage(this.character.energy);
    }

    characterFallsOnEnemy(enemy) {
        return this.character.speedY < 0 && this.character.y + this.character.height <= enemy.y + enemy.height * 0.5;
    }

    enemyIsDefeatedByJump(enemy) {
        enemy.isDead = true;
        enemy.animateDeadChickenWhenItGetsJumpedOn();
        this.character.bounce();
    }

    // Mit der Funktion checkCollisionsWithBottles wird das Einsammeln der Flaschen gesteuert!

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

    setWorld() {
        this.character.world = this;
        this.bottlebar.world = this;
    }

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
}