class Endboss extends Chicken {
    endbossHitCharacter = false;
    endbossHitCharacterAtTime = 0;
    endbossSpeedX = 20;
    mainCharacterPosition = null;
    hurtAnimationEnd = 0;
    timePassedLimit = 5;
    animateInterval = -1;
    isEndbossHurt = false;
    height = 400;
    width = 250;
    y = 55;

    chickenSound = new Audio('audio/chicken_sound1.mp3');
    chickenScream = new Audio('audio/chicken_scream1.mp3');
    hitAndScream = new Audio('audio/punch_and_ouch1.mp3');


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 1700;
        this.animate();
    }

    animate() {
        this.animateInterval = setInterval(() => {
            this.updateEndbossDirection();
            this.checkAndAnimateAllPossibleBehavioursOfEndboss();
        }, 100);
    }

    checkAndAnimateAllPossibleBehavioursOfEndboss() {
        if (this.wasEndbossProvokedByCharacter()) {
            this.handleAttackingEndbossAndHurtingEndbossAnimation();
        } else if (this.isEndbossNotFinalEnemyButDead()) {
            this.playDyingAnimationAndSetFixedDeadEndbossImage();
        } else if (this.isFinalEnemyEndbossAndIsHeDead()) {
            this.setIsDeadAttributeAndplayDyingAnimation();
        } else if (this.isCharacterToCloseToEndbossFromTheLeft()) {
            this.playAttackingEndbossAndShowHimRunningLeft();
        } else if (this.isCharacterToCloseToEndbossFromTheRight()) {
            this.playAttackingEndbossAndShowHimRunningRight();
        } else if (this.isEndbossAliveAndWasNotAttacked()) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    playAttackingEndbossAndShowHimRunningLeft() {
        this.playAttackEndbossAnimation();
        this.x -= this.endbossSpeedX;
    }

    playAttackingEndbossAndShowHimRunningRight() {
        this.playAttackEndbossAnimation();
        this.x += this.endbossSpeedX;
    }

    handleAttackingEndbossAndHurtingEndbossAnimation() {
        this.chickenScream.play();
        if (this.checkTimeDifferenceSinceLastTimeHit() < 300) {
            this.playAnimation(this.IMAGES_HURT);
        } else {
            this.animateMovingAndAttackingEndboss();
        }
    }

    animateMovingAndAttackingEndboss() {
        this.chickenScream.pause();
        this.chickenSound.play();
        this.directEndbossIntoAttackDirectionAndCheckCollisions();
        this.playAnimation(this.IMAGES_ATTACK);
    }

    directEndbossIntoAttackDirectionAndCheckCollisions() {
        if (this.mainCharacterPosition < this.x) {
            this.checkIfEndbossAlreadyHitCharacter();
            this.x -= this.endbossSpeedX;
        } else {
            this.checkIfEndbossAlreadyHitCharacter();
            this.x += this.endbossSpeedX;
        }
    }

    checkTimeDifferenceSinceLastTimeHit() {
        return new Date().getTime() - this.lastHit;
    }

    wasEndbossProvokedByCharacter() {
        return this.isEndbossAliveAndFinalEnemy() || this.isEndbossAliveAndWasAttacked();
    }

    isEndbossAliveAndWasAttacked() {
        return this.wasEndbossHit() && this.energy > 0;
    }

    isEndbossAliveAndFinalEnemy() {
        return this.isEndbossFinalEnemy == true && this.energy > 0;
    }

    playDyingAnimationAndSetFixedDeadEndbossImage() {
        this.isDead == true;
        if (this.checkTimeDifferenceSinceLastTimeHit() < 1000) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.checkTimeDifferenceSinceLastTimeHit() >= 1000) {
            this.showDefeatedEndbossAndPositionCharacter();
        }
    }

    showDefeatedEndbossAndPositionCharacter() {
        this.playAnimation(this.IMAGE_DEAD_CHICKEN);
        this.mainCharacterPosition = 100000;
        this.stopAnimateFunction();
    }

    isEndbossNotFinalEnemyButDead() {
        return this.wasEndbossHit() &&
            this.isEndbossFinalEnemy == false &&
            this.energy == 0;
    }

    isFinalEnemyEndbossAndIsHeDead() {
        return this.isEndbossFinalEnemy == true && this.energy == 0;
    }

    isEndbossAliveAndWasNotAttacked() {
        return this.isDead == false &&
            this.energy > 0 &&
            !(this.wasEndbossHit());
    }

    isCharacterToCloseToEndbossFromTheRight() {
        return this.x - this.mainCharacterPosition &&
            Math.abs(this.x - this.mainCharacterPosition) < 400 &&
            this.x < this.mainCharacterPosition &&
            this.energy > 0;
    }

    isCharacterToCloseToEndbossFromTheLeft() {
        return this.x - this.mainCharacterPosition &&
            Math.abs(this.x - this.mainCharacterPosition) < 400 &&
            this.x > this.mainCharacterPosition &&
            this.energy > 0;
    }

    playAttackEndbossAnimation() {
        this.chickenSound.play();
        this.playAnimation(this.IMAGES_ATTACK);
        this.checkIfEndbossAlreadyHitCharacter();
    }

    setIsDeadAttributeAndplayDyingAnimation() {
        this.isDead == true;
        this.playAnimation(this.IMAGES_DEAD);
    }

    stopAnimateFunction() {
        clearInterval(this.animateInterval);
    }

    checkIfEndbossAlreadyHitCharacter() {
        let date = new Date().getTime();
        let timeDifference = date - this.endbossHitCharacterAtTime;
        if (timeDifference < 200) {
            this.endbossSpeedX = 0;
        } else {
            setTimeout(() => {
                this.endbossSpeedX = 20;
            }, 100);
        }
    }

    updateEndbossDirection() {
        if (this.mainCharacterPosition < this.x) {
            this.otherDirection = false;
        } else {
            this.otherDirection = true;
        }
    }

    isEndbossHurtAndLastHitEqualsZero() {
        return this.isEndbossHurt && this.lastHit === 0;
    }

    isEndbossHurtAndTimeSinceLastHitIsBelowTimeLimit() {
        return this.isEndbossHurt &&
            (new Date().getTime() - this.lastHit < this.timePassedLimit * 1000);
    }

    isEndbossHurtAndTimeSinceLastHitExceedsTimeLimit() {
        return new Date().getTime() - this.lastHit >= this.timePassedLimit * 1000;
    }

    setEndbossIsNotHurtAnymore() {
        this.isEndbossHurt = false;
        this.lastHit = 0;
    }

    getLastHitTime() {
        this.lastHit = new Date().getTime();
    }

    wasEndbossHit() {
        if (this.isEndbossHurtAndLastHitEqualsZero()) {
            this.getLastHitTime();
        }
        if (this.isEndbossHurtAndTimeSinceLastHitIsBelowTimeLimit()) {
            return true;
        }
        if (this.isEndbossHurtAndTimeSinceLastHitExceedsTimeLimit()) {
            this.setEndbossIsNotHurtAnymore();
        }
        return false;
    }
}