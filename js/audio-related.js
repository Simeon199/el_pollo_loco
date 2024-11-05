/**
 * Stops all sounds in the game world, including background music and enemy sounds.
 * Pauses the background music and enemy-specific sounds if they are playing.
 */

function stopAllSounds() {
    if (world && world.audioManager) {
        world.audioManager.pauseBackgroundMusic();
    }
    if (world && world.level && world.level.enemies && world.level.enemies.length > 0) {
        world.level.enemies.forEach(enemy => {
            if (enemy.chickenSound) {
                enemy.chickenSound.pause();
            }
            if (enemy.chickenScream) {
                enemy.chickenScream.pause();
            }
        });
    }
    if (world && world.character) {
        if (world.character.walking_sound) {
            world.character.walking_sound.pause();
        }
        if (world.character.snorring_sound) {
            world.character.snorring_sound.pause();
        }
    }
}

/**
 * Toggles the sound between on and off by muting or unmuting all sounds.
 * Also updates the sound icons to reflect the current sound state.
 */

function turnSoundOnOrOff() {
    soundIsMuted = !soundIsMuted;
    muteUnmuteSound(soundIsMuted);
    if (soundIsMuted) {
        showTurningSoundOffIcon();
    } else {
        showTurningSoundOnIcon();
    }
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
 * Mutes or unmutes all sound in the game world, including background music, hit sounds,
 * and item collection sounds, based on the boolean parameter.
 * 
 * @param {boolean} mute - If true, mutes all sounds; if false, unmutes all sounds.
 */

function setAllWorldAudioSound(mute) {
    world.audioManager.setBackgroundMusicMuted(mute);
    world.audioManager.setHittingSoundsMuted(mute);
    world.audioManager.setItemCollectionSoundsMuted(mute);
}

/**
 * Mutes or unmutes the background music in the game world.
 * 
 * @param {boolean} bolean - If true, mutes the background music; if false, unmutes it.
 */

function manageBackgroundMusic(mute) {
    if (world.audioManager.sounds['backgroundMusic'] && mute == true) {
        world.audioManager.sounds['backgroundMusic'].volume = 0;
    } else if (world.audioManager.sounds['backgroundMusic'] && mute == false) {
        world.audioManager.sounds['backgroundMusic'].volume = 0.25;
    }
}

/**
 * Mutes or unmutes sounds related to hitting events in the game world.
 * 
 * @param {boolean} bolean - If true, mutes hit-related sounds; if false, unmutes them.
 */

function manageAudioRelatedToHitting(mute) {
    if (world.audioManager.sounds['hit'] && mute == true) {
        world.audioManager.sounds['hit'].volume = 0;
    } else if (world.audioManager.sounds['hit'] && mute == false) {
        world.audioManager.sounds['hit'].volume = 0.25;
    }
    if (world.audioManager.sounds['punchAndOuch'] && mute == true) {
        world.audioManager.sounds['punchAndOuch'].volume = 0;
    } else if (world.audioManager.sounds['punchAndOuch'] && mute == false) {
        world.audioManager.sounds['punchAndOuch'].volume = 0.25;
    }
    if (world.audioManager.sounds['bottleHit'] && mute == true) {
        world.audioManager.sounds['bottleHit'].volume = 0;
    } else if (world.audioManager.sounds['bottleHit'] && mute == false) {
        world.audioManager.sounds['bottleHit'].volume = 0.25;
    }
}

/**
 * Mutes or unmutes sounds related to collecting items in the game world.
 * 
 * @param {boolean} bolean - If true, mutes item collection sounds; if false, unmutes them.
 */

function manageAudioRelatedToCollectingItems(mute) {
    if (world.audioManager.sounds['loadingSound'] && mute == true) {
        world.audioManager.sounds['loadingSound'].volume = 0;
    } else if (world.audioManager.sounds['loadingSound'] && mute == false) {
        world.audioManager.sounds['loadingSound'].volume = 0.25;
    }
    if (world.audioManager.sounds['bellSound'] && mute == true) {
        world.audioManager.sounds['bellSound'].volume = 0;
    } else if (world.audioManager.sounds['bellSound'] && mute == false) {
        world.audioManager.sounds['bellSound'].volume = 0.25;
    }
}

/**
 * Mutes or unmutes the character's audio sounds, such as walking or snoring.
 * 
 * @param {boolean} bolean - If true, mutes character sounds; if false, unmutes them.
 */

function setAllCharacterAudioSound(mute) {
    if (world.character.walking_sound && mute == true) {
        world.character.walking_sound.volume = 0;
    } else if (world.character.walking_sound && mute == false) {
        world.character.walking_sound.volume = 0.25;
    }
    if (world.character.snorring_sound && mute == true) {
        world.character.snorring_sound.volume = 0;
    } else if (world.character.snorring_sound && mute == false) {
        world.character.snorring_sound.volume = 0.25;
    }
}

/**
 * Mutes or unmutes sounds associated with enemies, such as chicken sounds and scream sounds.
 * 
 * @param {boolean} bolean - If true, mutes enemy sounds; if false, unmutes them.
 */

function setEnemiesAudioSound(mute) {
    world.level.enemies.forEach(enemy => {
        if (enemy.chickenSound && mute == true) {
            enemy.chickenSound.volume = 0;
        } else if (enemy.chickenSound && mute == true) {
            enemy.chickenSound.volume = 0.25;
        }
        if (enemy.chickenScream && mute == true) {
            enemy.chickenScream.volume = 0;
        } else if (enemy.chickenScream && mute == false) {
            enemy.chickenScream.volume = 0.25;
        }
        if (enemy.hitAndScream && mute == true) {
            enemy.hitAndScream.volume = 0;
        } else if (enemy.hitAndScream && mute == false) {
            enemy.hitAndScream.volume = 0.25;
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
        if (!mute && world.audioManager.isBackgroundMusicPaused) {
            world.audioManager.playBackgroundMusic();
        }
    }
}
