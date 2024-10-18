class BottleBar extends StatusBar {
    bottlesCollected = 0;
    bottleAmount = 0;
    bottleRatio = 0;
    BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    world;
    constructor() {
        super();
        this.loadImages(this.BOTTLE_IMAGES);
        this.updateBottleBar(this.bottleRatio);
        this.width = 200;
        this.height = 60;
        this.x = 30;
        this.y = 50;
    }

    updateBottleBar(bottleRatio) {
        this.bottleRatio = bottleRatio;
        let path = this.BOTTLE_IMAGES[this.resolveBottleBarIndex()];
        this.img = this.imageCache[path];
    }

    isBottleRatioOfCertainSize(firstNumber, secondNumber) {
        return this.bottleRatio > firstNumber && this.bottleRatio <= secondNumber;
    }

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
        } else if (this.isBottleRatioOfCertainSize(0.15, 0.35)) {
            return 1;
        } else {
            return 0;
        }
    }
}