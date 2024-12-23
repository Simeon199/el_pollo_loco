/**
 * Represents the Endboss, a subclass of Chicken, with further animations and behaviors.  The Endboss has specific attack, hurt, and dying animations and interacts with the main character.
 */

class Endboss extends Chicken {
    lastAnimationChange = 0;
    lastDirectionChangeTime = 0;
    directionChangeCooldown = 500;
    endbossHitCharacterAtTime = 0;
    speed = 0;
    mainCharacterPosition = null;
    timePassedLimit = 5;
    animateInterval = -1;
    isEndbossHurt = false;
    height = 400;
    width = 250;
    y = 55;
    offsetBottom = 0;
    offsetTop = 0;
    offsetRight = 50;
    offsetLeft = 50;
    world;

    /**
     * Constructs an Endboss instance, initializing its position, loading all images and starts the animation function.
     */

    constructor() {
        super();
        let endbossImages = new window.EndbossImages();
        this.IMAGES_WALKING_ENDBOSS = endbossImages.IMAGES_WALKING_ENDBOSS;
        this.IMAGES_HURT_ENDBOSS = endbossImages.IMAGES_HURT_ENDBOSS;
        this.IMAGES_DEAD_ENDBOSS = endbossImages.IMAGES_DEAD_ENDBOSS;
        this.IMAGES_ALERT_ENDBOSS = endbossImages.IMAGES_ALERT_ENDBOSS;
        this.IMAGES_ATTACK_ENDBOSS = endbossImages.IMAGES_ATTACK_ENDBOSS;
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        this.loadImages(this.IMAGES_WALKING_ENDBOSS);
        this.loadImages(this.IMAGES_HURT_ENDBOSS);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.loadImages(this.IMAGES_ALERT_ENDBOSS);
        this.loadImages(this.IMAGES_ATTACK_ENDBOSS);
        this.x = 1700;
        this.animate();
    }

    /**
     * Starts the animation loop for the Endboss, updating its behavior every 100ms.
     */

    animate() {
        this.animateInterval = setInterval(() => {
            if (this.wasEndbossProvokedByCharacter()) {
                this.handleAttackingEndbossAndHurtingEndbossAnimation();
            } else if (this.isCharacterToCloseToEndboss()) {
                this.playMovingEndboss();
            } else if (this.isEndbossNotFinalEnemyButDead()) {
                this.playDyingAnimationAndSetFixedDeadEndbossImage();
            } else if (this.isFinalEnemyEndbossAndIsHeDead()) {
                this.setIsDeadAttributeAndplayDyingAnimation();
            } else if (this.isEndbossAliveAndWasNotAttacked()) {
                this.playAnimation(this.IMAGES_ALERT_ENDBOSS);
            }
        }, 100);
    }

    /**
     * Plays the specified animation if enough time has passed since the last animation change.
     *
     * @param {string} animation - The name of the animation to be played.
     */

    playAnimation(animation) {
        let now = Date.now();
        if (now - this.lastAnimationChange > 1000 / 60) {
            super.playAnimation(animation);
            this.lastAnimationChange = now;
        }
    }

    /**
     * Determines if the character is too close to the endboss, either from the left or the right side.
     * 
     * @returns {boolean} - Returns `true` if the character is too close, otherwise `false`.
     */

    isCharacterToCloseToEndboss() {
        return this.isCharacterToCloseToEndbossFromTheLeft() || this.isCharacterToCloseToEndbossFromTheRight();
    }

    /**
     * Plays the movement sound for the endboss and manages its attack direction. Also checks for collisions while the endboss is moving.
     */

    playMovingEndboss() {
        this.world.audioManager.playSound('chickenSound');
        this.directEndbossIntoAttackDirectionAndCheckCollisions(this.IMAGES_WALKING_ENDBOSS);
    }

    /**
     * Determines if the end boss is in death mode based on whether it is dead and its status as the final enemy.
     * 
     * @returns {boolean} `true` if the end boss is in death mode; otherwise, `false`.
     */

    isEndbossInDeathMode() {
        if (this.isEndbossNotFinalEnemyButDead()) {
            this.playDyingAnimationAndSetFixedDeadEndbossImage();
            return true;
        } else if (this.isFinalEnemyEndbossAndIsHeDead()) {
            this.setIsDeadAttributeAndplayDyingAnimation();
            return true;
        }
        return false;
    }

    /**
     * Determines if the end boss is in idle mode, showing a walking animation if alive and unprovoked.
     * 
     * @returns {boolean} `true` if the end boss is in idle mode; otherwise, `false`.
     */

    isEndbossInIdleMode() {
        if (this.isEndbossAliveAndWasNotAttacked()) {
            this.playAnimation(this.IMAGES_ALERT_ENDBOSS);
            return true;
        }
        return false;
    }

    /**
     * Handles the attacking and hurt animation of the Endboss, playing sounds and deciding on movement.
     */

