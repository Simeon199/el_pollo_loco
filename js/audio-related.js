/**
 * Adds click event listeners to the sound icon elements.
 * 
 * When either the 'sound-off-icon' or 'sound-on-icon' is clicked,
 * the `turnSoundOnOrOff` function is triggered to toggle the sound state.
 */

function manageSoundIconEventListeners(){
    let soundOff = document.getElementById('sound-off-icon');
    let soundOn = document.getElementById('sound-on-icon');
    soundOff.addEventListener('click', () => {
        turnSoundOnOrOff();
    });
    soundOn.addEventListener('click', () => {
        turnSoundOnOrOff();
    });
}

/**
 * Stops all sounds in the game world, including background music and enemy sounds.
 * Pauses the background music and enemy-specific sounds if they are playing.
 */

function stopAllSounds() {
    world.audioManager.pauseBackgroundMusic();
    for (let soundKey in world.audioManager.sounds) {
        if (world.audioManager.sounds.hasOwnProperty(soundKey)) {
            let audioElement = world.audioManager.sounds[soundKey];
            audioElement.pause();
        }
    }
}

/**
 * Unmutes all game sounds by updating the sound state variables. Sets `soundOn` to `true` and `soundIsMuted` to `false` to reflect
 * that the game sounds are turned on.
 */

function unmuteGameSounds() {
    soundOn = true;
    soundIsMuted = false;
}

/**
 * Toggles the sound between on and off by muting or unmuting all sounds.
 * Also updates the sound icons to reflect the current sound state.
 */

function turnSoundOnOrOff() {
    soundIsMuted = !soundIsMuted;
    if (soundIsMuted) {
        showTurningSoundOffIcon();
    } else {
        showTurningSoundOnIcon();
    }
    muteUnmuteSound(soundIsMuted);
}

/**
 * Displays the icon indicating that the sound is turned off.
 * Hides the sound-on icon and shows the sound-off icon.
 */

function showTurningSoundOffIcon() {
    soundOn = false;
    document.getElementById('sound-off-icon').style.display = 'flex';
    document.getElementById('sound-on-icon').style.display = 'none'
}

/**
 * Displays the icon indicating that the sound is turned on.
 * Hides the sound-off icon and shows the sound-on icon.
 */

function showTurningSoundOnIcon() {
    soundOn = true;
    document.getElementById('sound-off-icon').style.display = 'none';
    document.getElementById('sound-on-icon').style.display = 'flex';
}

/**
 * Mutes or unmutes all sound in the game world, including background music, hit sounds, endboss sounds
 * and item collection sounds, based on the boolean parameter.
 * 
 * @param {boolean} mute - If true, mutes all sounds; if false, unmutes all sounds.
 */

function setAllWorldAudioSound(mute) {
    world.audioManager.setBackgroundMusicMuted(mute);
    world.audioManager.setHittingSoundsMuted(mute);
    world.audioManager.setItemCollectionSoundsMuted(mute);
    world.audioManager.setEndbossSoundsMuted(mute);
    setAllCharacterAudioSound(mute);
    muteRemainingSounds(mute);
    if (!mute && world.audioManager.isBackgroundMusicPaused) {
        world.audioManager.playBackgroundMusic();
    }
}

/**
 * Mutes or unmutes the bottle landing sound in the game world.
 * 
 * @param {boolean} mute - If true, mutes the bottle landing sound; if false, unmutes it.
 */

function muteRemainingSounds(mute) {
    world.audioManager.muteSound(mute, 'bottleLanding');
}

/**
 * Mutes or unmutes the background music in the game world.
 * 
 * @param {boolean} mute - If true, mutes the background music; if false, unmutes it.
 */

function manageBackgroundMusic(mute) {
    if (world.audioManager.sounds['backgroundMusic']) {
        world.audioManager.setBackgroundMusicMuted(mute);
    }
}

/**
 * Mutes or unmutes sounds related to hitting events in the game world.
 * 
 * @param {boolean} bolean - If true, mutes hit-related sounds; if false, unmutes them.
 */

function manageAudioRelatedToHitting(mute) {
    world.audioManager.setHittingSoundsMuted(mute);
}

