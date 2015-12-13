var gulp   = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var df     = require('dateFormat');

gulp.task('Build Xplug', function() {

  return gulp.src(
            [ 'source/header.js',
              'source/util.js',
              'source/page_designer_methods.js',
              'source/xplug_constructor.js',
              'source/main.js'
            ])
         .pipe(concat('xplug.js'))
         .pipe(header('// Built using Gulp. Built date: ${date}\n', {date : df() }))
         .pipe(gulp.dest('xplug_chrome_plugin/js'))
         .pipe(gulp.dest('xplug_firefox_plugin/ext/js'));

});
