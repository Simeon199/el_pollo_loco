function stopAllSounds() {
    world.audioManager.pauseBackgroundMusic();
    for (let soundKey in world.audioManager.sounds) {
        if (world.audioManager.sounds.hasOwnProperty(soundKey)) {
            let audioElement = world.audioManager.sounds[soundKey];
            audioElement.pause();
        }
    }
}

function isSoundIconClicked(event){
    if(event.target.closest('#sound-on-icon')){
        showTurningSoundOffIcon();
    } else if(event.target.closest('#sound-off-icon')){
        showTurningSoundOnIcon()
    }
    return event.target.closest('#sound-on-icon') || event.target.closest('#sound-off-icon');
}

function unmuteGameSounds() {
    soundOn = true;
    soundIsMuted = false;
}

function turnSoundOnOrOff() {
    soundIsMuted = !soundIsMuted;
    if (soundIsMuted) {
        showTurningSoundOffIcon();
    } else {
        showTurningSoundOnIcon();
    }
    muteUnmuteSound(soundIsMuted);
}

function showTurningSoundOffIcon() {
    soundOn = false;
    let soundOnIcon = document.getElementById('sound-on-icon');
    let soundOffIcon = document.getElementById('sound-off-icon');
    if(soundOffIcon.classList.contains('d-none')){
        soundOffIcon.classList.remove('d-none');
        soundOnIcon.classList.add('d-none');
    }
}

function showTurningSoundOnIcon() {
    soundOn = true;
    let soundOnIcon = document.getElementById('sound-on-icon');
    let soundOffIcon = document.getElementById('sound-off-icon');
    if(soundOnIcon.classList.contains('d-none')){
        soundOnIcon.classList.remove('d-none');
        soundOffIcon.classList.add('d-none');
    }
}

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

function muteRemainingSounds(mute) {
    world.audioManager.muteSound(mute, 'bottleLanding');
}

function manageBackgroundMusic(mute) {
    if (world.audioManager.sounds['backgroundMusic']) {
        world.audioManager.setBackgroundMusicMuted(mute);
    }
}

function manageAudioRelatedToHitting(mute) {
    world.audioManager.setHittingSoundsMuted(mute);
}

function manageAudioRelatedToCollectingItems(mute) {
    world.audioManager.setItemCollectionSoundsMuted(mute);
}

function setAllCharacterAudioSound(mute) {
    if (world.audioManager.sounds['snorring_sound']) {
        if (mute == false && world.character.isSleeping == true) {
            world.audioManager.muteSound(mute, 'snorring_sound');
        } else {
            world.audioManager.muteSound(true, 'snorring_sound');
        }
    }
}

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

function controlMuteCondition() {
    if (hasGameStarted) {
        manageLogicOfSoundOnOrSoundOff();
    } else {
        manageSoundOnSoundOffWhenGameIsntPlaying();
    }
}

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