/**
 * Mutes or unmutes sounds related to collecting items in the game world.
 * 
 * @param {boolean} bolean - If true, mutes item collection sounds; if false, unmutes them.
 */

function manageAudioRelatedToCollectingItems(mute) {
    world.audioManager.setItemCollectionSoundsMuted(mute);
}

/**
 * Mutes or unmutes the character's audio sounds, such as walking or snoring.
 * 
 * @param {boolean} bolean - If true, mutes character sounds; if false, unmutes them.
 */

function setAllCharacterAudioSound(mute) {
    if (world.audioManager.sounds['snorring_sound']) {
        if (mute == false && world.character.isSleeping == true) {
            world.audioManager.muteSound(mute, 'snorring_sound');
        } else {
            world.audioManager.muteSound(true, 'snorring_sound');
        }
    }
}

/**
 * Mutes or unmutes sounds associated with enemies, such as chicken sounds and scream sounds.
 * 
 * @param {boolean} bolean - If true, mutes enemy sounds; if false, unmutes them.
 */

function setEnemiesAudioSound(mute) {
    world.level.enemies.forEach(enemy => {
        if (enemy.world.audioManager.chickenSound) {
            enemy.world.audioManager.chickenSound.muted = mute;
        }
        if (enemy.world.audioManager.chickenScream) {
            enemy.world.audioManager.chickenScream.muted = mute;
        }
    });
}

/**
 * Mutes or unmutes all game sounds depending on the boolean parameter.
 * This includes world, character and enemies' sounds.
 * 
 * @param {boolean} bolean - If true, mutes all sounds; if false, unmutes them.
 */

function muteUnmuteSound(mute) {
    if (doesWorldExist()) {
        setAllWorldAudioSound(mute);
        if (doesCharacterExistInWorld()) {
            setAllCharacterAudioSound(mute);
        }
        if (doEnemiesExistInWorld()) {
            setEnemiesAudioSound(mute);
        }
        if (!mute) {
            world.audioManager.playBackgroundMusic();
        }
    }
}

/**
 * Controls the mute state based on the game's start status. Mutes or unmutes sound depending on whether the game has started or is paused.
 */

function controlMuteCondition() {
    if (hasGameStarted) {
        manageLogicOfSoundOnOrSoundOff();
    } else {
        manageSoundOnSoundOffWhenGameIsntPlaying();
    }
}

/**
 * Manages the display of sound icons when the game is not playing. Shows the sound-on icon and hides the sound-off icon.
 */

function manageSoundOnSoundOffWhenGameIsntPlaying() {
    document.getElementById('sound-off-icon').style.display = 'none';
    document.getElementById('sound-on-icon').style.display = 'flex';
}

/**
 * Manages the display of sound icons based on the sound state when the game is playing. Shows or hides sound-on and sound-off icons depending on the value of `soundOn`.
 */

function manageLogicOfSoundOnOrSoundOff() {
    if (soundOn) {
        document.getElementById('sound-off-icon').style.display = 'none';
        document.getElementById('sound-on-icon').style.display = 'flex';
    } else {
        document.getElementById('sound-off-icon').style.display = 'flex';
        document.getElementById('sound-on-icon').style.display = 'none';
    }
}

/**
 * Toggles the sound icon based on whether the sound is muted. Displays either the sound-on or sound-off icon depending on the `soundIsMuted` state.
 */

function toggleSoundIconBasedOnSoundIsMuted() {
    if (soundIsMuted) {
        document.getElementById('sound-off-icon').style.display = 'flex';
    } else {
        document.getElementById('sound-on-icon').style.display = 'flex';
    }
}

/**
 * Checks if the event target matches the sound-on or sound-off icons.
 *
 * @param {Event} event - The event object to check.
 * @returns {boolean} - Returns `true` if the event target is either the sound-on or sound-off icon; otherwise, `false`.
 */

function checkIfSoundIconWasTriggered(event) {
    let soundOnIcon = document.getElementById('sound-on-icon');
    let soundOffIcon = document.getElementById('sound-off-icon');
    if (event.target == soundOffIcon) {
        return true;
    } else if (event.target == soundOnIcon) {
        return true;
    } else {
        return false;
    }
}