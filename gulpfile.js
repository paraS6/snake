
var paths = {
    images: {
        src: 'img/*',
        dest: 'build/img/'
    },
    scripts: {
        src: 'js/*',
        dest: 'build/js/'
    },
    styles: {
        src: 'css/*',
        dest: 'build/css/'
    },
};

// gulp.js einbauen
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var concat = require ('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');



var changeEvent = function(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};

gulp.task('css', function() {
    return gulp.src(paths.styles.src)
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('images', function() {
    gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
});

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){
    gulp.src(paths.scripts.src)
        .pipe(concat('min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch(paths.images.src, ['images']);
});

// Default Task
gulp.task('default', ['css', 'images', 'lint', 'scripts', 'watch']);