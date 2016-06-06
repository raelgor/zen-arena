/**
 * Gulp automation file. From TSX ES7 -> ES3, CSS minification and more.
 */
'use strict';

// Dependencies
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');

// Compile the client's source
gulp.task('minify-client', () =>
  gulp.src([
      './client/lib/*',
      './client/main.js',
      './client/controllers/*',
      './client/ui/*',
      './client/*'
  ])
  .pipe(
    gulpIf(/\.ts[x]{0,1}$/,
      ts({ target: 'es6', noExternalResolve: true })))
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./assets/source')));

// Compile the client's css
gulp.task('minify-css', () =>
  gulp.src([
      './client/css/*'
  ])
  .pipe(concat('styles.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('./assets/source')));

// Transpile TSX
gulp.task('process-src', () => {
  gulp
  .src([
    'main.js',
    './src/**/*.*'
  ], {base: './'})
  .pipe(
    gulpIf(/\.ts[x]{0,1}$/,
      ts({ target: 'es6', noExternalResolve: true })))
  .pipe(
    gulpIf(/\.js$/,
      babel()))
  .pipe(gulp.dest('./release'));
});

// Define watch tasks
gulp.task('watch:src', ['process-src'], () =>
	gulp.watch(['src/**/*.*', 'main.ts'], ['process-src']));
gulp.task('watch:client', ['minify-client'], () =>
	gulp.watch('client/**/*.js', ['minify-client']));
gulp.task('watch:css', ['minify-css'], () =>
	gulp.watch('client/**/*.css', ['minify-css']));

// Initialize development environment task
gulp.task('dev', ['watch:css', 'watch:client', 'watch:src']);
