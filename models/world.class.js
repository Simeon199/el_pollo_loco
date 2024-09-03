class World {
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
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsWithBottles();
            this.checkThrowObjects();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.keyD && this.bottlebar.bottlesCollected > 0) {
            this.bottlebar.bottlesCollected -= 1;
            this.bottlebar.updateBottleBar(this.bottlebar.bottleAmount);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.keyboard); // Diese bottle-Instanz ist garnicht im bottle-Array enhalten! --> Ursache des Fehlers!
            this.throwableObjects.push(bottle);
            // console.log('Collided with bottles: ', this.throwableObjects);
            let checkThrowId = setInterval(() => {
                this.proveIfBottleIsCollidingWithEnemy(bottle, checkThrowId);
            }, 25);
        }
    }

    proveIfBottleIsCollidingWithEnemy(bottle, checkThrowId) {
        this.level.enemies.forEach(enemy => {
            if (bottle.isColliding(enemy) && !bottle.proveIfBottleIsOnGround() && enemy.isDead == false && !(enemy instanceof Endboss)) { // !enemy.isDead wurde für Testzwecke entfernt
                let bottleIndex = this.level.bottles.indexOf(bottle);
                bottle.isBottleBroken = true;
                bottle.playBottleBrokenAnimation(this.level.bottles, bottleIndex);
                enemy.isDead = true;
                enemy.animate(this.level.enemies, checkThrowId);
                clearInterval(checkThrowId);
            } else if (bottle.isColliding(enemy) && !bottle.proveIfBottleIsOnGround() && enemy.isDead == false && enemy instanceof Endboss) {
                debugger;
                let bottleIndex = this.level.bottles.indexOf(bottle);
                // console.log(bottleIndex);
                bottle.isBottleBroken = true;
                bottle.playBottleBrokenAnimation();
                // enemy.isDead = true;
                // enemy.animate(this.level.enemies, checkThrowId);
                clearInterval(checkThrowId);
                this.level.bottles.splice(bottleIndex, 1);
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (this.characterFallsOnEnemy(enemy) && !enemy.isDead) {
                    this.enemyIsDefeatedByJump(enemy);
                } else if (!enemy.isDead) {
                    this.character.hit();
                    this.statusbar.percentage -= 1;
                    this.statusbar.setPercentage(this.character.energy);
                }
            }
        });
    }

    characterFallsOnEnemy(enemy) {
        return this.character.speedY < 0 && this.character.y + this.character.height <= enemy.y + enemy.height * 0.5;
    }

    enemyIsDefeatedByJump(enemy) {
        enemy.isDead = true;
        enemy.animateDeadChickenWhenItGetsJumpedOn();
        this.character.bounce();
    }

    checkCollisionsWithBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.collectBottles(bottle);
                this.bottlebar.updateBottleBar(this.bottlebar.bottleAmount);
            }
        });
        this.throwableObjects.forEach(bottle => {
            if (this.character.isColliding(bottle) && !bottle.isBottleBroken && bottle.proveIfBottleIsOnGround()) {
                // console.log("Komme in diese Schleife");
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