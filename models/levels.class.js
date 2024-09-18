class Level {
    world;
    keyboard;
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2 * 719;

    constructor(keyboard, enemies, clouds, backgroundObjects, bottles, coins) {
        this.keyboard = keyboard;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}