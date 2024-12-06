/**
 * Represents a character in the game that can move, jump, get hurt, die, and play various animations.
 * Extends the MovableObject class ('./characterImages.js').
 */

class Character extends MovableObject {
    // fixDate = 0;
    currentTime = 0;
    isSoundIconInteraction = false;
    timeDifferenceBetweenNowAndLastHitFromEndboss = 0;
    wasRandomKeyOncePressed = false;
    isKeyPressed = false;
    isSleeping = false;
    someKeyWasPressedAgain = 0;
    lastTimeKeyPressed = 0;
    timePassedWhenKeyPressed;
    isAttacked = false;
    isJumping = false;
    timeSinceCharacterExists = 0;
    timeCharacterExists = 0;
    height = 280;
    width = 130;
    y = 20;
    speed = 15;
    world;

    /**
     * Creates an instance of Character and initializes its properties along with loading images for various animations and applies artificial gravity. 
     * Invokes the animate() function.
     */

    constructor() {
        super().loadImage('img/2_character_pepe/3_jump/J-31.png');
        let images = new window.CharacterImages();
        this.IMAGES_WALKING = images.IMAGES_WALKING;
        this.IMAGES_CHILL = images.IMAGES_CHILL;
        this.IMAGES_SLEEP = images.IMAGES_SLEEP;
        this.IMAGES_JUMPING = images.IMAGES_JUMPING;
        this.IMAGES_DEAD = images.IMAGES_DEAD;
        this.IMAGES_HURT = images.IMAGES_HURT;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_CHILL);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.setTimeSinceCharacterExists();
        this.animate();
    }

    /**
    * Sets the timestamp indicating when the character was created.
    */

    setTimeSinceCharacterExists() {
        this.timeSinceCharacterExists = new Date().getTime();
    }

    /**
     * Starts the animation cycle for the character. Calls different checks for movement, sleeping, and other states at defined intervals.
     */

    animate() {
        setInterval(() => {
            this.setRelevantGlobalVariablesForMovingCharacter();
            if (this.conditionsToBeMetForSleeping() == true && !this.isSoundIconInteraction) {
                this.playAnimation(this.IMAGES_SLEEP);
                this.world.audioManager.playSleepAudio();
            } else if (this.keyRightWasPressed()) {
                this.playMovingRightAnimationWithAudio();
            } else if (this.keyLeftWasPressed()) {
                this.playMovingLeftAnimationWithAudio();
            } else if (this.keySpaceWasPressed()) {
                this.isJumping = true;
                this.executeJumpLogic();
                this.playCharacterIsInTheAirLogic();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_CHILL);
            }
        }, 100);
        setInterval(() => {
            if (this.keyRightWasPressed()) { }
            this.world.camera_x = this.x + 200;
            if (this.keyLeftWasPressed()) { }
            this.world.camera_x = -this.x + 200;
        }, 50);
    };

    /**
     * Sets all the global variables that are related to the character's movement state. Also mutes walking and snorring sounds.
     */

    setRelevantGlobalVariablesForMovingCharacter() {
        this.currentTime = new Date().getTime();
        this.timeCharacterExists = this.currentTime - this.timeSinceCharacterExists;
        this.timePassedWhenKeyPressed = Math.abs(this.currentTime - this.someKeyWasPressedAgain);
    }

    /**
     * Determines if the character was recently hit but is still within a protected time window.
     *
     * @returns {boolean} - `true` if the character is within the protection window, `false` otherwise.
     */

    characterGotHurtButEnjoysProtection() {
        this.setIsSleepingOnFalseIfSetTrue();
        let currentTime = new Date().getTime();
        if (this.timePassedBetweenNowAndLastHitAgainstCharacter(currentTime)) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Determines whether less than 2 seconds have passed since the character was last hit.
    * @param {number} currentTime - The current timestamp.
    * @returns {boolean} True if less than 2 seconds have passed since the character was hit, false otherwise.
    */

    timePassedBetweenNowAndLastHitAgainstCharacter(currentTime) {
        return currentTime - this.world.timePointWhenCharacterGetsHit < 2000;
    }

    /**
     * Moves the character to the right and plays the walking sound.
     */

    playMovingRightAnimationWithAudio() {
        this.moveRight();
        this.otherDirection = false;
        this.playWalkingLogic();
    }

    /**
     * Moves the character to the left and plays the walking sound.
     */

    playMovingLeftAnimationWithAudio() {
        this.moveLeft();
        this.otherDirection = true;
        this.playWalkingLogic();
    }

    /**
    * Sets the `isSleeping` property to `false` if it is currently `true`.
    */

    setIsSleepingOnFalseIfSetTrue() {
        if (this.isSleeping == true) {
            this.isSleeping = false;
        }
    }

    /**
     * Evaluates conditions required for the character to start sleeping.
     * @param {number} timeCharacterExists - The time in seconds the character has been active.
     * @returns {boolean} Returns `true` if any of the sleep conditions are met, otherwise `false`.
     */

    conditionsToBeMetForSleeping() { // timeCharacterExists
        return this.characterExistsFiveSecondsButNoButtonPressed() || // timeCharacterExists
            this.keyWasntPressedForMoreThanFiveSeconds() ||
            this.keyWasntPressedAndCharacterNotAttackedForMoreThenFiveSeconds();
    }

    /**
    * Checks if more than 5 seconds have passed without any key press or attack on the character.
    * @returns {boolean} True if conditions are met, false otherwise.
    */

    keyWasntPressedAndCharacterNotAttackedForMoreThenFiveSeconds() {
        if (this.lastTimeKeyPressed !== 0) {
            let timePassedWhenKeyReleased = Math.abs(new Date().getTime() - this.lastTimeKeyPressed);
            return this.timeDifferenceBetweenNowAndLastHitFromEndboss > 5000 && this.wasRandomKeyOncePressed == true && timePassedWhenKeyReleased > 5000
                && this.allVariablesThatMustBeTrueForSleepAnimation();
        }
        return false;
    }

    /**
    * Checks if the character has existed for more than 5 seconds and no random key was pressed or attack occurred.
    * @param {number} timeFrameSinceCharacterExists - Time elapsed since the character's creation.
    * @returns {boolean} True if conditions are met, false otherwise.
    */

    characterExistsFiveSecondsButNoButtonPressed() { // timeCharacterExists
        return this.timeCharacterExists > 5000 && this.wasRandomKeyOncePressed == false && this.allVariablesThatMustBeTrueForSleepAnimation();
    }

    /**
    * Checks if all required conditions are true for the sleep animation to play.
    * @returns {boolean} Returns `true` if the character is not pressing any keys, not attacked, not jumping, and not hurt.
    */

    allVariablesThatMustBeTrueForSleepAnimation() {
        return this.isKeyPressed == false && this.isAttacked == false && this.isJumping == false && !this.isHurt();
    }

    /**
     * Checks if no key was pressed for more than 5 seconds (inactivity check).
     * @returns {boolean} True if the condition is met, false otherwise.
     */

    keyWasntPressedForMoreThanFiveSeconds() {
        return this.timePassedWhenKeyPressed > 5000 && this.wasRandomKeyOncePressed == true && this.allVariablesThatMustBeTrueForSleepAnimation();
    }

    /**
    * Executes the logic for jumping, including muting the walking sound and triggering the jump action.
    */

    executeJumpLogic() {
        if (!this.world.audioManager.isSoundMuted('walking_sound')) {
            this.world.audioManager.muteSound(true, 'walking_sound');
        }
        this.jump();
    }

    /**
    * Plays the appropriate animation logic when the character is in the air. Displays jumping animations based on the vertical speed of the character.
    */

    playCharacterIsInTheAirLogic() {
        if (this.isJumping) {
            if (this.currentImage <= this.IMAGES_JUMPING.length - 1) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.currentImage > this.IMAGES_JUMPING.length - 1 && this.isAboveGround()) {
                this.img.scr = this.IMAGES_JUMPING[8];
                setTimeout(() => {
                    this.currentImage = 0;
                }, 350);
            }
        }
    }

    /**
    * Plays the walking animation logic if the right or left key is pressed.
    */

    playWalkingLogic() {
        if (this.wasRightOrLeftKeyPressed()) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        if (soundOn) {
            this.world.audioManager.toggleMovingSoundsWhileRunning();
        }
    }

    /**
     * Checks if the right key is pressed.
     * @returns {boolean} True if the right key is pressed, false otherwise.
     */

    keyRightWasPressed() {
        return this.world.keyboard.RIGHT && this.x < world.level.level_end_x + 100;
    }

    /**
     * Checks if the left key is pressed.
     * @returns {boolean} True if the left key is pressed, false otherwise.
     */

    keyLeftWasPressed() {
        return this.world.keyboard.LEFT && this.x > -719 - 100;
    }

    /**
     * Checks if the space key is pressed.
     * @returns {boolean} True if the space key is pressed, false otherwise.
     */

    keySpaceWasPressed() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Checks if either the left or right key is pressed.
     * @returns {boolean} True if either key is pressed, false otherwise.
     */

    wasRightOrLeftKeyPressed() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Makes the character bounce by setting the vertical speed to 15.
     */

    bounce() {
        this.speedY = 15;
    }
}