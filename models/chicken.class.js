class Chicken extends MovableObject {
    // intervalID = -1;
    isDead = false;
    y = 340;
    height = 90;
    width = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD_CHICKEN = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];



    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD_CHICKEN);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    proveIfChickenIsDead(intervalMoveLeft = -1, intervalChangeWalkingImages = -1) {
        if (this.isDead == true && intervalMoveLeft > -1 && intervalChangeWalkingImages > -1) {
            // debugger;
            clearInterval(intervalMoveLeft);
            clearInterval(intervalChangeWalkingImages);
            console.log("Wanna proof. Look: ", this.isDead, this.intervalIdDeadChicken);
            this.stopIntervalWhenEnemyDies(this.intervalIdDeadChicken);
            this.animate();
        }
    }

    stopIntervalWhenEnemyDies(intervalID) {
        if (this.isDead == true) {
            console.log("Schleife geht hier rein, siehe Werte: ", intervalID);
            clearInterval(intervalID);
        }
    }

    animate() {
        let intervalMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        let intervalChangeWalkingImages = setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 10);
        this.proveIfChickenIsDead(intervalMoveLeft, intervalChangeWalkingImages);
    };
}