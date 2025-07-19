/**
 * Represents a bottle status bar that displays the number of collected bottles.
 * Inherits from the StatusBar class.
 * 
 * @extends StatusBar
 */

class BottleBar extends StatusBar {
    bottleAmount;
    collectedBottlesArray = [];
    bottlesCollected = this.collectedBottlesArray.legth;
    bottleRatio;
    BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    world;

    /**
     * Creates an instance of the BottleBar class.
     * Initializes the bottle images, sets the dimensions, and updates the bottle ratio.
     */

    constructor() {
        super();
        this.loadImages(this.BOTTLE_IMAGES);
        this.updateBottleBar(this.bottleRatio);
        this.width = 200;
        this.height = 60;
        this.x = 30;
        this.y = 50;
    }

    updateThrowObjectsArray(string, bottle) {
        if (string == 'increase') {
            this.collectedBottlesArray.push(bottle);
        } else if (string == "decrease") {
            let index = this.collectedBottlesArray.indexOf(bottle);
            this.collectedBottlesArray.splice(index, 1);
        }
        this.updateBottlesCollectedNumber();
    }

    updateBottlesCollectedNumber() {
        this.bottlesCollected = this.collectedBottlesArray.length;
    }

    updateTotalNumberOfBottles() {
        if (this.bottleAmount > 0) {
            this.bottleAmount = 15;
        }
    }

    /**
    * Updates the bottle status bar based on the current bottle ratio.
    * 
    * @param {number} bottleRatio - The current ratio of collected bottles.
    */

    updateBottleBar() {
        let path = this.BOTTLE_IMAGES[this.resolveBottleBarIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Checks if the bottle ratio falls within a certain range.
    * 
    * @param {number} firstNumber - The lower bound of the range.
    * @param {number} secondNumber - The upper bound of the range.
    * @returns {boolean} True if the bottle ratio is within the specified range; otherwise, false.
    */

    isBottleRatioOfCertainSize(firstNumber, secondNumber) {
        return this.bottleRatio > firstNumber && this.bottleRatio <= secondNumber;
    }

    /**
    * Resolves the index of the bottle status bar image based on the current bottle ratio.
    * 
    * @returns {number} The index of the corresponding image in the BOTTLE_IMAGES array.
    */

    resolveBottleBarIndex() {
        this.bottleRatio = this.bottlesCollected / this.bottleAmount;
        if (this.bottleRatio > 0.95) {
            return 5;
        } else if (this.isBottleRatioOfCertainSize(0.75, 0.95)) {
            return 4;
        } else if (this.isBottleRatioOfCertainSize(0.55, 0.75)) {
            return 3;
        } else if (this.isBottleRatioOfCertainSize(0.35, 0.55)) {
            return 2;
        } else if (this.isBottleRatioOfCertainSize(0.05, 0.35)) {
            return 1;
        } else {
            return 0;
        }
    }
}