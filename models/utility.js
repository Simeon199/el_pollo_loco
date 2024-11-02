class Utility {
    world;

    constructor(world) {
        this.world = world;
    }

    playUtilityFunctions() {
        this.checkCollisions();
        this.checkCollisionsWithBottles();
        this.checkThrowObjects();
        this.checkThrowableObjectsCollision();
        this.calibrateDistanceBetweenCharacterAndEndboss();
        this.checkMovingDirectionOfEnemies();
    }

    /**
     * Checks and adjusts the movement direction of enemies based on their position in the game world.
     * Applied only to chickens, adjusting their movement if they go beyond certain bounds.
     */

    checkMovingDirectionOfEnemies() {
        this.world.level.enemies.forEach(enemy => {
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
        if (this.world.level.enemies[this.world.level.enemies.length - 1].isDead == false) {
            this.world.level.enemies[this.world.level.enemies.length - 1].mainCharacterPosition = this.world.character.x;
        }
    }

    /**
     * Checks for collisions between the character and enemies or collectible coins.
     * Calls relevant functions when a collision is detected.
     */

    checkCollisions() {
        this.world.level.enemies.forEach(enemy => {
            if (this.world.character.isColliding(enemy)) {
                this.world.checkCasesThatCanOccurWhenCharacterGetsHit(enemy);
            }
        });
        this.world.level.coins.forEach(coin => {
            if (this.world.character.isColliding(coin)) {
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
        let index = this.world.level.coins.indexOf(coin);
        coin.img.scr = '';
        this.world.adjustCoinbarWhenCharacterCollectsCoin();
        this.world.level.coins.splice(index, 1);
        if (this.world.character.energy <= 95) {
            this.world.character.energy += 5;
            this.adjustStatusBarWhenCharacterGetsCoin();
        }
        this.world.bellSound.play();
    }

    /**
    * Checks for collisions between the character and bottles, both stationary and throwable.
    * When a collision is detected, bottles are collected and the bottle bar is updated.
    */

    checkCollisionsWithBottles() {
        this.world.level.bottles.forEach(bottle => {
            if (this.world.character.isColliding(bottle)) {
                this.collectBottles(bottle);
                this.world.bottlebar.updateBottleBar(this.world.bottlebar.bottleAmount);
            }
        });
        this.world.throwableObjects.forEach(bottle => {
            if (this.world.character.isColliding(bottle) && !bottle.isBottleBroken && bottle.proveIfBottleIsOnGround()) {
                this.collectGroundBottles(bottle);
                this.world.bottlebar.updateBottleBar(this.world.bottlebar.bottleAmount);
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
        let index = this.world.level.bottles.indexOf(bottle);
        this.world.bottlebar.bottlesCollected += 1;
        this.world.level.bottles.splice(index, 1);
        this.world.loadingSound.play();
    }

    /**
    * Collects a throwable bottle that is on the ground.
    * Removes the bottle from the throwable objects array and adds it to the game world bottle array.
    * 
    * @param {Object} bottle - The bottle object that the character collects from the ground.
    */

    collectGroundBottles(bottle) {
        let index = this.world.throwableObjects.indexOf(bottle);
        this.world.bottlebar.bottlesCollected += 1;
        bottle.img.scr = '';
        this.world.level.bottles.push(this.world.throwableObjects[index]);
        this.world.throwableObjects.splice(index, 1);
    }

    /**
    * Checks if the character throws a bottle and updates the bottle bar correct.
    * When a bottle is thrown, it is added to the throwable objects array.
    */

    checkThrowObjects() {
        if (this.world.keyboard.keyD && this.world.bottlebar.bottlesCollected > 0) {
            this.world.bottlebar.bottlesCollected -= 1;
            this.world.bottlebar.updateBottleBar(this.world.bottlebar.bottleAmount);
            let bottle = new ThrowableObject(this.world.character.x + 100, this.world.character.y + 100, this.world.keyboard);
            this.world.throwableObjects.push(bottle);
            bottle.throwObjectsArray = this.world.throwableObjects;
            bottle.throw();
        }
    }

    /**
    * Checks for collisions between throwable bottles and enemies.
    * If a collision is detected, the bottle's interaction with the enemy is handled.
    */

    checkThrowableObjectsCollision() {
        this.world.throwableObjects.forEach(bottle => {
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
        this.world.level.enemies.forEach(enemy => {
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
        if (this.world.isBottleFlyingAndEnemyNotEndboss(bottle, enemy)) {
            this.executeFunctionsToAnimateDyingEnemy(bottle, enemy);
        } else if (this.world.isBottleFlyingAndEnemyIsEndboss(bottle, enemy)) {
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
            this.world.enemiesNumber -= 1;
            enemy.animate(this.world.level.enemies);
            bottle.playBottleBrokenAnimation();
            this.world.bottleHit.play();
        }
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
    * Animates the Endboss when it is hurt but still alive after being hit by a bottle.
    * Reduces the Endboss' energy and updates the Endboss' health bar.
    * 
    * @param {Object} enemy - The Endboss that is hit but still alive.
    */

    animateHurtButStillAliveEndboss(enemy) {
        this.world.endbossbar.percentage -= 5;
        this.world.endbossbar.setPercentage(enemy.energy, this.world.endbossbar.IMAGES_DEAD_ENDBOSS);
        this.world.bottleHit.play();
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
        enemy.enemiesArray = this.world.level.enemies;
        this.world.enemiesNumber -= 1;
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
     * Adjusts the status bar when the character collects a coin, increasing the percentage of energy displayed.
     */

    adjustStatusBarWhenCharacterGetsCoin() {
        this.world.statusbar.percentage += 5;
        this.world.statusbar.setPercentage(this.world.character.energy);
    }
}