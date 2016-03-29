var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// transpile ES6 files
gulp.task('compile', function(){
  return gulp.src('src/**/*.{js,jsx}')
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build'));
});
