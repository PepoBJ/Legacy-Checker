const gulp = require('gulp');
const { src, dest } = require('gulp');
const terser = require('gulp-terser');
const concat = require('gulp-concat');

// All paths
const paths = {
  scripts: {
    src: [
      './src/helpers/*.js',
      './src/validators/*.js',
      './src/ui/*.js',
      './src/main.js',
    ],
    dest: './dist/',
  }
};

function minifyScripts() {
  return src(paths.scripts.src)
      .pipe(concat('main.js'))
      .pipe(terser().on('error', (error) => console.log(error)))
      .pipe(dest(paths.scripts.dest));
}

exports.default = minifyScripts;