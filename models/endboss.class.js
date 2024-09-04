class Endboss extends Chicken { // ehemals class Endboss extends MovableObject

    animateInterval = -1;
    isHurt = false;
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
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.x = 1700;
        this.animate();
    }

    animate() {
        this.animateInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.isHurt == true) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 100);
        // if (this.isHurt == true) {
        //     setTimeout(function () {
        //         this.isHurt = false;
        //     }, 100);
        // }
    }
}