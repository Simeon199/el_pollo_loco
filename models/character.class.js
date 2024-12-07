/**
 * Represents a character in the game that can move, jump, get hurt, die, and play various animations.
 * Extends the MovableObject class ('./characterImages.js').
 */

class Character extends MovableObject {
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
    * Controls all animations and camera movement for the character in the game world.
    */

    animate() {
        this.manageAllCharacterAnimations();
        this.manageCameraMovementWhenCharacterMovesInWorld();
    };

    /**
     * Manages all character animations by checking the state of the character and triggering the appropriate animation.
     * Animations include jumping, moving left/right, sleeping, being hurt, dying, and idle. This method runs continuously at a 125ms interval.
     */

    manageAllCharacterAnimations() {
        setInterval(() => {
            this.setRelevantGlobalVariablesForMovingCharacter();
            if (this.wereJumpAndMoveBruttonPressedSimultaneously()) {
                this.triggerJumpLogic();
            } else if (this.keySpaceWasPressed()) {
                this.triggerJumpLogic();
            } else if (this.isCharacterJumpingAndAboveTheGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.keyRightPressedAndCharacterOnGround()) {
                this.playMovingRightAnimationWithAudio();
            } else if (this.keyLeftPressedAndCharacterOnGround()) {
                this.playMovingLeftAnimationWithAudio();
            } else if (this.shouldCharacterFallInSleepDueToInactivity()) {
                this.playSleepAnimationWithAudio();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_CHILL);
            }
        }, 75);
    }

    /**
     * Handles the camera's movement in response to the character's position and direction in the world.
     * Updates the camera position continuously at a 75ms interval.
     */

    manageCameraMovementWhenCharacterMovesInWorld() {
        setInterval(() => {
            if (this.keyRightWasPressed()) {
                this.moveRight();
                this.otherDirection = false;
            }
            this.world.camera_x = this.x + 200;
            if (this.keyLeftWasPressed()) {
                this.moveLeft();
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 200;
        }, 75);
    }

    /**
     * Checks if the jump and movement keys were pressed simultaneously.
     * @returns {boolean} True if the space (jump) key and left/right movement keys were pressed together.
     */

    wereJumpAndMoveBruttonPressedSimultaneously() {
        return this.keySpaceWasPressed() && this.wasRightOrLeftKeyPressed();
    }

    /**
     * Triggers the logic for making the character jump. Sets the jumping state to true and mutes walking sounds if necessary.
     */

    triggerJumpLogic() {
        this.isJumping = true;
        this.world.audioManager.muteWalkingSoundIfNecessary();
        this.jump();
    }

    /**
     * Checks if the character is currently jumping and is above the ground level.
     * @returns {boolean} True if the character is in the air and jumping.
     */

    isCharacterJumpingAndAboveTheGround() {
        return this.isJumping == true && this.isAboveGround();
    }

    /**
     * Plays the sleep animation and corresponding audio.
     */

    playSleepAnimationWithAudio() {
        this.playAnimation(this.IMAGES_SLEEP);
        this.world.audioManager.playSleepAudio();
    }

    /**
     * Determines if the character should fall asleep due to inactivity.
     * @returns {boolean} True if all conditions for sleeping are met and there is no sound icon interaction.
     */

    shouldCharacterFallInSleepDueToInactivity() {
        return this.conditionsToBeMetForSleeping() == true && !this.isSoundIconInteraction;
    }

    /**
     * Checks if the right key is pressed and the character is on the ground.
     * @returns {boolean} True if the right key is pressed and the character is not jumping.
     */

    keyRightPressedAndCharacterOnGround() {
        return this.keyRightWasPressed() && !this.isAboveGround();
    }

    /**
     * Checks if the left key is pressed and the character is on the ground.
     * @returns {boolean} True if the left key is pressed and the character is not jumping.
     */

    keyLeftPressedAndCharacterOnGround() {
        return this.keyLeftWasPressed() && !this.isAboveGround();
    }

    /**
     * Sets global variables related to the character's movement and timing. Tracks the current time, the total existence time of the character, 
     * and the time passed since a key was last pressed.
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
        this.currentTime = new Date().getTime();
        if (this.timePassedBetweenNowAndLastHitAgainstCharacter()) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Determines whether less than 2 seconds have passed since the character was last hit.
    * @returns {boolean} True if less than 2 seconds have passed since the character was hit, false otherwise.
    */

    timePassedBetweenNowAndLastHitAgainstCharacter() {
        return this.currentTime - this.world.timePointWhenCharacterGetsHit < 2000;
    }

    /**
     * Plays the animation for moving the character to the right and manages the relevant walking audio.
     * Ensures the character is facing the correct direction.
     */

    playMovingRightAnimationWithAudio() {
        this.otherDirection = false;
        this.playWalkingLogic();
    }

    /**
     * Plays the animation for moving the character to the left and manages the relevant walking audio.
     * Ensures the character is facing the correct direction.
     */

    playMovingLeftAnimationWithAudio() {
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
     * @returns {boolean} Returns `true` if any of the sleep conditions are met, otherwise `false`.
     */

    conditionsToBeMetForSleeping() {
        return this.characterExistsFiveSecondsButNoButtonPressed() ||
            this.keyWasntPressedForMoreThanFiveSeconds() ||
            this.keyWasntPressedAndCharacterNotAttackedForMoreThenFiveSeconds();
    }

    /**
     * Determines if no key has been pressed and the character hasn't been attacked for more than five seconds.
     * @returns {boolean} True if five seconds have passed without key presses or attacks, and all conditions for sleep animation are met.
     */

    keyWasntPressedAndCharacterNotAttackedForMoreThenFiveSeconds() {
        if (this.lastTimeKeyPressed !== 0) {
            let timePassedWhenKeyReleased = Math.abs(new Date().getTime() - this.lastTimeKeyPressed);
            return this.timeDifferenceBetweenNowAndLastHitFromEndboss > 5000
                && this.wasRandomKeyOncePressed == true && timePassedWhenKeyReleased > 5000
                && this.allVariablesThatMustBeTrueForSleepAnimation();
        }
        return false;
    }

    /**
    * Checks if the character has existed for more than five seconds without any key being pressed.
    * @returns {boolean} True if the character exists for over five seconds, no keys were pressed, and sleep conditions are met.
    */

    characterExistsFiveSecondsButNoButtonPressed() {
        return this.timeCharacterExists > 5000 && this.wasRandomKeyOncePressed == false && this.allVariablesThatMustBeTrueForSleepAnimation();
    }

    /**
     * Validates all conditions that must be true for the character to enter the sleep animation.
     * @returns {boolean} True if the character is not pressing any keys, not being attacked, not jumping, and not hurt.
     */

    allVariablesThatMustBeTrueForSleepAnimation() {
        return this.isKeyPressed == false && this.isAttacked == false && this.isJumping == false && !this.isHurt();
    }

    /**
     * Checks if no key has been pressed for more than five seconds and all conditions for sleep animation are met.
     * @returns {boolean} True if over five seconds have passed since a key press and sleep conditions are satisfied.
     */

    keyWasntPressedForMoreThanFiveSeconds() {
        return this.timePassedWhenKeyPressed > 5000 && this.wasRandomKeyOncePressed == true && this.allVariablesThatMustBeTrueForSleepAnimation();
    }

    /**
     * Manages the logic for walking animations and sound effects.
     * Plays the walking animation if a movement key is pressed, and toggles walking sounds if sound is enabled.
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
     * Checks if the right key was pressed and ensures the character does not exceed the level's boundary.
     * @returns {boolean} True if the right key is pressed and the character is within the level bounds.
     */

    keyRightWasPressed() {
        return this.world.keyboard.RIGHT && this.x < world.level.level_end_x + 100;
    }

    /**
     * Checks if the left key was pressed and ensures the character does not exceed the level's boundary.
     * @returns {boolean} True if the left key is pressed and the character is within the level bounds.
     */

    keyLeftWasPressed() {
        return this.world.keyboard.LEFT && this.x > -719 - 100;
    }

    /**
     * Checks if the space key is pressed.
     * @returns {boolean} True if the space key is pressed, false otherwise.
     */

    keySpaceWasPressed() {
        return this.world.keyboard.SPACE;
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