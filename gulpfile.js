var browserify = require('browserify');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var run = require('run-sequence');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');

function handleError (err) {
  gutil.log(err.toString());
  this.emit('end');
}

gulp.task('build', ['bundleCSS', 'bundleJS']);

// assets

gulp.task('bundleCSS', () => {
  return gulp
    .src('browser/index.css')
    .pipe(postcss([
      require('postcss-import')({ glob: true }),
      require('postcss-nested')
    ]))
    .on('error', handleError)
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('server/files'));
});

gulp.task('bundleJS', () => {
  var scripts = browserify({
    entries: 'browser/browser.js'
  });

  return scripts.bundle()
    .on('error', handleError)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('server/files'));
});

// dev

gulp.task('default', ['build'], () => {
  watch(['universal/**/*.css'], () => {
    run('bundleCSS');
  });

  watch(['universal/**/*.js'], () => {
    run('bundleJS');
  });
});
