/**
 * Represents the status bar for the end boss in the game.
 * Inherits from the StatusBar class.
 * 
 * @extends StatusBar
 */

class EndbossBar extends StatusBar {
    IMAGES_DEAD_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]

    world;

    /**
     * Creates an instance of the EndbossBar class. Loads the end boss status bar images and sets the initial position on the screen.
     */

    constructor() {
        super();
        this.loadImage(this.IMAGES_DEAD_ENDBOSS[5]);
        this.loadImages(this.IMAGES_DEAD_ENDBOSS);
        this.y = 10;
        this.x = 489;
    }
}