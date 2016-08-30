var gulp            = require('gulp');
var concat          = require('gulp-concat');
var header          = require('gulp-header');
var jshint          = require('gulp-jshint');
var df              = require('dateFormat');
var strip_comments  = require('gulp-strip-comments');
var strip_debug     = require('gulp-strip-debug');
var notify          = require('gulp-notify');

gulp.task('Build Xplug', function() {

  return gulp.src(
            [ 'source/header.js',
              'source/xplug_language.js',
              'source/xplug_util.js',
              'source/page_designer_methods.js',
              'source/page_designer_style.js',
              'source/xplug_constructor.js',
              'source/xplug_feature_prevnext_page.js',
              'source/xplug_feature_daynight_mode.js',
              'source/xplug_feature_swap_grid.js',
              'source/xplug_storage.js',
              'source/xplug_menu.js',
              'source/xplug_powerbox.js',
              'source/xplug_configure.js',
              'source/xplug_prototypes.js',
              'source/main.js'
            ] )


        ///////////////////////////////////////////////////////////////////////
        // Build Google Chrome add-on
        ///////////////////////////////////////////////////////////////////////
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('xplug.js'))
         ///////////////////////////////////////////////////////////////////////
         // Build Google Chrome add-on
         ///////////////////////////////////////////////////////////////////////
        .pipe(header('// Built using Gulp. Built date: ${date}\n', {date : df() }))
        .pipe(gulp.dest('xplug_chrome_plugin/js'))
         //
         ///////////////////////////////////////////////////////////////////////
         // Special treatment of Firefox version of Xplug add-on
         ///////////////////////////////////////////////////////////////////////
         //
         // Strip all comments. Firefox human reviewers don't like comments.
         // Based on review feedback of Xplug v1.3.0.2 on 04-07-2016
         //
         .pipe(strip_comments())
         //
         // Strip all console statements. Firefox human reviewers don't like
         // console logging in production add-ons.
         // Based on review feedback of Xplug v1.3.0.2 on 04-07-2016
         //
         .pipe(strip_debug())
         ///////////////////////////////////////////////////////////////////////
         // Build Firefox add-on
         ///////////////////////////////////////////////////////////////////////
         .pipe(header('// Built using Gulp. Built date: ${date}\n', {date : df() }))
         .pipe(gulp.dest('xplug_firefox_plugin/ext/js'))

         // Built completed
         .pipe(notify('Built completed'));
});
