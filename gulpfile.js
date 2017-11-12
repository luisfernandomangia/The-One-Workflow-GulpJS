var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    htmlmin = require('gulp-htmlmin');
    browserSync = require('browser-sync');
    cssmin = require('gulp-cssmin');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');
    sass = require('gulp-sass');
    
gulp.task('images', () =>
    gulp.src('assets/img/*')
        .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({plugins: [{removeViewBox: true}]})
]))
        .pipe(gulp.dest('dist/img'))
);
 
gulp.task('browser-sync', function() {
    browserSync.init(['./dist/**'], {
        server: {
            baseDir: './dist/',
        }
    });
});

gulp.task('sass', function() {
  return  gulp.src('./assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css/'))
}); 

gulp.task('minify', function() {
  return gulp.src('./assets/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('css-min', function () {
    return gulp.src('./assets/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('compress', function() {
  return gulp.src('assets/js/main.js')
    .pipe(uglify())
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});
 
gulp.task('watch',['browser-sync','minify', 'css-min', 'compress', 'sass', 'images'], function () {
    gulp.watch('./assets/img/*', ['images']);
    gulp.watch('./assets/js/*.js', ['compress']);
    gulp.watch('./assets/html/*.html', ['minify']);
    gulp.watch('./assets/css/*.css', ['css-min']);
    gulp.watch('./assets/sass/*.scss', ['sass']); 
});