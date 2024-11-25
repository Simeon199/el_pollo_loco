// Create a new Level instance with various game elements.

let level1 = new Level(new Keyboard(), generateEnemies(), generateCloud(), generateBackgroundArray(), generateRandomBottles(), generateCoinsArray());

/**
 * Generates an array containing a single cloud object.
 * 
 * @returns {Cloud[]} An array with one Cloud object.
 */

function generateCloud() {
    return [new Cloud()];
}

/**
 * Generates an array of random throwable bottles.
 * 
 * @returns {ThrowableObject[]} An array of ThrowableObject instances representing bottles.
 */

function generateRandomBottles() {
    let bottles = [];
    for (i = 0; i < 15; i++) {
        bottles.push(new ThrowableObject(- 1 * 700 + Math.random() * 1000, 300, this.Keyboard));
    }
    return bottles;
}

/**
 * Generates an array of coin objects.
 * 
 * @returns {Coin[]} An array of Coin instances.
 */

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

/**
 * Generates an array of enemy objects, including chickens and a boss.
 * 
 * @returns {Array<Chicken|BabyChicken|Endboss>} An array of enemy instances.
 */

function generateEnemies() {
    let enemies = [];
    for (i = 0; i < 5; i++) {
        enemies.push(new Chicken(i));
    }
    for (j = 0; j < 5; j++) {
        enemies.push(new BabyChicken(j));
    }
    let endbossIndex = enemies.length
    enemies.push(new Endboss(endbossIndex));
    return enemies;
}

/**
 * Generates an array of background objects for the level.
 * 
 * @returns {BackgroundObject[]} An array of BackgroundObject instances representing different layers of the background.
 */

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