    handleAttackingEndbossAndHurtingEndbossAnimation() {
        this.world.audioManager.playSound('chickenScream');
        this.world.audioManager.playSound('chickenSound');
        if (this.checkTimeDifferenceSinceLastTimeHit() < 300) {
            this.playAnimation(this.IMAGES_HURT_ENDBOSS);
        } else {
            this.animateMovingAndAttackingEndboss();
        }
    }

    /**
     * Animates the Endboss attacking while moving.
     */

    animateMovingAndAttackingEndboss() {
        this.world.audioManager.playSound('chickenScream');
        this.world.audioManager.playSound('chickenSound');
        this.directEndbossIntoAttackDirectionAndCheckCollisions(this.IMAGES_ATTACK_ENDBOSS);
    }

    /**
     * Directs the Endboss towards the main character and checks for collisions.
     */

    directEndbossIntoAttackDirectionAndCheckCollisions(images) {
        this.checkIfEndbossAlreadyHitCharacter();
        let now = Date.now();
        let shouldChangeDirection = (now - this.lastDirectionChangeTime) > this.directionChangeCooldown;
        this.manageDirectionAndMovementOfEndboss(shouldChangeDirection, now);
        this.playAnimation(images);
    }

    /**
     * Manages the direction and movement of the endboss based on the character's position. Moves the endboss towards or away from the character and updates its direction.
     * 
     * @param {boolean} shouldChangeDirection - Indicates if the direction should be changed.
     * @param {number} now - The current timestamp for tracking the last direction change.
     */

    manageDirectionAndMovementOfEndboss(shouldChangeDirection, now) {
        if (this.isCharacterStandingLeftFromEndboss()) {
            this.x -= this.speed;
            this.manageDirectionOfEndboss(false, shouldChangeDirection, now);
        } else {
            this.x += this.speed;
            this.manageDirectionOfEndboss(true, shouldChangeDirection, now);
        }
    }

    /**
     * Updates the direction of the endboss if required and records the time of the change.
     * 
     * @param {boolean} boolean - The new direction for the endboss (`true` for right, `false` for left).
     * @param {boolean} shouldChangeDirection - Indicates if the direction should be updated.
     * @param {number} now - The current timestamp for tracking the last direction change.
     */

    manageDirectionOfEndboss(boolean, shouldChangeDirection, now) {
        if (shouldChangeDirection) {
            this.otherDirection = boolean;
            this.lastDirectionChangeTime = now;
        }
    }

    /**
     * Checks if the main character is positioned to the left of the endboss.
     * 
     * @returns {boolean} - Returns `true` if the character is standing left of the endboss, otherwise `false`.
     */

    isCharacterStandingLeftFromEndboss() {
        return this.mainCharacterPosition < this.x;
    }

    /**
     * Checks the time difference since the Endboss was last hit.
     * 
     * @returns {number} Time in milliseconds since the last hit.
     */

    checkTimeDifferenceSinceLastTimeHit() {
        return new Date().getTime() - this.lastHit;
    }

    /**
     * Determines if the Endboss was provoked by the character.
     * 
     * @returns {boolean} True if provoked, false otherwise.
     */

    wasEndbossProvokedByCharacter() {
        return this.isEndbossAliveAndFinalEnemy() || this.isEndbossAliveAndWasAttacked();
    }

    /**
     * Checks if the Endboss is alive and was attacked.
     * 
     * @returns {boolean} True if alive and attacked, false otherwise.
     */

    isEndbossAliveAndWasAttacked() {
        return this.wasEndbossHit() && this.energy > 0;
    }

    /**
     * Checks if the Endboss is not the final enemy but is dead.
     * 
     * @returns {boolean} True if not the final enemy and dead, false otherwise.
     */

    isEndbossAliveAndFinalEnemy() {
        return this.isEndbossFinalEnemy == true && this.energy > 0;
    }

    /**
     * Plays the dying animation and sets the Endboss image to a fixed dead image.
     */

    playDyingAnimationAndSetFixedDeadEndbossImage() {
        this.isDead == true;
        if (this.checkTimeDifferenceSinceLastTimeHit() < 2000) {
            this.playAnimation(this.IMAGES_DEAD_ENDBOSS);
        } else if (this.checkTimeDifferenceSinceLastTimeHit() >= 2000) {
            this.showDefeatedEndbossAndPositionCharacter();
        }
    }

    /**
     * Displays the defeated Endboss and positions the character correct.
     */

    showDefeatedEndbossAndPositionCharacter() {
        this.playAnimation(this.IMAGE_DEAD_CHICKEN);
        this.mainCharacterPosition = 100000;
        this.stopAnimateFunction();
    }

    /**
    * Checks if the Endboss is not the final enemy but is dead.
    * 
    * @returns {boolean} True if not the final enemy and dead, false otherwise.
    */

