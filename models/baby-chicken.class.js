class BabyChicken extends Chicken {

    BABY_CHICKEN_IMAGES = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png'
    ];

    BABY_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImage(this.BABY_CHICKEN_DEAD[0]);
        this.loadImages(this.BABY_CHICKEN_IMAGES);
    }
}