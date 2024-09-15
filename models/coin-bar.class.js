class CoinBar extends StatusBar {

    COIN_BAR_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    world;
    percentage = 0;
    energy = 0;

    constructor() {
        super();
        this.loadImage(this.COIN_BAR_IMAGES[0]);
        this.loadImages(this.COIN_BAR_IMAGES);
        this.x = 30;
        this.y = 100;
        // this.showRealPercentage();
    }

    // showRealPercentage() {
    //     console.log("Percentage Status of the Coin Bar: ", this.percentage);
    // }
}