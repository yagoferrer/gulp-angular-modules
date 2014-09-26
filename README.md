# gulp-ng-inject [![NPM version](https://badge.fury.io/js/gulp-ng-inject.svg)](https://npmjs.org/package/ng-gulp-inject) [![Build Status](https://travis-ci.org/yagoferrer/gulp-ng-inject.svg?branch=master)](https://travis-ci.org/yagoferrer/gulp-ng-inject) [![Dependency Status](https://david-dm.org/yagoferrer/gulp-ng-inject.svg)](https://david-dm.org/yagoferrer/gulp-ng-inject)

I love using [gulp-inject](https://github.com/klei/gulp-inject). It's a great tool that can take care of including your JavaScript and [bower](https://github.com/bower/bower) files into your `index.html` file. 

When working with `Angular.js`, I also wanted to include all my modules names as a depedency of my app.js file automatically. I always forget to add them! So I created `gulp-ng-inject` to never have do that this by hand again.

You can also watch files & when they change it can reload the browser for you in combination with [gulp-watch](https://github.com/floatdrop/gulp-watch) and [BrowserSync](https://github.com/shakyShane/browser-sync).


##Install
```
npm install gulp-ng-inject --save-dev
```

##Usage

1) This is the only depedency you'll need into your `Angular.js` project: 'gulp-ng-inject'
```javascript
// app/src/main.js

angular.module('app', ['ng-inject']);
```


2) Create a task to run:


```javascript

// gulpfile.js

var gulp = require("gulp");
var ngInject = require("gulp-ng-inject");

gulp.task("default", function() {

    var options = {
        name: "ng-inject", // The name of the module to use in your main Angular.js
        modules: ['ui.router'] // Any extra modules that you want to include.
    };

    return gulp.src(["!app/src/templates/*", "app/src/**/*.js"])
        .pipe(ngInject("ng-inject.js", options)) // Name of the file generated
        .pipe(gulp.dest("app/src/init/")) // Destination folder
});
```

3) Make sure that the module path it's added to your index.html
```html
<script src="app/src/init/ng-inject.js">
```

## API

### ngInject(fileName, options)

#### fileName

Type: `string`

The destination fileName.

#### options

##### name

Type: `string`

The name of the module that you want to use.

##### modules

Type: `array`

List of additional modules to include.

###### Real world gulpfile.js example

In this example I use [gulp-watch](https://github.com/floatdrop/gulp-watch) in combination with [gulp-inject](https://github.com/klei/gulp-inject) and `gulp-ng-inject`
to automatically inject module dependencies in the `index.html` and to create the `ng-inject.js` file
with all the module depedencies.


```js
var gulp = require('gulp');
var watch = require('gulp-watch');
var inject = require('gulp-inject');
var ngInject = require('gulp-ng-inject');
var browserSync = require('browser-sync');

var config = {
    baseDir:  'app/src',
    jsFolder: 'app/src/js/**',
    jsFiles:  'app/src/js/**/*.js',
    port: 3030
}

gulp.task('ngInject', function() {
    return gulp.src([config.jsFiles])
        .pipe(ngInject("ng-inject.js", {name: "ng-inject", modules: ['ui.router']}))
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

gulp.task('js', ['ngInject'], function () {

    return gulp.src(config.baseDir + '/index.html')
        .pipe(inject(gulp.src([config.jsFiles], {base: config.baseDir, read: true}), {relative: true}))
        .pipe(gulp.dest(config.baseDir));
});

gulp.task('default', ['js', 'watch', 'server']);
```

###### Add inject tags in the index.html.

```html
<html>
<head>
</head>
<body>
<script src="../../bower_components/angular/angular.js"></script>
<!-- inject:js -->
<!-- endinject -->
</body>
</html>
```

This is how the generated ng-inject.js will look like after the `ngInject` runs

```js
'use strict';
(function (ng) {
ng.module('ng-inject', ['module.name','another.module','ui.router']);
})(angular);
```
