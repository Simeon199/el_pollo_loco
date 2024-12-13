/**
 * World class represents the main game world, managing game elements like character, status bars, enemies, and audio.
 */

class World {
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
    utilityClass;
    camera_x = 0;
    throwableObjects = [];
    hasGameStarted = false;
    isGameOver = false;
    enemiesNumber = this.level.enemies.length;
    timePointWhenCharacterGetsHit = 0;

    /**
     * Constructor of the World class. Initializes the game canvas, level, audio, and game elements.
     * 
     * @param {HTMLCanvasElement} canvas - The HTML canvas element to render the game world on.
     * @param {object} keyboard - The keyboard input object to control the game character.
     */

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.audioManager = new AudioManager();
        this.level = new Level(new Keyboard(), generateEnemies(), generateCloud(), generateBackgroundArray(), generateRandomBottles(), generateCoinsArray());
        this.draw();
        this.setWorld();
        this.utilityClass = new Utility(this);
        this.bottlebar.bottleAmount = this.level.bottles.length;
        this.run();
    }

    /**
     * Runs the main game loop, checking collisions, throwable objects, enemy movement, and playing background music. The loop runs at intervals of 100 ms.
     */

    run() {
        if (this.runInterval) {
            clearInterval(this.runInterval);
        }
        this.runInterval = setInterval(() => {
            this.utilityClass.playUtilityFunctions();
            this.checkIfAllEnemiesAreDeadExceptTheEndboss();
            this.audioManager.playBackgroundMusic();
        }, 100); // 100
    }

    /**
     * Sets references to the game world in different game elements like the character, enemies, status bars, and level.
     */

    setWorld() {
        this.character.world = this;
        this.bottlebar.world = this;
        this.endbossbar.world = this;
        this.coinbar.world = this;
        this.level.world = this;
        this.audioManager.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
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
    * Adjusts the coin bar when the character collects a coin. Updates the coin bar percentage based on the remaining number of coins in the game.
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
    * Checks if a bottle is flying and hits the Endboss. Ensures the Endboss is alive and the bottle is not on the ground.
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
        return this.characterFallsOnEnemy(enemy) && this.character.isAboveGround() && !enemy.isDead && !(enemy instanceof Endboss);
    }

    /**
    * Handles cases when the character is hit by an enemy. Determines if the enemy is defeated by being jumped on, or if the character takes damage.
    * 
    * @param {Object} enemy - The enemy that collides with the character.
    */

    checkCasesThatCanOccurWhenCharacterGetsHit(enemy) {
        if (this.isEnemyChickenAndGetsJumpedOnByCharacter(enemy)) {
            this.enemyIsDefeatedByJump(enemy);
            return;
        }
        else if (this.isEnemyAliveEndbossOrCharacterOnGround(enemy)) {
            if (this.characterLacksProtection() && !enemy.isDead && !this.character.isDead()) {
                this.applyKnockback(enemy);
                this.adjustStatusBarWhenCharacterGetsHit();
                this.audioManager.playSound('punchAndOuch');
            }
        }
    }

    /**
     * Checks if the enemy is alive and if either the character is on the ground or the enemy is an Endboss.
     * 
     * @param {Object} enemy - The enemy object to check.
     * @returns {boolean} `true` if the enemy is alive and the character is on the ground or the enemy is an Endboss; otherwise, `false`.
     */

    isEnemyAliveEndbossOrCharacterOnGround(enemy) {
        return this.enemyIsAlive && (!this.character.isAboveGround() || enemy instanceof Endboss);
    }

    /**
     * Determines whether the specified enemy is alive.
     * 
     * @param {Object} enemy - The enemy object to check.
     * @returns {boolean} `true` if the enemy is alive (not dead); otherwise, `false`.
     */

    enemyIsAlive(enemy) {
        return !enemy.isDead;
    }

    /**
    * Checks if the character falls on an enemy, which can result in the enemy's defeat.
    * 
    * @param {Object} enemy - The enemy that the character may fall on.
    * @returns {boolean} - Returns true if the character falls on the enemy.
    */

    characterFallsOnEnemy(enemy) {
        let toleranceY = 0;
        return this.character.y + this.character.height >= enemy.y + toleranceY &&
            this.character.y + this.character.height > enemy.y;
    }

    /**
     * This function evaluates whether the character is currently not hurt 
     * and is not enjoying temporary protection after being hurt.
     * 
     * @returns {boolean} `true` if the character is not hurt and does not have protection; otherwise, `false`.
     */

    characterLacksProtection() {
        return !this.character.isHurt() && !this.character.characterGotHurtButEnjoysProtection();
    }

    /**
    * Adjusts the status bar when the character gets hit. Decreases the character's energy and updates the status bar's percentage.
    */

    adjustStatusBarWhenCharacterGetsHit() {
        this.character.hit();
        this.timePointWhenCharacterGetsHit = new Date().getTime();
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
    * Sets variables related to the Endboss when the character is knocked back. Marks the Endboss as having hit the character and stores the time of the hit.
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
        return -this.level.level_end_x + 200 <= newXPosition && newXPosition <= this.level.level_end_x + 200;
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
    * Sets an interval to apply knockback movement to the character. Moves the character by the knockback speed until the total knockback distance is reached.
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
        }, 50);
    }

    /**
    * Applies knockback to the character when hit by an enemy. The knockback speed and distance are determined, and the knockback interval is set.
    * 
    * @param {Object} enemy - The enemy that hits the character.
    */

    applyKnockback(enemy) {
        if (this.isEnemyEndboss(enemy)) {
            this.setEndbossVariablesForKnockbackOfCharacter(enemy);
        }
        this.setVariablesAndKnockBackInterval(enemy);
        this.character.isAttacked = true;
    }

    setVariablesAndKnockBackInterval(enemy) {
        let knockbackDistance = 100;
        let knockbackSpeed = 15;
        if (enemy instanceof Endboss) {
            knockbackDistance = 200;
            knockbackSpeed = 20;
        }
        let direction = this.character.x < enemy.x ? -1 : 1;
        let distanceMoved = 0;
        this.setKnockBackInterval(knockbackDistance, knockbackSpeed, direction, distanceMoved);
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
        this.audioManager.playSound('hit');
    }

    /**
    * Draws the game objects and background on the canvas. Clears the previous frame, translates the camera position, and adds all objects to the map.
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
    * Adds a single object to the canvas. If the object is facing the other direction, its image is flipped before drawing.
    * 
    * @param {Object} mo - The game object to add to the canvas.
    */

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * Flips the image of a game object horizontally. Used when the object is facing the opposite direction.
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