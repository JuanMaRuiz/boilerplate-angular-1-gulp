'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream,
    debug = require('gulp-debug');

// Search for css and js files inside project folder to inject it
gulp.task('inject', function() {
  var target = gulp.src('./app/index.html');
  var sources = gulp.src(['./app/scripts/**/*.js', './app/css/**/*.css']).pipe(debug());
  return target.pipe(inject(sources, {ignorePath: '/app'})).pipe(gulp.dest('./app/'));
});

// Inject libararies installed via Bower
 gulp.task('wiredep', function () {
   gulp.src('./app/index.html')
     .pipe(wiredep({
       directory: './app/lib'
     }))
     .pipe(gulp.dest('./app'));
 });

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
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/scss/**/*.scss'], ['css']);
  gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint', 'inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

// Check JS and search for errors shown it in terminal
gulp.task('jshint', function() {
  return gulp.src('./app/scripts/**/*.js')
          .pipe(jshint('.jshintrc'))
          .pipe(jshint.reporter('jshint-stylish'))
          .pipe(jshint.reporter('fail'));
});

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

gulp.task('default', ['server', 'inject', 'wiredep', 'watch']);
