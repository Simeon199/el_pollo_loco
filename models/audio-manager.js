/**
 * Manages the audio playback in the game, including background music and sound effects.
 */

class AudioManager {
    /**
     * Initializes the AudioManager with background music and sound effects.
     */

    world;

    constructor() {
        this.isBackgroundMusicPaused = false;
        this.backgroundMusic = new Audio('audio/laCucaracha.mp3');
        this.backgroundMusic.volume = 0.25;
        this.sounds = {
            punchAndOuch: new Audio('audio/punch_and_ouch1.mp3'),
            bottleHit: new Audio('audio/bottle_hit.mp3'),
            hit: new Audio('audio/hit3.mp3'),
            loadingSound: new Audio('audio/loadingSound.mp3'),
            bottleLanding: new Audio('audio/soft_landing.mp3'),
            bellSound: new Audio('audio/bellSound.mp3'),
            chickenSound: new Audio('audio/chicken_sound1.mp3'),
            chickenScream: new Audio('audio/chicken_scream1.mp3'),
            walking_sound: new Audio('audio/running.mp3'),
            snorring_sound: new Audio('audio/snor.mp3')
        };
        this.toggleTimeout = null;
    }

    /**
     * Plays the background music if it is currently paused. Sets the background music status to not paused.
     */

    playBackgroundMusic() {
        if (this.backgroundMusic.paused) {
            let playPromise = this.backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.isBackgroundMusicPaused = false;
                }).catch(error => {
                    console.error("Error while playing background music:", error);
                });
            }
        } else {
            this.isBackgroundMusicPaused = false;
        }
        this.isBackgroundMusicPaused = false;
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
     * This function checks if sound is enabled and no key is pressed. If the character is sleeping,
     * it ensures the "snorring_sound" is unmuted and plays it. If the character is not sleeping,
     * it mutes the "snorring_sound".
     */

    playSleepAudio() {
        if (this.soundIsntMutedAndKeyIsntPressed()) {
            if (this.world.character.isSleeping) {
                if (this.isSoundMuted('snorring_sound')) {
                    this.muteSound(false, 'snorring_sound');
                }
                this.playSound('snorring_sound');
            } else {
                // debugger;
                this.muteSound(true, 'snorring_sound');
            }
        }
    }

    /**
    * Checks if the sound is not muted, sound is enabled, and no key is currently pressed.
    * @returns {boolean} True if sound is enabled and no key is pressed, false otherwise.
    */

    soundIsntMutedAndKeyIsntPressed() {
        return soundIsMuted == false && soundOn == true && this.world.character.isKeyPressed == false;
    }

    /**
    * Checks if the walking sound is muted, the character is on the ground, and sound is enabled.
    * @returns {boolean} True if all conditions are met, false otherwise.
    */

    isWalkingSoundMutedCharacterInTheAirAndSoundOn() {
        return this.isSoundMuted('walking_sound') && !this.world.character.isAboveGround() && soundOn == true;
    }

    /**
    * Mutes the snoring sound if it is currently unmuted.
    */

    muteSnorringSoundIfNecessary() {
        if (!this.isSoundMuted('snorring_sound')) {
            this.muteSound(true, 'snorring_sound');
        }
    }

    /**
    * Unmutes the walking sound and starts playing it from the beginning.
    */

    unmuteWalkingSoundAndPlayIt() {
        this.muteSound(false, 'walking_sound');
        this.playWalkingSoundFromBeginning();
    }

    /**
    * Starts playing the walking sound from the beginning if the right or left key is pressed.
    */

    playWalkingSoundFromBeginning() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.sounds['walking_sound'].currentTime = 0;
            this.playSound('walking_sound');
        }
    }

    /**
    * Checks if the walking sound has ended or its playback time is at the beginning.
    * @returns {boolean} True if the sound has ended or is at the beginning, false otherwise.
    */

    hasWalkingSoundEnded() {
        return this.sounds['walking_sound'].ended || this.sounds['walking_sound'].currentTime == 0;
    }

    /**
     * Pauses the background music if it is currently playing. Sets the background music status to paused.
     */

    pauseBackgroundMusic() {
        this.backgroundMusic.pause();
        if (this.isBackgroundMusicPaused == false) {
            this.isBackgroundMusicPaused == true;
        }
    }

    /**
     * Toggles the background music playback. 
     * If it is currently playing, it will be paused, and vice versa.
     */

    toggleBackgroundMusic() {
        if (this.toggleTimeout) {
            clearTimeout(this.toggleTimeout);
        }
        this.toggleTimeout = setTimeout(() => {
            if (this.backgroundMusic.paused) {
                this.playBackgroundMusic();
            } else {
                this.pauseBackgroundMusic();
            }
        }, 100);
    }

    /**
     * Plays a specified sound effect from the available sound library.
     * 
     * @param {string} sound - The key of the sound effect to play.
     */

    playSound(sound) {
        if (this.sounds[sound]) {
            let soundPromise = this.sounds[sound].play();
            if (soundPromise !== undefined) {
                soundPromise.then(() => {
                }).catch(error => {
                    console.error(`Fehler beim Abspielen des Sounds des Sounds ${soundPromise}:`, error);
                });
            }
        }
    }

    isSoundMuted(sound) {
        return this.sounds[sound].muted == true;
    }

    /**
     * Mutes or unmutes the given sound.
     * 
     * @param {boolean} mute - If true, mutes the given sound; if false, unmutes it.
     * @param {string} sound - The sound to be muted.
     */

    muteSound(mute, sound) {
        if (this.sounds[sound]) {
            this.sounds[sound].muted = mute;
        } else {
            console.warn(`Sound ${this.sounds[sound]} existiert nicht`);
        }
    }

    muteWalkingSoundIfNecessary() {
        if (!this.isSoundMuted('walking_sound')) {
            this.muteSound(true, 'walking_sound');
        }
    }

    /**
     * Mutes or unmutes the background music.
     * 
     * @param {boolean} mute - If true, mutes the background music; if false, unmutes it.
     */

    setBackgroundMusicMuted(mute) {
        this.backgroundMusic.muted = mute;
        if (!mute && this.backgroundMusic.paused) {
            this.backgroundMusic.play().catch(error => {
                console.error("Fehler beim Abspielen der Hintergrundmusik:", error);
            });
        }
    }

    /**
     * Mutes or unmutes all sounds related to hitting actions.
     * 
     * @param {boolean} mute - If true, mutes hit sounds; if false, unmutes them.
     */

    setHittingSoundsMuted(mute) {
        let hittingSounds = ['punchAndOuch', 'bottleHit', 'hit'];
        hittingSounds.forEach(soundKey => {
            let sound = this.sounds[soundKey];
            if (sound) {
                sound.muted = mute;
            }
        });
    }

    /**
     * Mutes or unmutes all sounds related to item collection.
     * 
     * @param {boolean} mute - If true, mutes item collection sounds; if false, unmutes them.
     */

    setItemCollectionSoundsMuted(mute) {
        let itemSounds = ['loadingSound', 'bellSound'];
        itemSounds.forEach(soundKey => {
            let sound = this.sounds[soundKey];
            if (sound) {
                sound.muted = mute;
            }
        });
    }

    /**
     * Mutes or unmutes all sounds related to the chickensounds.
     * 
     * @param {boolean} mute - If true, mutes chicken collection sounds; if false, unmutes them.
     */

    setEndbossSoundsMuted(mute) {
        let endbossSounds = ['chickenSound', 'chickenScream'];
        endbossSounds.forEach(soundKey => {
            let sound = this.sounds[soundKey];
            if (sound) {
                sound.muted = mute;
            }
        });
    }

    // muteWalkingSoundIfCharacterExceedsTerritory() {
    //     if ((this.world.character.x >= this.world.level_end + 100 || this.world.character.x <= -719 - 100) && this.world.character.wasRightOrLeftKeyPressed()) {
    //         this.muteSound(true, 'walking_sound');
    //     } else {
    //         this.muteSound(false, 'walking_sound');
    //     }
    // }
}