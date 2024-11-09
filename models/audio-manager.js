/**
 * Manages the audio playback in the game, including background music and sound effects.
 */

class AudioManager {
    /**
     * Initializes the AudioManager with background music and sound effects.
     */

    constructor() {
        this.isBackgroundMusicPaused = false;
        this.backgroundMusic = new Audio('audio/laCucaracha.mp3');
        this.backgroundMusic.volume = 0.25;
        this.sounds = {
            punchAndOuch: new Audio('audio/punch_and_ouch1.mp3'),
            bottleHit: new Audio('audio/bottle_hit.mp3'),
            hit: new Audio('audio/hit3.mp3'),
            loadingSound: new Audio('audio/loadingSound.mp3'),
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
                    console.log("Background music is now playing.");
                    this.isBackgroundMusicPaused = false;
                }).catch(error => {
                    console.error("Error while playing background music:", error);
                });
            }
        } else {
            console.log("Background music is already playing.");
            this.isBackgroundMusicPaused = false;
        }
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
                    console.log("Sound wurde erfolgreich abgespielt!");
                }).catch(error => {
                    console.error("Fehler beim Abspielen des Sounds:", error);
                });
            }
        }
    }

    muteSound(mute, sound) {
        if (this.sounds[sound]) {
            this.sounds[sound].muted = mute;
        } else {
            console.warn(`Sound ${this.sounds[sound]} existiert nicht`);
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
                if (!mute && sound.paused) {
                    sound.play().catch(error => {
                        console.error(`Fehler beim Abspielen des Sounds ${soundKey}:`, error);
                    });
                }
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
                if (!mute && sound.paused) {
                    sound.play().catch(error => {
                        console.error(`Fehler beim Abspielen des Sounds ${soundKey}:`, error);
                    });
                }
            }
        });
    }
}
