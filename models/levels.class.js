/**
 * Represents a game level containing various elements such as enemies, clouds, and background objects.
 */

class Level {
    audiomanager;
    world;
    keyboard;
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2 * 719;
    level_start_x = -719;

    /**
     * Creates an instance of the Level class.
     * 
     * @param {Keyboard} keyboard - The keyboard state to control the level.
     * @param {Array<Object>} enemies - An array of enemies in the level.
     * @param {Array<Object>} clouds - An array of clouds in the level.
     * @param {Array<Object>} backgroundObjects - An array of background objects in the level.
     * @param {Array<Object>} bottles - An array of bottles in the level.
     * @param {Array<Object>} coins - An array of coins in the level.
     */

    constructor(keyboard, enemies, clouds, backgroundObjects, bottles, coins) {
        this.keyboard = keyboard;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}