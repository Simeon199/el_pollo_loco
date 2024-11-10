/**
 * Represents a coin status bar that displays the number of collected coins. Inherits from the StatusBar class.
 * 
 * @extends StatusBar
 */

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

    /**
     * Constructs a new `CoinBar` instance. Initializes the starting image, loads the array of coin bar images, 
     * and sets the initial position on the game screen.
     */

    constructor() {
        super();
        this.loadImage(this.COIN_BAR_IMAGES[0]);
        this.loadImages(this.COIN_BAR_IMAGES);
        this.x = 30;
        this.y = 100;
    }
}