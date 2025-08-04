
/**
 * Bundler script for combining and minifying JavaScript and CSS files for production.
 * Uses UglifyJS for JS minification and CleanCSS for CSS minification.
 * Outputs bundled files to the dist/ directory.
 */

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
    "js/game.js",
    "js/eventHandlers.game.js"
];

let commonJS = [
    // "js/eventHandlers.js",
    "js/eventHandlers.common.js",
    "js/queries.js",
    "js/shared.js",
    "js/audio.js",
    "js/desktop.js",
    "js/touch.js"
];

let cssFiles = [
    "shared/fonts.css",
    "css/shared.css",
    "css/desktop.css",
    "css/touch.css",
    "css/canvas.css",
    "css/portrait.css",
    "css/outro.css"
]


/**
 * Bundles and minifies a list of JavaScript files into a single output file.
 * @param {string[]} fileList - Array of JS file paths to bundle.
 * @param {string} outputPath - Path to write the minified output file.
 */

function bundleAndMinifyJS(fileList, outputPath){
    let bundle = fileList.map(file => fs.readFileSync(file, 'utf-8')).join('\n');
    let minified = UglifyJS.minify(bundle);
    if(minified.error){
        console.error('UglifyJS error:', minified.error);
        process.exit(1);
    }
    fs.writeFileSync(outputPath, minified.code);
    console.log(`JS bundled and minified to ${outputPath}`);
}


/**
 * Bundles and minifies a list of CSS files into a single output file.
 * @param {string[]} fileList - Array of CSS file paths to bundle.
 * @param {string} outputPath - Path to write the minified output file.
 */

function bundleAndMinifyCSS(fileList, outputPath){
    let bundle = fileList.map(file => fs.readFileSync(file, 'utf-8')).join('\n');
    const minified = new CleanCSS().minify(bundle).styles;
    fs.writeFileSync(outputPath, minified);
    console.log(`CSS bundled and minified to ${outputPath}`);
}

bundleAndMinifyJS(gameJS, 'dist/game.bundle.min.js');
bundleAndMinifyJS(componentJS, 'dist/components.bundle.min.js');
bundleAndMinifyJS(commonJS, 'dist/common.bundle.min.js');
bundleAndMinifyCSS(cssFiles, 'dist/styles.bundle.min.css');