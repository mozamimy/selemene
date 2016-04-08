var gulp = require('gulp');
var sass = require('gulp-sass');
var $ = require('gulp-load-plugins')();

gulp.task('compile', ['compile-es6', 'compile-sass']);

gulp.task('compile-es6', function() {
  return gulp.src('src/**/*.{js,jsx}')
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('compile-sass', function() {
  return gulp.src('src/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build'));
});
