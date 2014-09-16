'use strict';

var ngInject = require("./index");

var gulp = require("gulp");

gulp.task("default", function() {

    var options = {
        name: "ng-inject",
        modules: ['ui.router']
    };

    return gulp.src('testing/app/src/**/*.js')
        .pipe(ngInject("ng-inject.js", options))
        .pipe(gulp.dest("dist/"))
});