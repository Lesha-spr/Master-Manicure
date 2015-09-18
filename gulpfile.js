var gulp = require('gulp');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');
var inject = require('gulp-inject');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('handlebars', function(){
    gulp.src('src/js/templates/**/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'MM.templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('templates', function() {
    var LOCALS = {};

    gulp.src('./src/templates/pages/**/*.jade')
        .pipe(jade({
            locals: LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('./build/templates/pages/'));
});

gulp.task('index', function() {
    gulp.src('./index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./'));
});

gulp.task('less', function() {
    return gulp.src(['src/styles/styles.less'])
    /**
     * Dynamically injects @import statements into the main app.less file, allowing
     * .less files to be placed around the app structure with the component
     * or page they apply to.
     */
        .pipe(inject(gulp.src(['./components/**/*.less'], {read: false, cwd: 'src/styles/'}), {
            starttag: '/* inject:imports */',
            endtag: '/* endinject */',
            transform: function (filepath) {
                return '@import ".' + filepath + '";';
            }
        }))
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/styles'));
});

gulp.task('compress', function() {
    var b = browserify({
        entries: 'src/js/initialize.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [babelify]
    });

    return b.bundle()
        .pipe(source('./app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function() {
    watch('./src/js/**/*', function() {
        gulp.run(['compress']);
    });

    watch('./src/styles/**/*', function() {
        gulp.run(['less']);
    });

    watch(['./src/templates/**/*', './index.jade'], function() {
        gulp.run(['templates', 'index']);
    });

    watch('./src/js/templates/**/*', function() {
        gulp.run(['handlebars']);
    });
});

gulp.task('build', ['index', 'templates', 'handlebars', 'compress', 'less']);
gulp.task('default', ['index', 'templates', 'handlebars', 'compress', 'less', 'watch']);