/**
 * Represents a status bar for displaying health or other status indicators in the game. Inherits from the DrawableObject class.
 * 
 * @extends DrawableObject
 */

class StatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;

    /**
     * Creates an instance of the StatusBar class and initializes its properties.
     */

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
        this.width = 200;
        this.height = 60;
        this.x = 30;
        this.y = 0;
    }

    /**
     * Sets the current percentage of the status bar and updates the displayed image accordingly.
     * 
     * @param {number} percentage - The new percentage value to set.
     * @param {string[]} [imageSource=this.IMAGES] - Optional array of image paths to use for the status bar.
     */

    setPercentage(percentage, imageSource = this.IMAGES) {
        this.percentage = percentage;
        let path = imageSource[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image to display based on the current percentage value.
     * 
     * @returns {number} The index of the image corresponding to the current percentage.
     */

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}