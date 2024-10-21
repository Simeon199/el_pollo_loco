/**
 * World class represents the main game world, managing game elements like character, status bars, enemies, and audio.
 */

class World {
    // Game-related properties and objects
    runInterval = null;
    character = new Character();
    statusbar = new StatusBar();
    bottlebar = new BottleBar();
    endbossbar = new EndbossBar();
    coinbar = new CoinBar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    hasGameStarted = false;
    isGameOver = false;
    enemiesNumber = this.level.enemies.length;

    // Audio-related properties

    punchAndOuch = new Audio('audio/punch_and_ouch1.mp3');
    bottleHit = new Audio('audio/bottle_hit.mp3');
    hit = new Audio('audio/hit3.mp3');
    backgroundMusic = new Audio('audio/laCucaracha.mp3');
    loadingSound = new Audio('audio/loadingSound.mp3');
    bellSound = new Audio('audio/bellSound.mp3');

    /**
     * Constructor of the World class.
     * Initializes the game canvas, level, audio, and game elements.
     * 
     * @param {HTMLCanvasElement} canvas - The HTML canvas element to render the game world on.
     * @param {object} keyboard - The keyboard input object to control the game character.
     */

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = new Level(new Keyboard(), generateEnemies(), generateCloud(), generateBackgroundArray(), generateRandomBottles(), generateCoinsArray());
        this.draw();
        this.setWorld();
        this.bottlebar.bottleAmount = this.level.bottles.length;
        this.backgroundMusic.volume = 0.25;
        this.run();
    }

    /**
     * Resets the game state, restoring character, status bars, enemies, and other elements to their initial state.
     */

    reset() {
        this.character = new Character();
        this.statusbar = new StatusBar();
        this.bottlebar = new BottleBar();
        this.endbossbar = new EndbossBar();
        this.coinbar = new CoinBar();
        this.level = new Level(new Keyboard(), generateEnemies(), generateCloud(), generateBackgroundArray(), generateRandomBottles(), generateCoinsArray());
        this.enemiesNumber = this.level.enemies.length;
        this.throwableObjects = [];
        this.camera_x = 0;
        this.setWorld();
        this.bottlebar.bottleAmount = this.level.bottles.length;
        clearInterval(this.runInterval);
        this.run();
    }

    /**
     * Runs the main game loop, checking collisions, throwable objects, enemy movement, and playing background music.
     * The loop runs at intervals of 100 ms.
     */

    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsWithBottles();
            this.checkThrowObjects();
            this.checkThrowableObjectsCollision();
            this.calibrateDistanceBetweenCharacterAndEndboss();
            this.checkIfAllEnemiesAreDeadExceptTheEndboss();
            this.backgroundMusic.play();
            this.checkMovingDirectionOfEnemies();
        }, 100);
    }

    /**
     * Sets references to the game world in different game elements like the character, status bars, and level.
     */

    setWorld() {
        this.character.world = this;
        this.bottlebar.world = this;
        this.endbossbar.world = this;
        this.coinbar.world = this;
        this.level.world = this;
    }

    /**
     * Checks and adjusts the movement direction of enemies based on their position in the game world.
     * Applied only to chickens, adjusting their movement if they go beyond certain bounds.
     */

    checkMovingDirectionOfEnemies() {
        this.level.enemies.forEach(enemy => {
            if (!(enemy instanceof Endboss) && (enemy instanceof Chicken)) {
                if (enemy.x <= -500) {
                    enemy.movingDirection = 'right';
                    enemy.otherDirection = true;
                } else if (enemy.x >= 500) {
                    enemy.otherDirection = false;
                    enemy.movingDirection = 'left';
                }
            }
        });
    }

    /**
     * Updates the position of the Endboss based on the main character's position, if the Endboss is still alive.
     */

    calibrateDistanceBetweenCharacterAndEndboss() {
        if (this.level.enemies[this.level.enemies.length - 1].isDead == false) {
            this.level.enemies[this.level.enemies.length - 1].mainCharacterPosition = this.character.x;
        }
    }

    /**
     * Checks if all enemies except the Endboss are dead. If so, sets the Endboss as the final enemy.
     */

    checkIfAllEnemiesAreDeadExceptTheEndboss() {
        if (this.enemiesNumber == 1) {
            this.level.enemies.forEach(enemy => {
                if (enemy.isDead == false) {
                    enemy.isEndbossFinalEnemy = true;
                }
            });
        }
    }

    /**
     * Checks for collisions between the character and enemies or collectible coins.
     * Calls relevant functions when a collision is detected.
     */

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.checkCasesThatCanOccurWhenCharacterGetsHit(enemy);
            }
        });
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.collectCoins(coin);
            }
        });
    }

    /**
     * Handles the logic for collecting coins, removing the coin from the game world,
     * updating the coin bar and energy of the character.
     * 
     * @param {Object} coin - The coin object that was collected.
     */

    collectCoins(coin) {
        let index = this.level.coins.indexOf(coin);
        coin.img.scr = '';
        this.adjustCoinbarWhenCharacterCollectsCoin();
        this.level.coins.splice(index, 1);
        if (this.character.energy <= 95) {
            this.character.energy += 5;
            this.adjustStatusBarWhenCharacterGetsCoin();
        }
        this.bellSound.play();
    }

    /**
     * Adjusts the status bar when the character collects a coin, increasing the percentage of energy displayed.
     */

    adjustStatusBarWhenCharacterGetsCoin() {
        this.statusbar.percentage += 5;
        this.statusbar.setPercentage(this.character.energy);
    }

    /**
    * Adjusts the coin bar when the character collects a coin.
    * Updates the coin bar percentage based on the remaining number of coins in the game.
    */

    adjustCoinbarWhenCharacterCollectsCoin() {
        this.coinbar.percentage += (1 / (this.level.coins.length)) * 100;
        if (this.level.coins.length <= 1) {
            this.coinbar.setPercentage(100, this.coinbar.COIN_BAR_IMAGES);
        } else {
            this.coinbar.setPercentage(this.coinbar.percentage, this.coinbar.COIN_BAR_IMAGES);
        }
    }

    /**
    * Checks for collisions between the character and bottles, both stationary and throwable.
    * When a collision is detected, bottles are collected and the bottle bar is updated.
    */

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

    /**
    * Collects a bottle from the game world and removes it from the bottle array.
    * Updates the number of collected bottles and plays a sound effect.
    * 
    * @param {Object} bottle - The bottle object that the character collects.
    */

    collectBottles(bottle) {
        let index = this.level.bottles.indexOf(bottle);
        this.bottlebar.bottlesCollected += 1;
        this.level.bottles.splice(index, 1);
        this.loadingSound.play();
    }

    /**
    * Collects a throwable bottle that is on the ground.
    * Removes the bottle from the throwable objects array and adds it to the game world bottle array.
    * 
    * @param {Object} bottle - The bottle object that the character collects from the ground.
    */

    collectGroundBottles(bottle) {
        let index = this.throwableObjects.indexOf(bottle);
        this.bottlebar.bottlesCollected += 1;
        bottle.img.scr = '';
        this.level.bottles.push(this.throwableObjects[index]);
        this.throwableObjects.splice(index, 1);
    }

    /**
    * Checks if the character throws a bottle and updates the bottle bar correct.
    * When a bottle is thrown, it is added to the throwable objects array.
    */

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

    /**
    * Checks for collisions between throwable bottles and enemies.
    * If a collision is detected, the bottle's interaction with the enemy is handled.
    */

    checkThrowableObjectsCollision() {
        this.throwableObjects.forEach(bottle => {
            this.proveIfBottleIsCollidingWithEnemy(bottle);
        })
    }

    /**
    * Determines if a throwable bottle is colliding with an enemy.
    * If a collision occurs, the appropriate action is taken based on the enemy type.
    * 
    * @param {Object} bottle - The thrown bottle object.
    * @returns {boolean} - Returns true if the bottle collides with an enemy.
    */

    proveIfBottleIsCollidingWithEnemy(bottle) {
        this.level.enemies.forEach(enemy => {
            if (bottle.isColliding(enemy)) {
                this.enemyEitherDiesOrGetsHurt(enemy, bottle);
                return true;
            }
        });
    }

    /**
    * Handles the behavior when a bottle hits an enemy.
    * Determines if the enemy is killed or hurt based on its type (e.g., Endboss or regular enemy).
    * 
    * @param {Object} enemy - The enemy that is hit by the bottle.
    * @param {Object} bottle - The thrown bottle object.
    */

    enemyEitherDiesOrGetsHurt(enemy, bottle) {
        if (this.isBottleFlyingAndEnemyNotEndboss(bottle, enemy)) {
            this.executeFunctionsToAnimateDyingEnemy(bottle, enemy);
        } else if (this.isBottleFlyingAndEnemyIsEndboss(bottle, enemy)) {
            this.executeFunctionsToAnimateHurtOrDeadEndboss(bottle, enemy);
        }
    }

    /**
    * Animates the death of a regular enemy when hit by a bottle.
    * Marks the bottle as broken, sets the enemy as dead, and decreases the number of enemies.
    * 
    * @param {Object} bottle - The thrown bottle object.
    * @param {Object} enemy - The enemy that is hit and killed.
    */

    executeFunctionsToAnimateDyingEnemy(bottle, enemy) {
        if (!(enemy instanceof Endboss) && enemy instanceof Chicken) {
            bottle.isBottleBroken = true;
            enemy.isDead = true;
            this.enemiesNumber -= 1;
            enemy.animate(this.level.enemies);
            bottle.playBottleBrokenAnimation();
            this.bottleHit.play();
        }
    }

    /**
    * Animates the Endboss when it is hurt but still alive after being hit by a bottle.
    * Reduces the Endboss' energy and updates the Endboss' health bar.
    * 
    * @param {Object} enemy - The Endboss that is hit but still alive.
    */

    animateHurtButStillAliveEndboss(enemy) {
        this.endbossbar.percentage -= 5;
        this.endbossbar.setPercentage(enemy.energy, this.endbossbar.IMAGES_DEAD_ENDBOSS);
        this.bottleHit.play();
    }

    /**
    * Prepares the variables and state for animating the Endboss' death.
    * Marks the Endboss as dead and reduces the number of enemies.
    * 
    * @param {Object} enemy - The Endboss that is killed.
    */

    setVariablesToPrepareDyingEndbossAnimation(enemy) {
        enemy.isDead = true;
        enemy.spliceable = true;
        enemy.enemiesArray = this.level.enemies;
        this.enemiesNumber -= 1;
    }

    /**
    * Animates the Endboss either being hurt or killed depending on its energy level after being hit by a bottle.
    * 
    * @param {Object} bottle - The thrown bottle object.
    * @param {Object} enemy - The Endboss that is hit by the bottle.
    */

    executeFunctionsToAnimateHurtOrDeadEndboss(bottle, enemy) {
        bottle.isBottleBroken = true;
        enemy.isEndbossHurt = true;
        bottle.playBottleBrokenAnimation();
        enemy.hit();
        if (this.isEndbossAlive(enemy)) {
            this.animateHurtButStillAliveEndboss(enemy);
        } else if (this.isEndbossDead(enemy)) {
            this.setVariablesToPrepareDyingEndbossAnimation(enemy);
        }
    }

    /**
    * Checks if the Endboss is still alive based on its energy level.
    * 
    * @param {Object} enemy - The Endboss whose life status is being checked.
    * @returns {boolean} - Returns true if the Endboss is still alive.
    */

    isEndbossAlive(enemy) {
        return enemy.energy > 0;
    }

    /**
    * Checks if the Endboss is dead based on its energy level.
    * 
    * @param {Object} enemy - The Endboss whose life status is being checked.
    * @returns {boolean} - Returns true if the Endboss is dead.
    */

    isEndbossDead(enemy) {
        return enemy.energy == 0;
    }

    /**
    * Checks if a bottle is flying and hits the Endboss.
    * Ensures the Endboss is alive and the bottle is not on the ground.
    * 
    * @param {Object} bottle - The thrown bottle object.
    * @param {Object} enemy - The Endboss.
    * @returns {boolean} - Returns true if the bottle is flying and hits the Endboss.
    */

    isBottleFlyingAndEnemyIsEndboss(bottle, enemy) {
        return bottle.proveIfBottleIsOnGround() == false && enemy.isDead == false && enemy instanceof Endboss;
    }

    /**
    * Checks if a bottle is flying and hits a regular enemy (not the Endboss).
    * 
    * @param {Object} bottle - The thrown bottle object.
    * @param {Object} enemy - The regular enemy.
    * @returns {boolean} - Returns true if the bottle is flying and hits a regular enemy.
    */

    isBottleFlyingAndEnemyNotEndboss(bottle, enemy) {
        return bottle.proveIfBottleIsOnGround() == false && enemy.isDead == false && !(enemy instanceof Endboss);
    }

    /**
    * Checks if the character jumps on an enemy (like a Chicken) and defeats it.
    * 
    * @param {Object} enemy - The enemy that may be jumped on by the character.
    * @returns {boolean} - Returns true if the character jumps on the enemy and defeats it.
    */

    isEnemyChickenAndGetsJumpedOnByCharacter(enemy) {
        return this.characterFallsOnEnemy(enemy) && !enemy.isDead && !(enemy instanceof Endboss);
    }

    /**
    * Handles cases when the character is hit by an enemy.
    * Determines if the enemy is defeated by being jumped on, or if the character takes damage.
    * 
    * @param {Object} enemy - The enemy that collides with the character.
    */

    checkCasesThatCanOccurWhenCharacterGetsHit(enemy) {
        if (this.isEnemyChickenAndGetsJumpedOnByCharacter(enemy)) {
            this.enemyIsDefeatedByJump(enemy);
        } else if (!enemy.isDead) {
            this.adjustStatusBarWhenCharacterGetsHit();
            this.applyKnockback(enemy);
            this.punchAndOuch.play();
        }
    }

    /**
    * Adjusts the status bar when the character gets hit.
    * Decreases the character's energy and updates the status bar's percentage.
    */

    adjustStatusBarWhenCharacterGetsHit() {
        this.character.hit();
        this.statusbar.percentage -= 5;
        this.statusbar.setPercentage(this.character.energy);
    }

    /**
    * Checks if the given enemy is the Endboss.
    * 
    * @param {Object} enemy - The enemy object to check.
    * @returns {boolean} - Returns true if the enemy is an instance of Endboss.
    */

    isEnemyEndboss(enemy) {
        return enemy instanceof Endboss;
    }

    /**
    * Sets variables related to the Endboss when the character is knocked back.
    * Marks the Endboss as having hit the character and stores the time of the hit.
    * 
    * @param {Object} enemy - The Endboss that hits the character.
    */

    setEndbossVariablesForKnockbackOfCharacter(enemy) {
        enemy.endbossHitCharacter = true;
        enemy.endbossHitCharacterAtTime = new Date().getTime();
    }

    /**
    * Checks if the character's new X position is not at the edge of the canvas.
    * 
    * @param {number} newXPosition - The new X position of the character.
    * @returns {boolean} - Returns true if the new X position is within the canvas boundaries.
    */

    isNewCharacterPositionNotAtTheEdgeOfCanvas(newXPosition) {
        return -this.level.level_end_x + 100 <= newXPosition && newXPosition <= this.level.level_end_x + 100;
    }

    /**
    * Checks if the character has not yet moved the full knockback distance.
    * 
    * @param {number} distanceMoved - The distance the character has already moved.
    * @param {number} knockbackDistance - The total distance of the knockback.
    * @returns {boolean} - Returns true if the character has moved less than the knockback distance.
    */

    isDistanceMovedSmallerThanKnockbackDistance(distanceMoved, knockbackDistance) {
        return distanceMoved < knockbackDistance;
    }

    /**
    * Sets an interval to apply knockback movement to the character.
    * Moves the character by the knockback speed until the total knockback distance is reached.
    * 
    * @param {number} knockbackDistance - The total distance of the knockback.
    * @param {number} knockbackSpeed - The speed at which the character is knocked back.
    * @param {number} direction - The direction of the knockback (-1 for left, 1 for right).
    * @param {number} distanceMoved - The distance the character has already moved.
    */

    setKnockBackInterval(knockbackDistance, knockbackSpeed, direction, distanceMoved) {
        let knockbackInterval = setInterval(() => {
            let newXPosition = this.character.x + direction * knockbackSpeed;
            if (this.isNewCharacterPositionNotAtTheEdgeOfCanvas(newXPosition)) {
                if (this.isDistanceMovedSmallerThanKnockbackDistance(distanceMoved, knockbackDistance)) {
                    this.character.x = newXPosition;
                    distanceMoved += knockbackSpeed;
                    return;
                } else {
                    clearInterval(knockbackInterval);
                }
            }
            clearInterval(knockbackInterval);
        }, 1000 / 60);
    }

    /**
    * Applies knockback to the character when hit by an enemy.
    * The knockback speed and distance are determined, and the knockback interval is set.
    * 
    * @param {Object} enemy - The enemy that hits the character.
    */

    applyKnockback(enemy) {
        if (this.isEnemyEndboss(enemy)) {
            this.setEndbossVariablesForKnockbackOfCharacter(enemy);
        }
        let knockbackDistance = 100;
        let knockbackSpeed = 5;
        let direction = this.character.x < enemy.x ? -1 : 1;
        let distanceMoved = 0;
        this.setKnockBackInterval(knockbackDistance, knockbackSpeed, direction, distanceMoved);
    }

    /**
    * Checks if the character falls on an enemy, which can result in the enemy's defeat.
    * 
    * @param {Object} enemy - The enemy that the character may fall on.
    * @returns {boolean} - Returns true if the character falls on the enemy.
    */

    characterFallsOnEnemy(enemy) {
        return this.character.speedY < 0 &&
            this.character.y + this.character.height <= enemy.y + enemy.height * 0.75 &&
            this.character.y + this.character.height > enemy.y;
    }

    /**
    * Defeats an enemy by jumping on it. Marks the enemy as dead, removes it from the enemy count, and animates its death.
    * 
    * @param {Object} enemy - The enemy that is defeated by the character.
    */

    enemyIsDefeatedByJump(enemy) {
        enemy.isDead = true;
        this.enemiesNumber -= 1;
        enemy.animateDeadChickenWhenItGetsJumpedOn();
        this.character.bounce();
        this.hit.play();
    }

    /**
    * Draws the game objects and background on the canvas.
    * Clears the previous frame, translates the camera position, and adds all objects to the map.
    */

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

    /**
    * Adds the main game objects to the canvas, including the character, enemies, and environment elements.
    */

    addMainObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
    }

    /**
    * Adds all status bars (e.g., health, bottles, Endboss health, coins) to the canvas.
    */

    addAllStatusBarsToMap() {
        this.addToMap(this.statusbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.endbossbar);
        this.addToMap(this.coinbar);
    }

    /**
    * Adds a group of objects to the canvas by iterating over an array of objects.
    * 
    * @param {Array<Object>} objects - The array of game objects to be added to the canvas.
    */

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
    * Adds a single object to the canvas.
    * If the object is facing the other direction, its image is flipped before drawing.
    * 
    * @param {Object} mo - The game object to add to the canvas.
    */

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * Flips the image of a game object horizontally.
    * Used when the object is facing the opposite direction.
    * 
    * @param {Object} mo - The game object whose image will be flipped.
    */

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the image of a game object to its original orientation after being flipped.
    * 
    * @param {Object} mo - The game object whose image will be restored.
    */

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}