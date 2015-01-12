/*
In this example I use [gulp-watch](https://github.com/floatdrop/gulp-watch) in combination with [gulp-inject](https://github.com/klei/gulp-inject) and `gulp-angular-modules`
to automatically inject module dependencies in the `index.html` and to create the `gulp-angular-modules.js` file
with all the module dependencies.
*/

var gulp = require('gulp');
var watch = require('gulp-watch');
var inject = require('gulp-inject');
var angularModules = require('gulp-angular-modules');
var browserSync = require('browser-sync');

var config = {
    baseDir:  'app/src',
    jsFolder: 'app/src/js/**',
    jsFiles:  'app/src/js/**/*.js',
    port: 3030
}

gulp.task('angularModules', function() {
    return gulp.src([config.jsFiles])
        .pipe(angularModules("gulp-angular-modules.js", {name: "gulp-angular-modules", modules: ['ui.router']}))
        .pipe(gulp.dest("app/src/init"));
});

gulp.task('server', function() {
    browserSync({
        server: {baseDir: config.baseDir},
        port: config.port
    });
});

// Make sure you listen for the entire directory: 'app/src/js/**'
// So that when we add a new file or folder, watch will reload the browser.
gulp.task('watch', function () {
    watch([config.jsFolder, config.jsFiles], function(e, cb) {
        browserSync.reload();
        gulp.start('js');
        cb();
    });
});

gulp.task('js', ['angularModules'], function () {

    return gulp.src(config.baseDir + '/index.html')
        .pipe(inject(gulp.src([config.jsFiles], {base: config.baseDir, read: true}), {relative: true}))
        .pipe(gulp.dest(config.baseDir));
});

gulp.task('default', ['js', 'watch', 'server']);