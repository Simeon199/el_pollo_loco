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
            bellSound: new Audio('audio/bellSound.mp3')
        };
    }

    /**
     * Plays the background music if it is currently paused. Sets the background music status to not paused.
     */

    playBackgroundMusic() {
        if (this.backgroundMusic.paused) {
            this.backgroundMusic.play();
        }
        if (this.isBackgroundMusicPaused == true) {
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
        if (this.backgroundMusic.paused) {
            this.playBackgroundMusic();
        } else {
            this.pauseBackgroundMusic();
        }
    }

    /**
     * Plays a specified sound effect from the available sound library.
     * 
     * @param {string} sound - The key of the sound effect to play.
     */

    playSound(sound) {
        if (this.sounds[sound]) {
            if (this.sounds[sound].paused) {
                this.sounds[sound].play();
            }
            if (this.sounds[sound].volume == 0) {
                this.sounds[sound].volume = 0.25;
            }
        }
    }

    /**
     * Mutes or unmutes the background music.
     * 
     * @param {boolean} mute - If true, mutes the background music; if false, unmutes it.
     */
    setBackgroundMusicMuted(mute) {
        if (mute == true) {
            this.backgroundMusic.volume = 0;
        } else {
            this.backgroundMusic.volume = 0.25;
        }
        // this.backgroundMusic.muted = mute;
    }

    /**
     * Mutes or unmutes all sounds related to hitting actions.
     * 
     * @param {boolean} mute - If true, mutes hit sounds; if false, unmutes them.
     */
    setHittingSoundsMuted(mute) {
        const hittingSounds = ['punchAndOuch', 'bottleHit', 'hit'];
        hittingSounds.forEach(soundKey => {
            if (this.sounds[soundKey] && mute == true) {
                // this.sounds[soundKey].muted = mute;
                this.sounds[soundKey].volume = 0;
            } else if (this.sounds[soundKey] && mute == false) {
                this.sounds[soundKey].volume = 0.25;
            }
        });
    }

    /**
     * Mutes or unmutes all sounds related to item collection.
     * 
     * @param {boolean} mute - If true, mutes item collection sounds; if false, unmutes them.
     */

    setItemCollectionSoundsMuted(mute) {
        const itemSounds = ['loadingSound', 'bellSound'];
        itemSounds.forEach(soundKey => {
            if (this.sounds[soundKey] && mute == true) {
                // this.sounds[soundKey].muted = mute;
                this.sounds[soundKey].volume = 0;
            } else if (this.sounds[soundKey] && mute == false) {
                this.sounds[soundKey].volume = 0.25;
            }
        });
    }
}
