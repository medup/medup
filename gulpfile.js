var gulp = require('gulp'),
  gutil = require('gulp-util'),
  bower = require('bower'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  sh = require('shelljs'),
  mocha = require('gulp-mocha'),
  casper = require('gulp-casperjs-options'),
  karma = require('gulp-karma2'),
  express = require('gulp-express'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  beautify = require('gulp-beautify'),
  cssbeautify = require('gulp-cssbeautify'),
  copy = require('gulp-copy'),
  strip = require('gulp-strip-debug'),
  del = require('del'),
  protractor = require('gulp-angular-protractor'),
  nodemon = require('gulp-nodemon'),
  notify = require('gulp-notify'),
  livereload = require('gulp-livereload'),
  browserify = require('gulp-browserify'),
  embedlr = require('gulp-embedlr'),
  lrserver = require('tiny-lr')();

  // in what order should the files be concatenated
var clientConcatOrder = [];
var serverConcatOrder = [];

var filePath = {
  dev: {
    client: 'client/www/app/app.js',
    server: 'server/server.js'
  }
  clean: {
    client: ['dist/assets/css', 'dist/assets/js/client', 'dist/assets/img'],
    server: 'dist/assets/js/server'
  },
  lint: {
    client: {
      src: 'client/www/app/**/*.js',
    },
    server: {
      src: ['server/server.js, server/qa/*.js']
    },
    test: {
      src: 'test/**/*.js'
    }
  },
  concat: {
    client: {
      src: clientConcatOrder,
      dest: 'dist/assets/js/client'
    },
    server: {serverConcatOrder,
      dest: 'dist/assets/js/server'
    }
  },
  sass: {
    src: 'client/scss/**/*.scss',
    dest: 'client/www/css'
  }
  minifyCss: {
    dest: 'dist/assets/css'
  }
  cssnano: {
    src: 'dist/assets/css',
    dest: 'dist/assets/css'
  }
  uglify: {
    client: {
      src: 'dist/assets/js/client/*.min' 
      dest: 'dist/assets/js/client'
    },
    server: {
      src: 'dist/assets/js/server/*.min' 
      dest: 'dist/assets/js/server'
    }
  }
}

// gulp setup
var config = require('package.json');

//delete all files in the client distribution
gulp.task('clean-client', function() {
  return del(filePath.clean.client);
});

//delete all files in the server distribution
gulp.task('clean-server', function() {
  return del(filePath.clean.server);
});

//delete all files in the client and server distribution
gulp.task('clean', ['clean-client', 'clean-server']);

// Lint the client dev files.
gulp.task('lint-client', function() {
  return gulp.src(filePath.lint.client.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Lint the server dev files.
gulp.task('lint-server', function() {
  return gulp.src(filePath.lint.client.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Lint the test files.
gulp.task('lint-test', function() {
  return gulp.src(filePath.lint.test.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Lint the client and server dev files
gulp.task('lint', ['lint-client', 'lint-server']);

//Uglify the client files
gulp.task('uglify-client', function() {
    return gulp.src(filePath.uglify.client.src)
      .pipe(uglify())
      .pipe(gulp.dest(filePath.uglify.client.dest));
});

//Uglify the server files
gulp.task('uglify-server', function() {
    return gulp.src(filePath.uglify.server.src)
      .pipe(uglify())
      .pipe(gulp.dest(filePath.uglify.server.dest));
});

//Uglify the client and server files
gulp.task('uglify', ['uglify-client', 'uglify-server']);

gulp.task('scripts-client', function() {
  return gulp.src(filePath.lint.client.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    .pipe(concat('main.js'))
    .pipe(gulp.dest(filePath.concat.client.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(filePath.uglify.client.dest))
    .pipe(notify({ message: 'Scripts-client task complete' }));
});

gulp.task('scripts-server', function() {
  return gulp.src(filePath.lint.server.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    .pipe(concat('main.js'))
    .pipe(gulp.dest(filePath.concat.server.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(filePath.uglify.server.dest))
    .pipe(notify({ message: 'Scripts-server task complete' }));
});

gulp.task('scripts', ['scripts-client', 'scripts-server']);

//Compile and minify the scss file 
gulp.task('sass', function(done) {
  gulp.src(filePath.sass.src)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(filePath.sass.dest))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(filePath.minifyCss.dest))
    .pipe(notify({ message: 'Styles task complete' }));
    .on('end', done);
});

// Dev task
gulp.task('dev', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('watch');
});

// Browserify task
gulp.task('browserify', function() {
/* Single point of entry (make sure not to src ALL your files,
browserify will figure it out for you)*/
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
};

gulp.task('watch', function() {
  gulp.watch(filePath.sass.src, ['sass']);
});

gulp.task('watch', ['lint'], function() {
// Watch our scripts
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);
});

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendfile('index.html', { root: 'dist' });
});

//Refresh when files change
gulp.task('refresh', function() {
  // listen for changes
  livereload.listen();
  // configure nodemon
  nodemon({
  // the script to run the app
    script: filePath.dev.server,
    ext: 'js'
  }).on('restart', function(){
  // when the app has restarted, run livereload.
    gulp.src(filePath.dev.server)
    .pipe(livereload())
    .pipe(notify('Reloading page, please wait...'));
  })
});

























  
gulp.task('default', ['sass']);

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
