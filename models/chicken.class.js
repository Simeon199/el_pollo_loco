class Chicken extends MovableObject {
    isDead = false;
    y = 340;
    height = 90;
    width = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        let intervalMoveLeft;
        let intervalChangeWalkingImages;
        if (this.isDead == false) {
            intervalMoveLeft = setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
            intervalChangeWalkingImages = setInterval(() => {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }, 1000 / 10);
        } else {
            clearInterval(intervalMoveLeft);
            clearInterval(intervalChangeWalkingImages);
        }
    };

    // chickenDies() {
    //     this.isDead = true;
    // }
}