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
var clientIncludeOrder = [];

var filepath = {
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
    }
  },
  concat: {
    client: {
      dest: 'dist/assets/js/client'
    },
    server: {
      dest: 'dist/assets/js/server'
    }
  },
  uglify: {
    client: {
      dest: 'dist/assets/js/clients'
    },
    server: {
      dest: 'dist/assets/js/server'
    }
  }
}

// gulp setup
var config = require('package.json');

//delete all files in the client distribution
gulp.task('clean-client', function() {
  return del(filepath.clean.client);
});

//delete all files in the server distribution
gulp.task('clean-server', function() {
  return del(filepath.clean.server);
});

//delete all files in the client and server distribution
gulp.task('clean', ['clean-client', 'clean-server']);

// Lint the client dev files.
gulp.task('lint', function() {
    return gulp.src(filepath.lint.client.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Lint the server dev files.
gulp.task('lint', function() {
    return gulp.src(filepath.lint.client.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Lint the client and server dev files
gulp.task('lint', ['lint-client', 'lint-server']);

//Uglify the files
gulp.task('uglify', function() {
    return gulp.src('js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest(dist/assets));
});

/**/
gulp.task('scripts', function() {
    return gulp.src(clientIncludeOrder)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//Refresh when files change
gulp.task('refresh', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'app.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	})
})

// Browserify task
gulp.task('browserify', function() {
/* Single point of entry (make sure not to src ALL your files,
browserify will figure it out for you)*/
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))

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

// Dev task
gulp.task('dev', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('watch');
});
  
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
