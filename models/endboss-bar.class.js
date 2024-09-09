class EndbossBar extends StatusBar {
    IMAGES_DEAD_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png', // img\7_statusbars\2_statusbar_endboss\green\green0.png
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png' // img\7_statusbars\2_statusbar_endboss\green\green100.png
    ]

    world;

    constructor() {
        super();
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.y = 100;
    }
}