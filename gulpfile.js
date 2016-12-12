/**
 * Created by Thomas
 */

// gulp.js einbauen
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');

gulp.task('images', () =>
gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'))
);

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});