var gulp = require('gulp'),
deleteFolder = require ('del'),
rename = require('gulp-rename'),
rev = require ('gulp-rev'),
usemin = require ('gulp-usemin'),
cssmin = require('gulp-cssmin'),
imagemin = require('gulp-imagemin'),
uglifyjs = require('uglify-es'),
composer = require('gulp-uglify/composer'),
pump = require('pump'),
minify = composer(uglifyjs, console);

//clean build folders
gulp.task('deleteBuildFolders', function(){
  return deleteFolder('./docs'), deleteFolder('./dist');
})

//minify, version and remap to latest version in the html files.
//copy everything except devassets and css initially
//usmin will grab only required css
gulp.task('build-html-css', ['build-css', 'build-scripts'], function () {
  return gulp.src(
    [
      './app/**/*.html'
    ]
  )
  .pipe(usemin({
    css:  [
      function() {return rev()},
      function() {return cssmin()},
      function() {return rename({suffix: '.min'})}
    ],
    js:   [
      function(){return rev()},
      function() {var options = {}; return minify(options)}
    ]
  }))
  .pipe(gulp.dest('./docs'))
  .pipe(gulp.dest('./dist/public'));
});


gulp.task('build-images', function(){
  return gulp.src(['./app/assets/images/**/*'])
  .pipe(imagemin({
    verbose: true,
    progressive: true,
    interlaced: true,
    multipass: true
  }))
    .pipe(gulp.dest('./docs/assets/images'))
    .pipe(gulp.dest('./dist/public/assets/images'));
});


gulp.task('copy-fav', function(){
  return gulp.src(['./app/fav/**/*'])
    .pipe(gulp.dest('./docs/fav'))
    .pipe(gulp.dest('./dist/public/fav'));
});


gulp.task('build', ['deleteBuildFolders', 'build-html-css', 'build-images', 'build-scripts', 'copy-fav']);
