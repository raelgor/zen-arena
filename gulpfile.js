'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
 
gulp.task('min_js', () => {
  
  let readStream = gulp.src([
      './client/lib/*',
      './client/main.js',
      './client/*'
  ]);
  
  readStream
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/source'));

});

gulp.task('min_css', () => {
  
  let readStream = gulp.src([
      './client/css/*'
  ]);
  
  readStream
    .pipe(concat('styles.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/source'));

});

gulp.task('watch:js', ['min_js'], () => {
	gulp.watch('client/**/*.js', ['min_js']);
});

gulp.task('watch:css', ['min_css'], () => {
	gulp.watch('client/**/*.css', ['min_css']);
});

gulp.task('dev', ['watch:css', 'watch:js']);