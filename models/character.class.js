/**
 * Represents a character in the game that can move, jump, get hurt, die, and play various animations.
 * Extends the MovableObject class.
 */

class Character extends MovableObject {
    rightNow = 0;
    fixDate = 0;
    timeDifference = 0;
    isJumping = false;
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

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_CHILL = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    world;
    bottle;

    /**
     * Creates an instance of Character and initializes its properties along with loading images for various animations and applies artificial gravity. 
     * Invokes the animate() function.
     */

    constructor() {
        super().loadImage('img/2_character_pepe/3_jump/J-31.png');
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
        if (currentTime - this.world.timePointWhenCharacterGetsHit < 2000) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if the current time is within 200 milliseconds of the game initialization time.
     *
     * @returns {boolean} - Returns `true` if the current time is within 200 milliseconds of the game initialization point (`timePointWhenGameInitialized`), otherwise returns `false`.
     */

    callTimer() {
        this.rightNow = new Date().getTime();
        if (this.rightNow - timePointWhenGameInitialized < 200) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Plays the sleep animation with the snoring sound.
    */

    playSleepAnimationWithAudio() {
        this.playAnimation(this.IMAGES_SLEEP);
        if (this.world.audioManager.isSoundMuted('snorring_sound')) {
            this.world.audioManager.muteSound(false, 'snorring_sound');
            this.world.audioManager.playSound('snorring_sound');
        }
    }

    /**
     * Moves the character to the right and plays the walking sound.
     */

    playMovingRightAnimationWithAudio() {
        this.moveRight();
        this.otherDirection = false;
        this.toggleMovingSoundsWhileRunning();
    }

    /**
     * Moves the character to the left and plays the walking sound.
     */

    playMovingLeftAnimationWithAudio() {
        this.moveLeft();
        this.otherDirection = true;
        this.toggleMovingSoundsWhileRunning();
    }

    toggleMovingSoundsWhileRunning() {
        if (this.world.audioManager.isSoundMuted('walking_sound') && !this.isAboveGround() && soundOn == true) {
            if (!this.world.audioManager.isSoundMuted('snorring_sound')) {
                this.world.audioManager.muteSound(true, 'snorring_sound');
            }
            this.world.audioManager.muteSound(false, 'walking_sound');
            this.world.audioManager.playSound('walking_sound');
        } else if (this.world.audioManager.sounds['walking_sound'].ended || this.world.audioManager.sounds['walking_sound'].currentTime == 0) {
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
     * Checks if the character should play the sleep or chill animation based on inactivity.
     */

    characterIsEitherSleepingOrChilling() {
        let currentTime = new Date().getTime();
        let timeFrameSinceCharacterExists = currentTime - this.timeSinceCharacterExists;
        if (this.keyWasntPressedForMoreThanFiveSeconds() && this.isAttacked == false) {
            this.playSleepAnimationWithAudio();
        } else if (timeFrameSinceCharacterExists > 5000 && this.wasRandomKeyOncePressed == false && this.isAttacked == false) {
            this.playSleepAnimationWithAudio();
        } else {
            this.playAnimation(this.IMAGES_CHILL);
        }
    }

    /**
     * Checks if the character should jump or move based on which key is pressed.
     */

    characterIsJumpingOrMoving() {
        if (this.keyWasntPressedForLessThanTwoSeconds()) {
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
            if (!this.world.audioManager.isSoundMuted('walking_sound')) {
                this.world.audioManager.muteSound(true, 'walking_sound');
            }
            this.jump();
        }
    }

    /**
     * Checks if the character is hurt, dead, jumping, or walking and plays the corresponding animation.
     */

    characterIsDyingGetsHurtIsJumpingOrWalking() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isAboveGround()) {
            if (this.speedY > 0) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.playAnimation([this.IMAGES_JUMPING[3]]); // this.IMAGES_JUMPING[2] war sehr gut !!!
            }
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else {
            if (this.wasRightOrLeftKeyPressed()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * Checks if no key was pressed for more than 5 seconds (inactivity check).
     * @returns {boolean} True if the condition is met, false otherwise.
     */

    keyWasntPressedForMoreThanFiveSeconds() {
        return this.timePassedWhenKeyPressed > 5000 &&
            this.wasRandomKeyOncePressed == true &&
            this.isKeyStillPressed == false &&
            // this.timeDifference > 5000 &&
            !this.isHurt();
    }

    /**
     * Checks if no key was pressed for less than 2 seconds.
     * @returns {boolean} True if the condition is met, false otherwise.
     */

    keyWasntPressedForLessThanTwoSeconds() {
        this.timePassedWhenKeyPressed < 100 &&
            !this.isAboveGround() &&
            !this.isHurt();
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