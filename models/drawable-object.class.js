class DrawableObject {
    x = 120;
    y = 280;
    height = 100;
    width = 80;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image:', e);
            console.log("relevant imageCache:", this.imageCache);
            console.log('relevant currentImage that cant be loaded (index):', this.currentImage);
        }

    }

    /**
    * 
    * @param {Array} arr - ['img/image_1.png', 'img/image_2.png',...] 
    */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this.proveIfInstanceOfCertainType()) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'yellow';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    proveIfInstanceOfCertainType() {
        let bolean = this instanceof Character || this instanceof Chicken || this instanceof ThrowableObject || this instanceof Endboss;
        return bolean;
    }
}