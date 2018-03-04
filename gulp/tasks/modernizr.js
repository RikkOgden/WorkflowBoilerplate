var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

gulp.task('modernizr', ['build-scripts'], function () {
  return gulp.src(['./app/assets/css/**/*.css' , './app/assets/scripts/**/*.js' ])
  .pipe(modernizr({
    "options":[
      "setClasses"
    ]
  }))
  .pipe(gulp.dest('./app/assets/scripts/modernizr'));
});
