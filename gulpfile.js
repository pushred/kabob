const browserify = require('browserify');
const gulp = require('gulp');
const gutil = require('gulp-util');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const run = require('run-sequence');
const source = require('vinyl-source-stream');
const watch = require('gulp-watch');

const browserSync = require('browser-sync').create();

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
      require('postcss-import'),
      require('postcss-custom-properties'), // leave :root for @apply
      require('postcss-apply'),
      require('postcss-nesting'),
      require('autoprefixer')
    ]))
    .on('error', handleError)
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('server/files'))
    .pipe(browserSync.stream());
});

gulp.task('bundleJS', () => {
  const scripts = browserify({
    entries: 'browser/browser.js'
  });

  return scripts
    .bundle()
    .on('error', handleError)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('server/files'))
    .on('finish', browserSync.reload);
});

// dev

gulp.task('default', ['build'], () => {
  browserSync.init({
    notify: false,
    open: false,
    proxy: 'localhost:' + process.env.PORT
  });

  watch(['{browser,universal}/**/*.css'], () => {
    run('bundleCSS');
  });

  watch(['{browser,universal}/**/*.{js,jsx}'], () => {
    run('bundleJS');
  });
});
