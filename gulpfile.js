const gulp = require('gulp');
const { src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const terser = require('gulp-terser');

// All paths
const paths = {
  scripts: {
    src: ['./src/main.js'],
    dest: '../Legacy-checker-public/dist/js/',
  }
};

const version = '2022-04-05';

function minifyScripts() {
return src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(terser().on('error', (error) => console.log(error)))
    .pipe(rename({ suffix: '.min.' + version }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scripts.dest));
}

exports.default = minifyScripts;