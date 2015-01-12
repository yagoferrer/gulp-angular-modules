'use strict';

var angularModules = require("./index");

var gulp = require("gulp");

gulp.task("default", function() {

    var options = {
        name: "gulp-angular-modules",
        modules: ['ui.router']
    };

    return gulp.src('testing/app/src/**/*.js')
        .pipe(angularModules("gulp-angular-modules.js", options))
        .pipe(gulp.dest("dist/"))
});