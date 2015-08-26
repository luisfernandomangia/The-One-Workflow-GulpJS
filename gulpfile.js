var gulp        = require('gulp'),
    imagemin    = require('gulp-imagemin'),
    changed     = require('gulp-changed'),
    browserSync = require('browser-sync');
    htmlmin = require('gulp-htmlmin');
    cssmin = require('gulp-cssmin');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');
    
gulp.task('jpg', function() {
    gulp.src('./assets/img/*.jpg')
        .pipe(changed('./img/'))
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./dist/img/'));
});
 
gulp.task('browser-sync', function() {
    browserSync.init(['./dist/**'], {
        server: {
            baseDir: './',
            index: './dist/index.html'
        }
    });
});

gulp.task('minify', function() {
  return gulp.src('./assets/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('css-min', function () {
    gulp.src('assets/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('compress', function() {
  return gulp.src('assets/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
 
gulp.task('watch',['browser-sync', 'minify', 'css-min', 'compress'], function () {
    gulp.watch('./assets/js/src/*.js', ['compress']);
    gulp.watch('./assets/html/*.html', ['minify']);
    gulp.watch('./assets/css/src/*.css', ['css-min']);
    
});