var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint');

// Convert sass to CSS and reload the browser
gulp.task('sass', function () {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./app/**/*.html')
      .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.scss'], ['html']);
  gulp.watch(['./app/scss/**/*.scss'], ['sass']);
  gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'] ['jshint']);
});

gulp.task('jshint', function() {
  return gulp.src('./app/scripts/**/*.js')
          .pipe(jshint('.jshintrc'))
          .pipe(jshint.reporter('jshint-stylish'))
          .pipe(jshint.reporter('fail'));
})

// Development server
gulp.task('server', function() {
  connect.server({
    root: './app',
    hostname: '0.0.0.0',
    port: 9000,
    livereload: true,
    // middleware: function(connect, opt) {
    //   return [ historyApiFallback ];
    // }
  });
});

gulp.task('default', ['server', 'watch']);
