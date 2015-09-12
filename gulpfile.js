var gulp = require('gulp');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var clean = require('gulp-clean');
var zip = require('gulp-zip');

var appName = 'die-fast-js13k-2015';

gulp.task('minify_js', function() {
  return gulp.src([
    "js/jsfxr.js",
    "js/input.js",
    "js/group.js",
    "js/player.js",
    "js/objects.js",
    "js/pills.js",
    "js/rainbows.js",
    "js/collisions.js",
    "js/medikit.js",
    "js/camera.js",
    "js/particles.js",
    "js/traps.js",
    "js/map.js",
    "js/levels.js",
    "js/triggers.js",
    "js/sensors.js",
    "js/sounds.js",
    "js/hud.js",
    "js/init.js",
    "js/constants.js",
    "js/functions.js",
    "js/game.js",
  ])
  .pipe(concat('all.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('min'));
});

gulp.task('minify_css', function() {
  return gulp.src('style.css')
  .pipe(minifyCSS())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('min'));
});

gulp.task('minify_html', ['minify_js', 'minify_css'], function() {
  var pattern = /<!-- Begin imports -->([\s\S]*)<!-- End imports -->/;

  return gulp.src(['index.html'])
  .pipe(replace(pattern, '<script src="all.min.js"></script>'))
  .pipe(replace(/style.css/, 'style.min.css'))
  .pipe(gulp.dest('min'))
  .on('end', function() {
    return gulp.src('min/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('min'));
  });
});

gulp.task('clean', function() {
  gulp.src('min/*.zip', {read: false})
  .pipe(clean());
  gulp.src('min/*.css', {read: false})
  .pipe(clean());
  gulp.src('min/*.js', {read: false})
  .pipe(clean());
  gulp.src('min/*.html', {read: false})
  .pipe(clean());
});

gulp.task('build', ['minify_html'], function() {
  var s = size();
  gulp.src(['min/all.min.js', 'min/index.html', 'min/style.min.css'])
  .pipe(zip(appName + '.zip'))
  .pipe(s)
  .pipe(gulp.dest('min'))
  .on('end', function() {
    var r = 13312 - s.size;
    console.log('Remaining size: ', r, 'bytes');
  });
});

//gulp.task('closure', function() {
//  var files = glob.sync('js/*.js');
//
//  files.map(function(file) {
//    exec('java -jar compiler.jar --language_in ECMASCRIPT5 --js ' + file + ' --js_output_file min/' + file + '.min');
//  });
//});
