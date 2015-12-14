var path = require('path');
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
var gulpCopy = require('gulp-copy');
var watch = require('gulp-watch');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/styles/icons/**/*.png').pipe(spritesmith({
        retinaSrcFilter: ['./src/styles/icons/**/*@2x.png'],
        retinaImgName: 'sprite@2x.png',
        imgName: 'sprite.png',
        cssName: 'sprite.less'
    }));

    var imgStream = spriteData.img
        .pipe(gulp.dest('./build/styles/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('./src/styles/'));

    return merge(imgStream, cssStream);
});

gulp.task('handlebars', ['partials'], function(){
    gulp.src('src/js/templates/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            root: 'module.exports',
            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('src/js/'));
});

gulp.task('partials', function() {
    // Assume all partials start with an underscore
    // You could also put them in a folder such as source/templates/partials/*.hbs
    gulp.src(['src/js/templates/partials/_*.hbs'])
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function(fileName) {
                    // Strip the extension and the underscore
                    // Escape the output with JSON.stringify
                    return JSON.stringify(path.basename(fileName, '.js').substr(1));
                }
            }
        }))
        .pipe(declare({
            root: 'module.exports',
            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat('partials.js'))
        .pipe(gulp.dest('src/js/'));
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

gulp.task('copy', function() {
    return gulp.src('./src/i/**/*')
        .pipe(gulpCopy('./build/i', {prefix: 2}));
});

gulp.task('less', ['sprite'], function() {
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

gulp.task('compress', ['handlebars'], function() {
    var b = browserify('src/js/initialize.js').transform("babelify", {presets: ["es2015"]});

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
    gulp.watch(['src/js/**/*.js', '!src/js/partials.js', '!src/js/templates.js'], ['compress']);
    gulp.watch('src/js/**/*.hbs', ['compress']);
    gulp.watch('src/styles/icons/*.png', ['sprite', 'less']);
    gulp.watch('src/styles/**/*.less', ['less']);
    gulp.watch('src/templates/**/*.jade', ['templates']);
    gulp.watch('src/i/**/*', ['copy']);
});

gulp.task('build', ['templates', 'sprite', 'copy', 'handlebars', 'compress', 'less']);
gulp.task('default', ['templates', 'sprite', 'copy', 'handlebars', 'compress', 'less', 'watch']);