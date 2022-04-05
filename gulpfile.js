const gulp = require('gulp');
const { src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const terser = require('gulp-terser');

// All paths
const paths = {
  scripts: {
    src: ['./src/main.js'],
    dest: './dist/',
  }
};

function minifyScripts() {
return src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(terser().on('error', (error) => console.log(error)))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scripts.dest));
}

exports.default = minifyScripts;