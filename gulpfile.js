var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlReplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
 
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
 
gulp.task('replaceHtmlSrc', function(){
  gulp.src(path.HTML)
    .pipe(htmlReplace({
      'js': 'src/' + path.OUT,
      'css': 'css/' + path.CSS_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});
 
gulp.task('watch', ['replaceHtmlSrc', 'copy'], function() {
  gulp.watch(path.HTML, ['replaceHtmlSrc']);
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

gulp.task('buildCss', function() {
  gulp.src(path.CSS)
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.DEST_BUILD));
});
 
gulp.task('replaceHtml', function(){
  gulp.src(path.HTML)
    .pipe(htmlReplace({
      'js': 'build/' + path.MINIFIED_OUT,
      'css': 'build/' + path.MINIFIED_CSS_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});
 
gulp.task('production', ['replaceHtml', 'build', 'buildCss']);
 
gulp.task('default', ['watch']);
