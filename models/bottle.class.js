class Bottle extends MovableObject {

    height = 60;
    width = 60 * 1.2;
    y = 300;
    x = -2 * 700 + Math.random() * 2876;

    BOTTLE_ROTATION_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor() {
        super();
        this.loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.BOTTLE_ROTATION_IMAGES);
    }
}