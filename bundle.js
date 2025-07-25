const fs = require('fs');
const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');

let componentJS = [
    "components/explain-game-container.js",
    "components/show-all-icons-pop-up.js",
    "components/winning-overlay.js",
    "components/losing-overlay.js",
    "components/privacy-imprint-overlay.js"
]

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

let commonJS = [
    "js/eventHandlers.js",
    "js/queries.js",
    "js/shared.js",
    // "script.js",
    "js/audio.js",
    "js/desktop.js",
    "js/touch.js"
];

let cssFiles = [
    // "shared/fonts.css",
    "css/shared.css",
    "css/desktop.css",
    "css/touch.css",
    "css/canvas.css",
    "css/portrait.css",
    "css/outro.css"
]

// === BUNDLE AND MINIFY JS FILES  === //

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
fs.writeFileSync('dist/game.bundle.min.js', gameJSMinified.code); // Hier Quelle anpassen
// console.log('Game JS bundled and minified to dist/bundle.min.js');

const componentJSBundle = componentJS.map(f => fs.readFileSync(f, 'utf-8')).join('\n');
const componentJSMinified = UglifyJS.minify(componentJSBundle);
if(componentJSMinified.error){
    console.error('UglifyJS error: ', componentJSMinified.error);
    process.exit(1);
}
fs.writeFileSync('dist/game.bundle.min.js', componentJSMinified.code); // Hier Quelle anpassen
// console.log('Game JS bundled and minified to dist/bundle.min.js');

const commonJSBundle = commonJS.map(f => fs.readFileSync(f, 'utf-8')).join('\n');
const commonJSMinified = UglifyJS.minify(commonJSBundle);
if(commonJSMinified.error){
    console.error('UglifyJS error: ', commonJSMinified.error);
    process.exit(1);
}
fs.writeFileSync('dist/game.bundle.min.js', commonJSMinified.code); // Hier Quelle anpassen
// console.log('Game JS bundled and minified to dist/bundle.min.js');

// === BUNDLE AND MINIFY CSS FILES  === //

const cssFilesBundle = cssFiles.map(f => fs.readFileSync(f, 'utf-8')).join('\n');
const cssFilesMinified = new CleanCSS().minify(cssFilesBundle).styles;
fs.writeFileSync('dist/touch.bundle.min.css', cssFilesMinified); // Hier Quelle anpassen
// console.log('Touch CSS bundled and minified to dist/bundle.min.css');