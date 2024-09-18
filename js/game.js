let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let hasGameStarted = false;

function init() {
    if (world) {
        world.reset();
    } else {
        canvas = document.getElementById("canvas");
        world = new World(canvas, keyboard);
    }
    ctx = canvas.getContext('2d');
    checkIfEnemyOrCharacterIsDead();
}

function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('intro-image').style.display = 'none';
    init();
}

function playAgain() {
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('losing-image').style.display = 'none';
    document.getElementById('winning-image').style.display = 'none';
    world = new World(canvas, keyboard);
    hasGameStarted = false;
    checkIfEnemyOrCharacterIsDead();
}

function checkIfEnemyOrCharacterIsDead() {
    setInterval(() => {
        if (world.character.energy == 0) {
            stopGame('losing');
        } else if (world.enemiesNumber <= 0) {
            stopGame('winning');
        }
    }, 100);
}

function stopGame(string) {
    setTimeout(() => {
        clearAllIntervals();
        document.getElementById('canvas').style.display = 'none';
        if (string == 'losing') {
            document.getElementById('losing-image').style.display = 'flex';
            document.getElementById('winning-image').classList.add('winning-image-properties');
        } else if (string == 'winning') {
            document.getElementById('winning-image').style.display = 'flex';
            document.getElementById('winning-image').classList.add('winning-image-properties');
        }
    }, 100);
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
        if (keyboard.leftForThrow == true) {
            keyboard.leftForThrow = false;
        }
        keyboard.rightForThrow = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
        if (keyboard.rightForThrow == true) {
            keyboard.rightForThrow = false;
        }
        keyboard.leftForThrow = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.keyD = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.keyD = false;
    }
})