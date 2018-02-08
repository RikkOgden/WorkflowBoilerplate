var gulp = require('gulp'),
watch = require('gulp-watch');
browserSync = require('browser-sync').create();

gulp.task('watch', function(){

  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

watch('./app/*.html', function(){
browserSync.reload();
});

watch('./app/assets/postcss/**/*.css', function(){
gulp.start('cssInject');
});

});


gulp.task('cssInject', ['buildCss'], function(){
  return gulp.src('./app/css/styles.css')
  .pipe(browserSync.stream());
});
