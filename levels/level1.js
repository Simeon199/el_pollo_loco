let level1 = new Level(new Keyboard(), generateEnemies(), generateCloud(), generateBackgroundArray(), generateRandomBottles(), generateCoinsArray());

function generateCloud() {
    return [new Cloud()];
}

function generateRandomBottles() {
    let bottles = [];
    for (i = 0; i < 10; i++) {
        bottles.push(new ThrowableObject(- 1 * 700 + Math.random() * 1000, 300, this.Keyboard));
    }
    return bottles;
}

function generateCoinsArray() {
    let coinsArray = [];
    let i = 0;
    for (let j = 0; j < 10; j++) {
        if (i < j) {
            coinsArray.push(new Coin());
            i++;
        }
    }
    return coinsArray;
}

function generateEnemies() {
    let enemies = [];
    for (i = 0; i < 3; i++) {
        enemies.push(new Chicken(i));
    }
    for (j = 0; j < 3; j++) {
        enemies.push(new BabyChicken(j));
    }
    let endbossIndex = enemies.length
    enemies.push(new Endboss(endbossIndex));
    return enemies;
}

function generateBackgroundArray() {
    let layers = [
        'img/5_background/layers/air.png',
        'img/5_background/layers/3_third_layer/',
        'img/5_background/layers/2_second_layer/',
        'img/5_background/layers/1_first_layer/'
    ];
    let backgrounds = [];
    let numScreens = 5;
    let screenWidth = 719;
    for (let i = -2; i <= numScreens - 3; i++) {
        let position = i * screenWidth;
        backgrounds.push(new BackgroundObject(layers[0], position));
        for (let j = 1; j < layers.length; j++) {
            let layerImage = layers[j] + ((Math.abs(i) % 2) + 1) + '.png';
            backgrounds.push(new BackgroundObject(layerImage, position));
        }
    }
    return backgrounds;
}
