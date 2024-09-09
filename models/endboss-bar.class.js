class EndbossBar extends StatusBar {
    IMAGES_DEAD_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]

    constructor() {
        super();
        // this.loadImage(this.IMAGES_DEAD_ENDBOSS[5]);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.width = 200;
        this.height = 60;
        this.x = 130;
        this.y = 250;
    }
}