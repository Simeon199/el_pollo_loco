/**
 * Stops all sounds in the game world, including background music and enemy sounds.
 * Pauses the background music and enemy-specific sounds if they are playing.
 */

function stopAllSounds() {
    if (world && world.backgroundMusic) {
        world.backgroundMusic.pause();
    }
    if (world && world.level && world.level.enemies && world.level.enemies.length > 0) {
        world.level.enemies.forEach(enemy => {
            if (enemy.chickenSound) {
                enemy.chickenSound.pause();
            }
        });
    }
}

/**
 * Toggles the sound between on and off by muting or unmuting all sounds.
 * Also updates the sound icons to reflect the current sound state.
 */

function turnSoundOnOrOff() {
    soundIsMuted = !soundIsMuted;
    if (soundIsMuted) {
        muteUnmuteSound(true);
        showTurningSoundOffIcon();
    } else {
        muteUnmuteSound(false);
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
 * @param {boolean} bolean - If true, mutes all sounds; if false, unmutes all sounds.
 */

function setAllWorldAudioSound(bolean) {
    manageBackgroundMusic(bolean);
    manageAudioRelatedToHitting(bolean);
    manageAudioRelatedToCollectingItems(bolean);
}

/**
 * Mutes or unmutes the background music in the game world.
 * 
 * @param {boolean} bolean - If true, mutes the background music; if false, unmutes it.
 */

function manageBackgroundMusic(mute) {
    if (world.backgroundMusic) {
        world.backgroundMusic.muted = mute;
    }
}

/**
 * Mutes or unmutes sounds related to hitting events in the game world.
 * 
 * @param {boolean} bolean - If true, mutes hit-related sounds; if false, unmutes them.
 */

function manageAudioRelatedToHitting(mute) {
    if (world.hit) {
        world.hit.muted = mute;
    }
    if (world.punchAndOuch) {
        world.punchAndOuch.muted = mute;
    }
    if (world.bottleHit) {
        world.bottleHit.muted = mute;
    }
}

/**
 * Mutes or unmutes sounds related to collecting items in the game world.
 * 
 * @param {boolean} bolean - If true, mutes item collection sounds; if false, unmutes them.
 */

function manageAudioRelatedToCollectingItems(mute) {
    if (world.loadingSound) {
        world.loadingSound.muted = mute;
    }
    if (world.bellSound) {
        world.bellSound.muted = mute;
    }
}

/**
 * Mutes or unmutes the character's audio sounds, such as walking or snoring.
 * 
 * @param {boolean} bolean - If true, mutes character sounds; if false, unmutes them.
 */

function setAllCharacterAudioSound(mute) {
    if (world.character.walking_sound) {
        world.character.walking_sound.muted = mute;
    }
    if (world.character.snorring_sound) {
        world.character.snorring_sound.muted = mute;
    }
}

/**
 * Mutes or unmutes sounds associated with enemies, such as chicken sounds and scream sounds.
 * 
 * @param {boolean} bolean - If true, mutes enemy sounds; if false, unmutes them.
 */

function setEnemiesAudioSound(mute) {
    world.level.enemies.forEach(enemy => {
        if (enemy.chickenSound) {
            enemy.chickenSound.muted = mute;
        }
        if (enemy.chickenScream) {
            enemy.chickenScream.muted = mute;
        }
        if (enemy.hitAndScream) {
            enemy.hitAndScream.muted = mute;
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
        if (!mute && world.backgroundMusic.paused) {
            world.backgroundMusic.play();
        }
    }
}
