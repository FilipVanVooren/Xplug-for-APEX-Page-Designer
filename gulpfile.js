var gulp   = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var df     = require('dateFormat');

gulp.task('Build Xplug', function() {

  return gulp.src(
            [ 'source/header.js',
              'source/xplug_language.js',
              'source/xplug_util.js',
              'source/page_designer_methods.js',
              'source/page_designer_style.js',
              'source/xplug_constructor.js',
              'source/xplug_storage.js',
              'source/xplug_menu.js',
              'source/xplug_powerbox.js',              
              'source/main.js'
            ])
         .pipe(jshint())
         .pipe(jshint.reporter('default'))
         .pipe(concat('xplug.js'))
         .pipe(header('// Built using Gulp. Built date: ${date}\n', {date : df() }))
         .pipe(gulp.dest('xplug_chrome_plugin/js'))
         .pipe(gulp.dest('xplug_firefox_plugin/ext/js'));

});
