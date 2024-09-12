class Coin extends DrawableObject {
    height = 100;
    width = 100;
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_2.png');
        this.x = 200 + Math.random() * 1200;
        this.y = 340 - Math.random() * 100;
    }
}