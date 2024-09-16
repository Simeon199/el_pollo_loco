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
            if (this.wasEndbossHit() && this.energy > 0 || this.isEndbossFinalEnemy == true) {
                this.chickenScream.play();
                if (new Date().getTime() - this.lastHit < 300) {
                    this.playAnimation(this.IMAGES_HURT);
                } else {
                    this.chickenScream.pause();
                    this.chickenSound.play();
                    if (this.mainCharacterPosition < this.x) {
                        this.checkIfEndbossAlreadyHitCharacter();
                        this.x -= this.endbossSpeedX;
                    } else {
                        this.checkIfEndbossAlreadyHitCharacter();
                        this.x += this.endbossSpeedX;
                    }
                    this.playAnimation(this.IMAGES_ATTACK);
                }
            } else if (this.wasEndbossHit() && this.energy == 0) {
                this.isDead == true;
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.x - this.mainCharacterPosition && Math.abs(this.x - this.mainCharacterPosition) < 400 && this.x > this.mainCharacterPosition) {
                this.chickenSound.play();
                this.playAnimation(this.IMAGES_ATTACK);
                this.checkIfEndbossAlreadyHitCharacter();
                this.x -= this.endbossSpeedX;
            } else if (this.x - this.mainCharacterPosition && Math.abs(this.x - this.mainCharacterPosition) < 400 && this.x < this.mainCharacterPosition) {
                this.chickenSound.play();
                this.playAnimation(this.IMAGES_ATTACK);
                this.checkIfEndbossAlreadyHitCharacter();
                this.x += this.endbossSpeedX;
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
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

    wasEndbossHit() {
        if (this.isEndbossHurt && this.lastHit === 0) {
            this.lastHit = new Date().getTime();
        }
        if (this.isEndbossHurt && (new Date().getTime() - this.lastHit < this.timePassedLimit * 1000)) {
            return true;
        }
        if (new Date().getTime() - this.lastHit >= this.timePassedLimit * 1000) {
            this.isEndbossHurt = false;
            this.lastHit = 0;
        }
        return false;
    }
}