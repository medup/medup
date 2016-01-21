var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var mocha = require('gulp-mocha');
var casper = require('gulp-casperjs-options');
var karma = require('gulp-karma2');
var express = require('gulp-express');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');
var cssbeautify = require('gulp-cssbeautify');
var copy = require('gulp-copy');
var strip = require('gulp-strip-debug');
var del = require('del');

  // in what order should the files be concatenated
var clientIncludeOrder = require('./include.conf.js');

// gulp setup
var config = require('package.json');

// create a task called clean, which
// deletes all files in the listed folders
gulp.task('clean', function() {
  return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function() {
    return gulp.src('js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest(dist/assets));
});

// concat all the js files


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
