const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

//Compile Sass
gulp.task('sass', function(){
    gulp.src('../sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('../css'))
});

//Gulp Default
gulp.task('default', ['sass']);

//Gulp Watch
gulp.task('watch', function(){
    gulp.watch('./sass/*.scss', ['sass']);
    gulp.watch('./js/*', ['lint']);
});