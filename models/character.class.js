class Character extends MovableObject {
    fixDate = 0;
    isJumping = false;
    wasRandomKeyOncePressed = false;
    isKeyStillPressed = false;
    someKeyWasPressedAgain = 0;
    lastTimeKeyPressed = 0;
    timePassedWhenKeyPressed;
    height = 280;
    width = 130;
    y = 20;
    speed = 15;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_CHILL = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    world;
    walking_sound = new Audio('audio/running.mp3');
    snorring_sound = new Audio('audio/snor.mp3');
    bottle;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_CHILL);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.fixDate = new Date().getTime();
            this.timePassedWhenKeyPressed = Math.abs(this.fixDate - this.someKeyWasPressedAgain);
            this.walking_sound.pause();
            this.snorring_sound.pause();
            if (this.keyWasntPressedForMoreThanFiveSeconds()) {
                this.playAnimation(this.IMAGES_SLEEP);
                this.snorring_sound.play();
            }
            if (this.keyWasntPressedForMoreThanTwoButLessThanFiveSeconds()) {
                this.playAnimation(this.IMAGES_CHILL);
            }
            if (this.keyWasntPressedForLessThanTwoSeconds()) {
                this.playAnimation([this.IMAGES_JUMPING[1]]);
            }
            if (this.keyRightWasPressed()) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            this.world.camera_x = this.x + 100;

            if (this.keyLeftWasPressed()) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;

            if (this.keySpaceWasPressed()) {
                this.jump();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                if (this.wasRightOrLeftKeyPressed()) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    };

    keyWasntPressedForMoreThanFiveSeconds() {
        return this.timePassedWhenKeyPressed > 5000 && this.wasRandomKeyOncePressed == true && this.isKeyStillPressed == false && !this.isHurt();
    }

    keyWasntPressedForMoreThanTwoButLessThanFiveSeconds() {
        return this.timePassedWhenKeyPressed < 5000 && this.timePassedWhenKeyPressed > 1000 && this.wasRandomKeyOncePressed == true && this.isKeyStillPressed == false && !this.isAboveGround() && !this.isHurt();
    }

    keyWasntPressedForLessThanTwoSeconds() {
        this.timePassedWhenKeyPressed < 1000 && !this.isAboveGround() && !this.isHurt();
    }

    keyRightWasPressed() {
        return this.world.keyboard.RIGHT && this.x < world.level.level_end_x;
    }

    keyLeftWasPressed() {
        return this.world.keyboard.LEFT && this.x > -719;
    }

    keySpaceWasPressed() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    wasRightOrLeftKeyPressed() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    bounce() {
        this.speedY = 30;
    }
}