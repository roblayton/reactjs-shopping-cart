var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    htmlReplace = require('gulp-html-replace'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    streamify = require('gulp-streamify'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    shell = require('gulp-shell');
 
var path = {
  HTML: 'src/index.html',
  CSS: 'src/css/styles.css',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  CSS_OUT: 'styles.css',
  MINIFIED_CSS_OUT: 'styles.min.css',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  DEST_CSS: 'dist/css',
  ENTRY_POINT: './src/js/App.js'
};
 
// DEVELOPMENT
gulp.task('copy', function(){
  gulp.src(path.CSS)
    .pipe(gulp.dest(path.DEST_CSS));
});
 
gulp.task('replace-html-src', function(){
  gulp.src(path.HTML)
    .pipe(htmlReplace({
      'js': 'src/' + path.OUT,
      'css': 'css/' + path.CSS_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});
 
gulp.task('watch', ['replace-html-src', 'copy'], function() {
  gulp.watch(path.HTML, ['replace-html-src']);
  gulp.watch(path.CSS, ['copy']);
 
  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
 
  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});
 
// PRODUCTION
gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('build-css', function() {
  gulp.src(path.CSS)
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.DEST_BUILD));
});
 
gulp.task('replace-html', function(){
  gulp.src(path.HTML)
    .pipe(htmlReplace({
      'js': path.MINIFIED_OUT,
      'css': path.MINIFIED_CSS_OUT
    }))
    .pipe(gulp.dest(path.DEST_BUILD));
});

// ---------

gulp.task('create-docker-machine', shell.task([
  'docker-machine create --driver virtualbox shoppingcart'
]));

// After creating the machine, make sure you run:
// docker-machine env shoppingcart | source

gulp.task('build-docker', shell.task([
  'docker-compose build'
]));

gulp.task('compose', ['build-docker'], shell.task([
  'docker-compose up -d'
]));

gulp.task('init-db', ['compose'], shell.task([
  'mongo --host $(docker-machine ip shoppingcart) main db_init.js --quiet'
]));

gulp.task('status', shell.task([
  'docker-compose ps shoppingcart'
]));

gulp.task('stop', shell.task([
  'docker-compose stop shoppingcart'
]));

gulp.task('destroy-docker-machine', shell.task([
  'docker-machine kill shoppingcart',
  'docker-machine rm shoppingcart'
]));

// ---------

gulp.task('prepare', ['create-docker-machine']);
gulp.task('provision', ['build-docker', 'compose', 'init-db']);

gulp.task('develop', ['watch']);
gulp.task('production', ['replace-html', 'build', 'build-css']);

gulp.task('clean', ['destroy-docker-machine']);
gulp.task('default', ['develop']);

