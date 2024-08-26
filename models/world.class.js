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
            this.level.enemies.forEach(enemy => {
                debugger;
                if (this.checkCollisionEnemyWithBottle(bottle, enemy) == true) { // Warum wird in meinem Code diese If-Abfrage nie true --> debugger
                    console.log("This if-statement was finally executed!");
                    bottle.playAnimation(bottle.BOTTLE_BROKEN_IMAGES);
                } else {
                    console.log("Unfortunately the expected if-Statement wasn't executed");
                }
            });
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.percentage -= 1;
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionEnemyWithBottle(bottle, enemy) {

        // Bounding Box für das zu werfende Objekt, also für die Flasche

        let bottleLeft = bottle.x;
        let bottleRight = bottle.x + bottle.width;
        let bottleTop = bottle.y;
        let bottleBottom = bottle.y + bottle.height;

        // Bounding Box für den Gegner

        let enemyLeft = enemy.x;
        let enemyRight = enemy.x + enemy.width;
        let enemyTop = enemy.y;
        let enemyBottom = enemy.y + enemy.height;


        // Bedingungen, die für eine Kollision zu erfüllen sind:

        if ((bottleRight >= enemyLeft)
            && (bottleLeft <= enemyRight)
            && (bottleBottom >= enemyTop)
            && (bottleTop <= enemyBottom)) {
            return true;
        }
        return false;
    }



    // checkCollisionBottleWithEnemy(bottle) {
    //     let result_array = [];
    //     this.level.enemies.forEach(enemy => {
    //         result_array.push(bottle.isColliding(enemy));
    //     });
    //     return result_array;
    // }

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