class Endboss extends Chicken {
    hurtAnimationEnd = 0;
    timePassedLimit = 5;
    animateInterval = -1;
    isEndbossHurt = false;
    isDead = false;
    height = 400;
    width = 250;
    y = 55;

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
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1700;
        this.animate();
    }

    animate() {
        this.animateInterval = setInterval(() => {
            if (this.wasEndbossHit() && this.energy > 0) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.wasEndbossHit() && this.energy == 0) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.stopEndbossAnimation();
                }, 1500);
            }
            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    stopEndbossAnimation() {
        console.log(this.enemiesArray);
        this.enemiesArray.splice(this.enemiesArray.length - 1, 1);
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