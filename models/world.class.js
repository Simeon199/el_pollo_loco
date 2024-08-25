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

    // Mögliche Idee zum Festhalten: Versuche die isCollison()-Methode auf die Chicken Class auszuweiten beziehungsweise dort zu implementieren.

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
            this.checkThrowObjects();
            this.checkCollisionsWithBottles();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.keyD && this.bottlebar.bottlesCollected > 0) {
            this.bottlebar.bottlesCollected -= 1;
            this.bottlebar.updateBottleBar(this.bottlebar.bottleAmount);
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.keyboard);
            this.throwableObjects.push(bottle);
            console.log("Value returned by the function:", this.checkCollisionBottleWithEnemy(bottle));
            if (this.checkCollisionBottleWithEnemy(bottle) == true) {
                console.log("This if-statement is being executed");
                bottle.playAnimation(bottle.BOTTLE_BROKEN_IMAGES);
            } else {
                console.log("If-Statement wasn't executed as expected!");
            }
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.percentage -= 5;
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionBottleWithEnemy(bottle) {
        let result_array = [];
        // this.level.enemies.forEach(enemy => {
        //     result_array.push(bottle.isCollidingFunctionTwo(enemy, bottle));
        // });
        // return result_array;
        this.level.enemies.forEach(enemy => {
            result_array.push(bottle.isColliding(enemy));
        });
        return result_array;
    }

    checkCollisionsWithBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.collectBottles(bottle);
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
}