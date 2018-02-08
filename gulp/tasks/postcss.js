var gulp = require('gulp'),
postcss = require('gulp-postcss'),
nestedcss = require('postcss-nested'),
cssimport = require('postcss-import'),
mixins = require('postcss-mixins'),
cssnext = require("postcss-cssnext");


gulp.task('build-css', function(){
  return gulp.src('./app/assets/postcss/styles.css')
  .pipe(postcss([cssimport, postcss, mixins, cssnext, nestedcss]))
  .on('error', function(theError){
    console.log(theError.toString());
    this.emit('end');
  })
  .pipe(gulp.dest('./app/assets/css'));

});
