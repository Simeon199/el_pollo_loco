/**
 * Controls which sound icon (on/off) is displayed based on mute state.
 */

function controlTurnOnTurnOffIcon() {
    if (soundIsMuted) {
        showTurningSoundOffIcon();
    } else {
        showTurningSoundOnIcon();
    }
}

/**
 * Mutes all game sounds.
 */

function muteGameSounds() {
    soundOn = false;
    soundIsMuted = true;
}

/**
 * Stops all currently playing sounds in the game.
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
 * Handles logic for when the sound icon is clicked and returns the matched icon element.
 * @param {EventTarget} target - The event target.
 * @returns {Element|null} The matched sound icon element or null.
 */

function isSoundIconClicked(target){
    if(target.closest('#sound-on-icon')){
        showTurningSoundOffIcon();
    } else if(target.closest('#sound-off-icon')){
        showTurningSoundOnIcon();
    }
    return target.closest('#sound-on-icon') || target.closest('#sound-off-icon');
}

/**
 * Unmutes all game sounds.
 */

function unmuteGameSounds() {
    soundOn = true;
    soundIsMuted = false;
}

/**
 * Toggles the sound on or off and updates the icon and mute state.
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
 * Shows the sound off icon and hides the sound on icon.
 */

function showTurningSoundOffIcon() {
    soundOn = false;
    let soundOnIcon = document.getElementById('sound-on-icon');
    let soundOffIcon = document.getElementById('sound-off-icon');
    if(soundOffIcon.classList.contains('d-none')){
        soundOffIcon.classList.remove('d-none');
        soundOnIcon.classList.add('d-none');
    }
}

/**
 * Shows the sound on icon and hides the sound off icon.
 */

function showTurningSoundOnIcon() {
    soundOn = true;
    let soundOnIcon = document.getElementById('sound-on-icon');
    let soundOffIcon = document.getElementById('sound-off-icon');
    if(soundOnIcon.classList.contains('d-none')){
        soundOnIcon.classList.remove('d-none');
        soundOffIcon.classList.add('d-none');
    }
}

/**
 * Mutes or unmutes the background music.
 * @param {boolean} mute - Whether to mute (true) or unmute (false) the background music.
 */

function manageBackgroundMusic(mute) {
    if (world.audioManager.sounds['backgroundMusic']) {
        world.audioManager.setBackgroundMusicMuted(mute);
    }
}

/**
 * Mutes or unmutes the hitting sounds.
 * @param {boolean} mute - Whether to mute (true) or unmute (false) the hitting sounds.
 */

function manageAudioRelatedToHitting(mute) {
    world.audioManager.setHittingSoundsMuted(mute);
}

/**
 * Mutes or unmutes the item collection sounds.
 * @param {boolean} mute - Whether to mute (true) or unmute (false) the item collection sounds.
 */

function manageAudioRelatedToCollectingItems(mute) {
    world.audioManager.setItemCollectionSoundsMuted(mute);
}

/**
 * Sets the mute state for all character-related audio sounds.
 * @param {boolean} mute - Whether to mute (true) or unmute (false) the sounds.
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
 * Sets the mute state for all enemy-related audio sounds.
 * @param {boolean} mute - Whether to mute (true) or unmute (false) the sounds.
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
 * Mutes or unmutes all game sounds, including world, character, and enemies.
 * @param {boolean} mute - Whether to mute (true) or unmute (false) all sounds.
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
 * Sets the mute state for all world audio sounds.
 * @param {boolean} mute - Whether to mute (true) or unmute (false) the sounds.
 */

function setAllWorldAudioSound(mute) {
    world.audioManager.setBackgroundMusicMuted(mute);
    world.audioManager.setHittingSoundsMuted(mute);
    world.audioManager.setItemCollectionSoundsMuted(mute);
    world.audioManager.setEndbossSoundsMuted(mute);
    // setAllCharacterAudioSound(mute);
    muteRemainingSounds(mute);
    // if (!mute && world.audioManager.isBackgroundMusicPaused) {
    //     world.audioManager.playBackgroundMusic();
    // }
}

/**
 * Mutes or unmutes remaining sounds not covered by other handlers.
 * @param {boolean} mute - Whether to mute (true) or unmute (false) the sounds.
 */

function muteRemainingSounds(mute) {
    world.audioManager.muteSound(mute, 'bottleLanding');
}

/**
 * Checks if the world object exists.
 * @returns {boolean} True if world exists, false otherwise.
 */

function doesWorldExist() {
    if (world) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if the character exists in the world.
 * @returns {boolean} True if character exists, false otherwise.
 */

function doesCharacterExistInWorld() {
    if (world.character) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if enemies exist in the world.
 * @returns {boolean} True if enemies exist, false otherwise.
 */

function doEnemiesExistInWorld() {
    if (doesWorldLevelsAndEnemiesObjectsExist()) {
        return true;
    } else {
        return false;
    }
}

/**
 * Checks if the world, level, and enemies objects exist and enemies are present.
 * @returns {boolean} True if world, level, and enemies exist and enemies array is not empty.
 */

function doesWorldLevelsAndEnemiesObjectsExist(){
    return world && world.level && world.level.enemies && world.level.enemies.length > 0; 
}

/**
 * Controls mute logic depending on whether the game has started.
 */

function controlMuteCondition() {
    if (hasGameStarted) {
        manageLogicOfSoundOnOrSoundOff();
    } else {
        manageSoundOnSoundOffWhenGameIsntPlaying();
    }
}

/**
 * Checks if the sound on or off icon was triggered by the event.
 * @param {Event} event - The event object.
 * @returns {boolean} True if sound icon was triggered, false otherwise.
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