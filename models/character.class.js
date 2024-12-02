/**
 * Represents a character in the game that can move, jump, get hurt, die, and play various animations.
 * Extends the MovableObject class ('./characterImages.js').
 */

class Character extends MovableObject {
    rightNow = 0;
    fixDate = 0;
    timeDifference = 0;
    wasRandomKeyOncePressed = false;
    isKeyStillPressed = false;
    someKeyWasPressedAgain = 0;
    lastTimeKeyPressed = 0;
    timePassedWhenKeyPressed;
    isAttacked = false;
    timeSinceCharacterExists = 0;
    height = 280;
    width = 130;
    y = 20;
    speed = 12;
    world;
    bottle;

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
            this.characterIsEitherSleepingOrChilling();
            this.characterIsJumpingOrMoving();
            this.characterIsDyingGetsHurtIsJumpingOrWalking();
        }, 100);
    };

    /**
     * Determines if the character was recently hit but is still within a protected time window.
     *
     * @returns {boolean} - `true` if the character is within the protection window, `false` otherwise.
     */

    characterGotHurtButEnjoysProtection() {
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
    * Checks if less than 200 milliseconds have passed since the game was initialized.
    * @returns {boolean} True if less than 200 milliseconds have passed, false otherwise.
    */

    timePassedBetweenNowAndTimePointWhenGameInitialized() {
        return this.rightNow - timePointWhenGameInitialized < 200;
    }

    /**
     * Checks if the current time is within 200 milliseconds of the game initialization time.
     *
     * @returns {boolean} - Returns `true` if the current time is within 200 milliseconds of the game initialization point (`timePointWhenGameInitialized`), 
     * otherwise returns `false`.
     */

    callTimer() {
        this.rightNow = new Date().getTime();
        if (timePassedBetweenNowAndTimePointWhenGameInitialized()) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Checks if the sound is not muted, sound is enabled, and no key is currently pressed.
    * @returns {boolean} True if sound is enabled and no key is pressed, false otherwise.
    */

    soundIsntMutedAndKeyIsntPressed() {
        return soundIsMuted == false && soundOn == true && this.isKeyStillPressed == false;
    }

    /**
     * Moves the character to the right and plays the walking sound.
     */

    playMovingRightAnimationWithAudio() {
        this.moveRight();
        this.otherDirection = false;
        if (soundOn) {
            this.toggleMovingSoundsWhileRunning();
        }
    }

    /**
     * Moves the character to the left and plays the walking sound.
     */

    playMovingLeftAnimationWithAudio() {
        this.moveLeft();
        this.otherDirection = true;
        if (soundOn) {
            this.toggleMovingSoundsWhileRunning();
        }
    }

    /**
    * Toggles moving sounds based on the character's running state. If the walking sound is muted and conditions are met, it unmutes the walking sound.
    * If the walking sound has ended, it restarts the sound.
    */

    toggleMovingSoundsWhileRunning() {
        if (this.isWalkingSoundMutedCharacterInTheAirAndSoundOn()) {
            this.muteSnorringSoundIfNecessary();
            this.unmuteWalkingSoundAndPlayIt();
        } else if (this.hasWalkingSoundEnded()) {
            this.playWalkingSoundFromBeginning();
        }
    }

    /**
    * Checks if the walking sound is muted, the character is on the ground, and sound is enabled.
    * @returns {boolean} True if all conditions are met, false otherwise.
    */

    isWalkingSoundMutedCharacterInTheAirAndSoundOn() {
        return this.world.audioManager.isSoundMuted('walking_sound') && !this.isAboveGround() && soundOn == true;
    }

    /**
    * Checks if the walking sound has ended or its playback time is at the beginning.
    * @returns {boolean} True if the sound has ended or is at the beginning, false otherwise.
    */

    hasWalkingSoundEnded() {
        return this.world.audioManager.sounds['walking_sound'].ended || this.world.audioManager.sounds['walking_sound'].currentTime == 0;
    }

    /**
    * Mutes the snoring sound if it is currently unmuted.
    */

    muteSnorringSoundIfNecessary() {
        if (!this.world.audioManager.isSoundMuted('snorring_sound')) {
            this.world.audioManager.muteSound(true, 'snorring_sound');
        }
    }

    /**
    * Unmutes the walking sound and starts playing it from the beginning.
    */

    unmuteWalkingSoundAndPlayIt() {
        this.world.audioManager.muteSound(false, 'walking_sound');
        this.playWalkingSoundFromBeginning();
    }

    /**
    * Starts playing the walking sound from the beginning if the right or left key is pressed.
    */

    playWalkingSoundFromBeginning() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.world.audioManager.sounds['walking_sound'].currentTime = 0;
            this.world.audioManager.playSound('walking_sound');
        }
    }

    /**
     * Sets all the global variables that are related to the character's movement state. Also mutes walking and snorring sounds.
     */

    setRelevantGlobalVariablesForMovingCharacter() {
        this.fixDate = new Date().getTime();
        this.timePassedWhenKeyPressed = Math.abs(this.fixDate - this.someKeyWasPressedAgain);
    }

    /**
    * Plays the sleep animation with the snoring sound.
    */

    playSleepAnimationWithAudio() {
        this.playAnimation(this.IMAGES_SLEEP);
        if (this.soundIsntMutedAndKeyIsntPressed()) {
            if (this.world.audioManager.isSoundMuted('snorring_sound')) {
                this.world.audioManager.muteSound(false, 'snorring_sound');
            }
            this.world.audioManager.playSound('snorring_sound');
        }
    }

    /**
     * Checks if the character should play the sleep or chill animation based on inactivity.
     */

    characterIsEitherSleepingOrChilling() {
        let currentTime = new Date().getTime();
        let timeFrameSinceCharacterExists = currentTime - this.timeSinceCharacterExists;
        if (this.characterExistsMoreThanFiveSecondsButNoButtonWasPressed(timeFrameSinceCharacterExists)) {
            this.playSleepAnimationWithAudio();
        } else if (this.keyWasntPressedForMoreThanFiveSeconds()) {
            this.playSleepAnimationWithAudio();
        } else if (this.keyWasntPressedAndCharacterNotAttackedForMoreThenFiveSeconds()) {
            this.playSleepAnimationWithAudio();
        } else {
            this.playAnimation(this.IMAGES_CHILL);
        }
    }

    /**
    * Checks if more than 5 seconds have passed without any key press or attack on the character.
    * @returns {boolean} True if conditions are met, false otherwise.
    */

    keyWasntPressedAndCharacterNotAttackedForMoreThenFiveSeconds() {
        if (this.lastTimeKeyPressed !== 0) {
            let timePassedWhenKeyReleased = Math.abs(new Date().getTime() - this.lastTimeKeyPressed);
            return this.timeDifference > 5000 && timePassedWhenKeyReleased > 5000 && this.timePassedWhenKeyPressed > 5000 && this.isKeyStillPressed == false &&
                this.isAttacked == false && !this.isHurt();
        } else {
            return false;
        }
    }

    /**
    * Checks if the character has existed for more than 5 seconds and no random key was pressed or attack occurred.
    * @param {number} timeFrameSinceCharacterExists - Time elapsed since the character's creation.
    * @returns {boolean} True if conditions are met, false otherwise.
    */

    characterExistsMoreThanFiveSecondsButNoButtonWasPressed(timeFrameSinceCharacterExists) {
        return timeFrameSinceCharacterExists > 5000 && this.wasRandomKeyOncePressed == false && this.isKeyStillPressed == false && this.isAttacked == false && !this.isHurt();
    }

    /**
     * Checks if no key was pressed for more than 5 seconds (inactivity check).
     * @returns {boolean} True if the condition is met, false otherwise.
     */

    keyWasntPressedForMoreThanFiveSeconds() {
        return this.timePassedWhenKeyPressed > 5000 && this.wasRandomKeyOncePressed == true && this.isKeyStillPressed == false && this.isAttacked == false && !this.isHurt();
    }

    /**
     * Checks if the character should jump or move based on which key is pressed.
     */

    characterIsJumpingOrMoving() {
        if (this.keyWasntPressedForLessThanHundredMiliSeconds()) {
            this.playAnimation([this.IMAGES_JUMPING[1]]);
        }
        if (this.keyRightWasPressed()) {
            this.playMovingRightAnimationWithAudio();
        }
        this.world.camera_x = this.x + 200;
        if (this.keyLeftWasPressed()) {
            this.playMovingLeftAnimationWithAudio();
        }
        this.world.camera_x = -this.x + 200;
        if (this.keySpaceWasPressed()) {
            this.executeJumpLogic();
        }
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
     * Checks if the character is hurt, dead, jumping, or walking and plays the corresponding animation.
     */

    characterIsDyingGetsHurtIsJumpingOrWalking() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isAboveGround()) {
            this.playCharacterIsInTheAirLogic();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else {
            this.playWalkingLogic();
        }
    }

    /**
    * Plays the appropriate animation logic when the character is in the air. Displays jumping animations based on the vertical speed of the character.
    */

    playCharacterIsInTheAirLogic() {
        console.log(this.currentImage);
        if (this.currentImage <= this.IMAGES_JUMPING.length) {
            if (this.speedY > 0) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }
        else if (this.currentImage > this.IMAGES_JUMPING.length) {
            this.currentImage = 0;
        }
    }

    /**
    * Plays the walking animation logic if the right or left key is pressed.
    */

    playWalkingLogic() {
        if (this.wasRightOrLeftKeyPressed()) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Checks if no key was pressed for less than 100 miliseconds.
     * @returns {boolean} True if the condition is met, false otherwise.
     */

    keyWasntPressedForLessThanHundredMiliSeconds() {
        this.timePassedWhenKeyPressed < 100 && !this.isAboveGround() && !this.isHurt();
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