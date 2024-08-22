class Level {
    keyboard;
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    level_end_x = 2 * 719;

    constructor(keyboard, enemies, clouds, backgroundObjects, bottles) {
        this.keyboard = keyboard;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }
}