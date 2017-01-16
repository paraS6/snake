// Pfade für Dtaien
var paths = {
    images: {
        src: 'img/*',
        dest: './build/img/'
    },
    scripts: {
        src: 'js/*.js',
        dest: './build/js/'
    },
    styles: {
        src: 'css/*.css',
        dest: './build/css/'
    },
};

// gulp.js einbauen
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var concat = require ('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');


// CSS Datei minimieren
gulp.task('css', function() {
    return gulp.src(paths.styles.src)
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(paths.styles.dest));
});

// Bilder verlustfrei
gulp.task('images', function() {
    gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
});

gulp.task('lint', function() {
    return gulp.src(paths.scripts.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// JavaScript Dateien konkatenieren und Minimieren
gulp.task('scripts', function(){
    gulp.src(paths.scripts.src)
        .pipe(concat('min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
});

// Dateien beobachten bei Änderungen
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('img/*', ['images']);
});

// Default Task, wird beim Befehl "gulp" ausgeführt
gulp.task('default', ['css', 'images', 'lint', 'scripts', 'watch']);