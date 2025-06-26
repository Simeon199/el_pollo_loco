const fs = require('fs');
const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');

let gameJS = [ 
    "models/drawable-object.class.js",
    "models/movable-object.class.js",
    "models/characterImages.class.js",
    "models/character.class.js",
    "models/chicken.class.js",
    "models/baby-chicken.class.js",
    "models/clouds.class.js",
    "models/background-object.class.js",
    "models/audio-manager.js",
    "models/world.class.js",
    "models/utility.js",
    "models/keyboard.class.js",
    "models/levels.class.js",
    "models/endbossImages.class.js",
    "models/endboss.class.js",
    "models/status-bar.class.js",
    "models/bottle-bar.class.js",
    "models/endboss-bar.class.js",
    "models/coin-bar.class.js",
    "models/throwable-object.class.js",
    "models/bottle.class.js",
    "models/coin.class.js",
    "levels/level1.js",
    "js/game.js"
];

let touchJS = [
    "js/audio-related.js", 
    "js/touch-device.js",
    "shared/shared.js"
];

let desktopJS = [
    "js/audio-related.js", 
    "js/desktop-device.js",
    "shared/shared.js"
];

let desktopCSS = [
    "css/index-style-overlay.css", 
    "css/index-style-canvas.css", 
    "media_queries/desktop_version/normal-desktop-size-media-query.css", 
    "media_queries/desktop_version/big-desktop-size-media-query.css"
];

let touchCSS = [
    "css/loading-overlay.css",
    "css/index-style-overlay-touch.css",
    "css/index-style-canvas.css",  
    "media_queries/touch_screen_version/touch-device-media-query.css", 
    "media_queries/touch_screen_version/media-queries-portrait-and-height.css"
]; 

// === BUNDLE AND MINIFY GAME JS FILES  === //

gameJS.forEach(f => {
    if (!fs.existsSync(f)) {
        console.error('File not found:', f);
    }
});

const gameJSBundle = gameJS.map(f => fs.readFileSync(f, 'utf-8')).join('\n');
const gameJSMinified = UglifyJS.minify(gameJSBundle);
if(gameJSMinified.error){
    console.error('UglifyJS error: ', gameJSMinified.error);
    process.exit(1);
}
// const gameJSMinified = UglifyJS.minify(gameJSBundle).code;
fs.writeFileSync('dist/game.bundle.min.js', gameJSMinified.code);
console.log('Game JS bundled and minified to dist/bundle.min.js');

// === BUNDLE AND MINIFY TOUCH JS FILES  === //

const touchJSBundle = touchJS.map(f => fs.readFileSync(f, 'utf-8')).join('\n')
const touchJSMinified = UglifyJS.minify(touchJSBundle);
if (touchJSMinified.error) {
    console.error('UglifyJS error (touchJS): ', touchJSMinified.error);
    process.exit(1);
}
fs.writeFileSync('dist/touch.bundle.min.js', touchJSMinified.code);
console.log('Touch JS bundled and minified to dist/bundle.min.js');

// === BUNDLE AND MINIFY DESKTOP JS FILES  === //

const desktopJSBundle = desktopJS.map(f => fs.readFileSync(f, 'utf-8')).join('\n');
const desktopJSMinified = UglifyJS.minify(desktopJSBundle);
if (desktopJSMinified.error) {
    console.error('UglifyJS error (desktopJS): ', desktopJSMinified.error);
    process.exit(1);
}
fs.writeFileSync('dist/desktop.bundle.min.js', desktopJSMinified.code);
console.log('Desktop JS bundled and minified to dist/bundle.min.js');

// === BUNDLE AND MINIFY DESKTOP CSS FILES  === //

const desktopCSSBundle = desktopCSS.map(f => fs.readFileSync(f, 'utf-8')).join('\n');
const desktopCSSMinified = new CleanCSS().minify(desktopCSSBundle).styles;
fs.writeFileSync('dist/desktop.bundle.min.css', desktopCSSMinified);
console.log('Desktop CSS bundled and minified to dist/bundle.min.css');

// === BUNDLE AND MINIFY DESKTOP CSS FILES  === //

const touchCSSBundle = touchCSS.map(f => fs.readFileSync(f, 'utf-8')).join('\n');
const touchCSSMinified = new CleanCSS().minify(touchCSSBundle).styles;
fs.writeFileSync('dist/touch.bundle.min.css', touchCSSMinified);
console.log('Touch CSS bundled and minified to dist/bundle.min.css');