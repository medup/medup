var gulp = require('gulp');
/*----------  Testing  ----------*/
var tape = require('gulp-tape');
var tapColorize = require('tap-colorize');
var mocha = require('gulp-mocha');
var gulpProtractorAngular = require('gulp-angular-protractor');
/*----------  General  ----------*/
var gulpLoadPlugins = require('gulp-load-plugins');
var plugin = gulpLoadPlugins();
var vss = require('vinyl-source-stream');
var exec = require('child_process').exec;
/*----------  Lint  ----------*/
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
/*----------  Build  ----------*/
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');

/*======================================
=            Display Errors            =
======================================*/
var printBuildComplete = function() {
  var greenText = '\[\033[32m\] %s \[\033[m\]';
  console.log(greenText, '************************************************************');
  console.log(greenText, '*****                BUILD COMPLETED!                  *****');
  console.log(greenText, '************************************************************');
};

var printBuildError = function() {
  var redText = '\[\033[31m\] %s \[\033[m\]';
  console.log(redText, '************************************************************');
  console.log(redText, '*****               BUILD BREAKING ERROR!              *****');
  console.log(redText, '************************************************************');
};

var printDevComplete = function() {
  var cyanText = '\[\033[36m\] %s \[\033[m\]';
  console.log(cyanText, '************************************************************');
  console.log(cyanText, '*****               DEV BUILD COMPLETED!               *****');
  console.log(cyanText, '************************************************************');
};

var printWatchError = function() {
  var redText = '\[\033[31m\] %s \[\033[m\]';
  console.log(redText, '************************************************************');
  console.log(redText, '*****     ERROR OCCURED - EXIT THEN RESTART WATCH!     *****');
  console.log(redText, '************************************************************');
};

//used for error handling in tasks that would otherwise cause watch to fail silently
var watchErrorContinue = function(err) {
  var redText = '\[\033[31m\] %s \[\033[m\]';
  var message = 'YOUR CODE WILL NOT PASS BUILD DUE TO:\n' + err.message;
  console.log(redText, message);
  //emit end allows the watch task to continue
  this.emit('end');
};

/*============================
=            Lint            =
============================*/
gulp.task('lint', function() {
  return gulp
    .src(['client/www/app/**/*.js'])
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter(stylish))
    .on('error', watchErrorContinue);
});

// break on build error
gulp.task('lintStrict', function() {
  return gulp
    .src(['client/www/app/**/*.js'])
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter(stylish))
    .pipe(plugin.jshint.reporter('fail'))
    .on('error', printBuildError);
});

/*===============================
=            Testing            =
===============================*/
gulp.task('tape', function() {
  return gulp
    .src('client/www/test/unit/*.js')
    .pipe(tape({
      reporter: tapColorize()
    }));
});

gulp.task('mocha', function() {
  return gulp
    .src('server/qa/*.js', {
      read: false
    })
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('protractor', function(callback) {
  gulp
    .src(['client/www/test/e2e/*.js'])
    .pipe(gulpProtractorAngular({
      'configFile': 'client/www/protractor.config.js',
      'debug': true,
      'autoStartStopServer': true
    }))
    .on('error', function(e) {
      console.log(e);
    })
    .on('end', callback);
});

gulp.task('test', ['tape', 'mocha', 'protractor']);

/*=======================================
=            Starting Server            =
=======================================*/
gulp.task('hapi', function() {
  return plugin
    .nodemon({
      script: 'server/server.js',
      watch: ['server/**/*']
    }).on('error', printWatchError);
});

gulp.task('ionic', function() {
  exec('cd client && ionic serve', function(err, stdout, stderr) {});
});

gulp.task('run', ['hapi', 'ionic']);

gulp.task('watch', function() {
  return gulp
    .watch('client/www/app/**/*', ['dev'])
    .on('error', printWatchError);
});

/*=====================================
=            Build Project            =
=====================================*/
gulp.task('clean', function() {
  return gulp
    .src('build', {
      read: false
    })
    .pipe(clean());
});

gulp.task('production', function() {
  return gulp
    .src(['client/www/app/**/*.js', 'server/**/*.js', '!server/**/*test.js'])
    .pipe(concat('production.js'))
    .pipe(gulp.dest('build'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('production.min.js'))
    .pipe(gulp.dest('build'))
    .pipe(filesize())
    .on('error', printBuildError)
    .on('end', printBuildComplete);
});

/*=========================================
=            Terminal Commands            =
=========================================*/
gulp.task('dev', ['lint', 'watch', 'run'], printDevComplete);

gulp.task('build', ['lintStrict', 'clean', 'production']);

gulp.task('default', ['dev']);
