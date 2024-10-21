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

function showTurningSoundOffIcon() {
    soundOn = false;
    document.getElementById('sound-off-icon').style.display = 'flex';
    document.getElementById('sound-on-icon').style.display = 'none'
}

function showTurningSoundOnIcon() {
    soundOn = true;
    document.getElementById('sound-off-icon').style.display = 'none';
    document.getElementById('sound-on-icon').style.display = 'flex';
}

function setAllWorldAudioSound(bolean) {
    manageBackgroundMusic(bolean);
    manageAudioRelatedToHitting(bolean);
    manageAudioRelatedToCollectingItems(bolean);
}

function manageBackgroundMusic(bolean) {
    if (world.backgroundMusic) {
        world.backgroundMusic.muted = bolean;
    }
}

function manageAudioRelatedToHitting(bolean) {
    if (world.hit) {
        world.hit.muted = bolean;
    }
    if (world.punchAndOuch) {
        world.punchAndOuch.muted = bolean;
    }
    if (world.bottleHit) {
        world.bottleHit.muted = bolean;
    }
}

function manageAudioRelatedToCollectingItems(bolean) {
    if (world.loadingSound) {
        world.loadingSound.muted = bolean;
    }
    if (world.bellSound) {
        world.bellSound.muted = bolean;
    }
}

function setAllCharacterAudioSound(bolean) {
    if (world.character.walking_sound) {
        world.character.walking_sound.muted = bolean;
    }
    if (world.character.snorring_sound) {
        world.character.snorring_sound.muted = bolean;
    }
}

function setThrowableObjectsAudioSound(bolean) {
    world.throwableObjects.forEach(throwableObject => {
        if (throwableObject.bottleLanding) {
            throwableObject.bottleLanding.muted = bolean;
        }
    });
}

function setEnemiesAudioSound(bolean) {
    world.level.enemies.forEach(enemy => {
        if (enemy.chickenSound) {
            enemy.chickenSound.muted = bolean;
        }
        if (enemy.chickenScream) {
            enemy.chickenScream.muted = bolean;
        }
        if (enemy.hitAndScream) {
            enemy.hitAndScream.muted = bolean;
        }
    });
}

function muteUnmuteSound(bolean) {
    if (doesWorldExist()) {
        setAllWorldAudioSound(bolean);
        if (doesCharacterExistInWorld()) {
            setAllCharacterAudioSound(bolean);
        }
        if (doThrowableObjectsExistInWorld()) {
            setThrowableObjectsAudioSound(bolean);
        }
        if (doEnemiesExistInWorld()) {
            setEnemiesAudioSound(bolean);
        }
    }
}