/**
 * Represents the Endboss, a subclass of Chicken, with further animations and behaviors.  The Endboss has specific attack, hurt, and dying animations and interacts with the main character.
 */

class Endboss extends Chicken {
    endbossHitCharacter = false;
    endbossHitCharacterAtTime = 0;
    endbossSpeedX = 20;
    mainCharacterPosition = null;
    hurtAnimationEnd = 0;
    timePassedLimit = 5;
    animateInterval = -1;
    isEndbossHurt = false;
    height = 400;
    width = 250;
    y = 55;
    world;

    IMAGES_WALKING = ['img/4_enemie_boss_chicken/2_alert/G5.png', 'img/4_enemie_boss_chicken/2_alert/G7.png', 'img/4_enemie_boss_chicken/2_alert/G8.png', 'img/4_enemie_boss_chicken/2_alert/G9.png', 'img/4_enemie_boss_chicken/2_alert/G10.png', 'img/4_enemie_boss_chicken/2_alert/G11.png', 'img/4_enemie_boss_chicken/2_alert/G12.png'];

    IMAGES_HURT = ['img/4_enemie_boss_chicken/4_hurt/G21.png', 'img/4_enemie_boss_chicken/4_hurt/G22.png', 'img/4_enemie_boss_chicken/4_hurt/G23.png'];

    IMAGES_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png', 'img/4_enemie_boss_chicken/5_dead/G25.png', 'img/4_enemie_boss_chicken/5_dead/G26.png'];

    IMAGES_ATTACK = ['img/4_enemie_boss_chicken/3_attack/G13.png', 'img/4_enemie_boss_chicken/3_attack/G14.png', 'img/4_enemie_boss_chicken/3_attack/G15.png', 'img/4_enemie_boss_chicken/3_attack/G16.png', 'img/4_enemie_boss_chicken/3_attack/G17.png', 'img/4_enemie_boss_chicken/3_attack/G18.png', 'img/4_enemie_boss_chicken/3_attack/G19.png', 'img/4_enemie_boss_chicken/3_attack/G20.png'];

    /**
     * Constructs an Endboss instance, initializing its position, loading all images and starts the animation function.
     */

    constructor() {
        super();
        this.speed = 1.5;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 1700;
        this.animate();
    }

    /**
     * Starts the animation loop for the Endboss, updating its behavior every 100ms.
     */

    animate() {
        this.animateInterval = setInterval(() => {
            this.updateEndbossDirection();
            this.checkAndAnimateAllPossibleBehavioursOfEndboss();
        }, 150);
    }

    /**
    * Checks and handles different behaviors of the Endboss such as attacking, being hurt, or dying.
    */

    checkAndAnimateAllPossibleBehavioursOfEndboss() {
        if (this.isEndbossInAttackMode()) return;
        else if (this.isEndbossInDeathMode()) return;
        else if (this.isEndbossInIdleMode()) return;
    }

    /**
     * Determines if the end boss is in attack mode based on the character's position and actions.
     * 
     * @returns {boolean} `true` if the end boss is in attack mode; otherwise, `false`.
     */

    isEndbossInAttackMode() {
        if (this.wasEndbossProvokedByCharacter()) {
            this.handleAttackingEndbossAndHurtingEndbossAnimation();
            return true;
        } else if (this.isCharacterToCloseToEndbossFromTheLeft()) {
            this.playAttackingEndbossAndShowHimRunningLeft();
            return true;
        } else if (this.isCharacterToCloseToEndbossFromTheRight()) {
            this.playAttackingEndbossAndShowHimRunningRight();
            return true;
        }
        return false;
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
            this.playAnimation(this.IMAGES_WALKING);
            return true;
        }
        return false;
    }

    /**
    * Animates the Endboss running left while attacking.
    */

    playAttackingEndbossAndShowHimRunningLeft() {
        this.world.audioManager.playSound('chickenSound');
        this.playAttackEndbossAnimation();
        this.x -= this.endbossSpeedX;
    }

    /**
    * Animates the Endboss running right while attacking.
    */

    playAttackingEndbossAndShowHimRunningRight() {
        this.world.audioManager.playSound('chickenSound');
        this.playAttackEndbossAnimation();
        this.x += this.endbossSpeedX;
    }

    /**
     * Handles the attacking and hurt animation of the Endboss, playing sounds and deciding on movement.
     */

    handleAttackingEndbossAndHurtingEndbossAnimation() {
        this.world.audioManager.playSound('chickenScream');
        this.world.audioManager.playSound('chickenSound');
        if (this.checkTimeDifferenceSinceLastTimeHit() < 300) {
            this.playAnimation(this.IMAGES_HURT);
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
        this.directEndbossIntoAttackDirectionAndCheckCollisions();
        this.playAnimation(this.IMAGES_ATTACK);
    }

    /**
     * Directs the Endboss towards the main character and checks for collisions.
     */

    directEndbossIntoAttackDirectionAndCheckCollisions() {
        if (this.mainCharacterPosition < this.x) {
            this.checkIfEndbossAlreadyHitCharacter();
            this.x -= this.endbossSpeedX;
        } else {
            this.checkIfEndbossAlreadyHitCharacter();
            this.x += this.endbossSpeedX;
        }
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
        if (this.checkTimeDifferenceSinceLastTimeHit() < 1000) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.checkTimeDifferenceSinceLastTimeHit() >= 1000) {
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
    * The condition is met if the horizontal distance between the Endboss and the character is less than 400 pixels and the Endboss is positioned to the left of the character.
    * 
    * @returns {boolean} True if the main character is close from the right and the Endboss is still alive, false otherwise.
    */

    isCharacterToCloseToEndbossFromTheRight() {
        return this.x - this.mainCharacterPosition && Math.abs(this.x - this.mainCharacterPosition) < 400 && this.x < this.mainCharacterPosition && this.energy > 0;
    }

    /**
    * Checks if the main character is too close to the Endboss from the left side. The condition is met if the horizontal distance between the Endboss and the character
    * is less than 400 pixels and the Endboss is positioned to the right of the character.
    * 
    * @returns {boolean} True if the main character is close from the left and the Endboss is still alive, false otherwise.
    */

    isCharacterToCloseToEndbossFromTheLeft() {
        return this.x - this.mainCharacterPosition && Math.abs(this.x - this.mainCharacterPosition) < 400 && this.x > this.mainCharacterPosition && this.energy > 0;
    }

    /**
     * Plays the Endboss attack animation and checks if Enboss hit character.
     */

    playAttackEndbossAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.checkIfEndbossAlreadyHitCharacter();
    }

    /**
    * Sets the Endboss as dead and plays the dying animation.
    */

    setIsDeadAttributeAndplayDyingAnimation() {
        this.isDead == true;
        this.playAnimation(this.IMAGES_DEAD);
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
        if (timeDifference < 200) {
            this.endbossSpeedX = 0;
        } else {
            setTimeout(() => {
                this.endbossSpeedX = 7;
            }, 100);
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
    * The time limit (`this.timePassedLimit`) is multiplied by 1000 to convert seconds into milliseconds.
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
        }
        if (this.isEndbossHurtAndTimeSinceLastHitIsBelowTimeLimit()) {
            return true;
        }
        if (this.isEndbossHurtAndTimeSinceLastHitExceedsTimeLimit()) {
            this.setEndbossIsNotHurtAnymore();
        }
        return false;
    }
}