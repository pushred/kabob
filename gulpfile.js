const browserify = require('browserify');
const gulp = require('gulp');
const gutil = require('gulp-util');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const run = require('run-sequence');
const source = require('vinyl-source-stream');
const watch = require('gulp-watch');

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
      require('postcss-easy-import')({ glob: true }),
      require('postcss-nested')
    ]))
    .on('error', handleError)
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('server/files'));
});

gulp.task('bundleJS', () => {
  const scripts = browserify({
    entries: 'browser/browser.js'
  });

  return scripts
    .bundle()
    .on('error', handleError)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('server/files'));
});

// dev

gulp.task('default', ['build'], () => {
  watch(['{browser,universal}/**/*.css'], () => {
    run('bundleCSS');
  });

  watch(['{browser,universal}/**/*.js'], () => {
    run('bundleJS');
  });
});