    isEndbossNotFinalEnemyButDead() {
        return this.wasEndbossHit() && this.isEndbossFinalEnemy == false && this.energy == 0;
    }

    /**
    * Checks if the Endboss is the final enemy and dead.
    * 
    * @returns {boolean} True if the final enemy and dead, false otherwise.
    */

    isFinalEnemyEndbossAndIsHeDead() {
        return this.isEndbossFinalEnemy == true && this.energy == 0;
    }

    /**
    * Checks if the Endboss is alive and was not hit.
    * 
    * @returns {boolean} True if the endboss is alive and not hit, false otherwise.
    */

    isEndbossAliveAndWasNotAttacked() {
        return this.isDead == false && this.energy > 0 && !(this.wasEndbossHit());
    }

    /**
    * Checks if the main character is too close to the Endboss from the right side.
    * 
    * @returns {boolean} True if the main character is close from the right and the Endboss is still alive, false otherwise.
    */

    isCharacterToCloseToEndbossFromTheRight() {
        return this.x - this.mainCharacterPosition && Math.abs(this.x - this.mainCharacterPosition) < 400 && this.x < this.mainCharacterPosition && this.energy > 0;
    }

    /**
    * Checks if the main character is too close to the Endboss from the left side.
    * 
    * @returns {boolean} True if the main character is close from the left and the Endboss is still alive, false otherwise.
    */

    isCharacterToCloseToEndbossFromTheLeft() {
        return this.x - this.mainCharacterPosition && Math.abs(this.x - this.mainCharacterPosition) < 400 && this.x > this.mainCharacterPosition && this.energy > 0;
    }

    /**
    * Sets the Endboss as dead and plays the dying animation.
    */

    setIsDeadAttributeAndplayDyingAnimation() {
        this.playAnimation(this.IMAGES_DEAD_ENDBOSS);
        this.isDead == true;
    }

    /**
     * Stops the Endboss animation.
     */

    stopAnimateFunction() {
        clearInterval(this.animateInterval);
    }

    /**
     * Checks if the Endboss already hit the main character and adjusts its speed.
     */

    checkIfEndbossAlreadyHitCharacter() {
        let date = new Date().getTime();
        let timeDifference = date - this.endbossHitCharacterAtTime;
        this.world.character.timeDifferenceBetweenNowAndLastHitFromEndboss = timeDifference;
        if (timeDifference < 200) {
            this.speed = 0;
        } else if (timeDifference >= 200) {
            this.speed = 5;
        }
    }

    /**
     * Updates the Endboss direction based on the main character's position.
     */

    updateEndbossDirection() {
        if (this.mainCharacterPosition < this.x) {
            this.otherDirection = false;
        } else {
            this.otherDirection = true;
        }
    }

    /**
    * Checks if the Endboss is hurt and if the last hit occurred at the initial state (time equals zero).
    * 
    * @returns {boolean} True if the Endboss is hurt and the last hit was at the initial time (0), false otherwise.
    */

    isEndbossHurtAndLastHitEqualsZero() {
        return this.isEndbossHurt && this.lastHit === 0;
    }

    /**
    * Checks if the Endboss is hurt and if the time passed since the last hit is below the defined time limit.
    * 
    * @returns {boolean} True if the Endboss is hurt and the time since the last hit is less than the time limit, false otherwise.
    */

    isEndbossHurtAndTimeSinceLastHitIsBelowTimeLimit() {
        return this.isEndbossHurt && (new Date().getTime() - this.lastHit < this.timePassedLimit * 1000);
    }

    /**
    * Checks if the time passed since the Endboss was last hit exceeds the defined time limit.
    * 
    * @returns {boolean} True if the time since the last hit is greater than or equal to the time limit, false otherwise.
    */

    isEndbossHurtAndTimeSinceLastHitExceedsTimeLimit() {
        return new Date().getTime() - this.lastHit >= this.timePassedLimit * 1000;
    }

    /**
    * Resets the state of the Endboss to indicate that it is no longer hurt. It also resets the `lastHit` property to 0.
    */

    setEndbossIsNotHurtAnymore() {
        this.isEndbossHurt = false;
        this.lastHit = 0;
    }

    /**
    * Records the current time as the last time the Endboss was hit.
    */

    getLastHitTime() {
        this.lastHit = new Date().getTime();
    }

    /**
     * Returns whether the Endboss was hit and handles the hit state.
     * 
     * @returns {boolean} True if the Endboss was hit, false otherwise.
     */

    wasEndbossHit() {
        if (this.isEndbossHurtAndLastHitEqualsZero()) {
            this.getLastHitTime();
        } else if (this.isEndbossHurtAndTimeSinceLastHitIsBelowTimeLimit()) {
            return true;
        } else if (this.isEndbossHurtAndTimeSinceLastHitExceedsTimeLimit()) {
            this.setEndbossIsNotHurtAnymore();
        }
        return false;
    }
}