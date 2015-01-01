## gulp-ng-inject [![NPM version](https://badge.fury.io/js/gulp-ng-inject.svg)](https://npmjs.org/package/ng-gulp-inject) [![Build Status](https://travis-ci.org/yagoferrer/gulp-ng-inject.svg?branch=master)](https://travis-ci.org/yagoferrer/gulp-ng-inject) [![Dependency Status](https://david-dm.org/yagoferrer/gulp-ng-inject.svg)](https://david-dm.org/yagoferrer/gulp-ng-inject)

This module helps you to detect when you are adding a new `Angular.js` module into your working directory to automatically load the file and include the module into your project.

### Inspiration
I love using [gulp-inject](https://github.com/klei/gulp-inject). It's a great tool that can take care of including your JavaScript and [bower](https://github.com/bower/bower) files into your `index.html` file. 

When working with `Angular.js`, I also wanted to include all my modules names as a depedency of my app.js file automatically. I always forget to add them! So I created `gulp-ng-inject` to never have do that this by hand again.

You can also watch files & when they change it can reload the browser for you in combination with [gulp-watch](https://github.com/floatdrop/gulp-watch) and [BrowserSync](https://github.com/shakyShane/browser-sync).

### How it works?

It creates a main module into a file that requires all your modules as a dependency. All you need to do is to include that file into your index.html and the module name into your `Angular.js` depedencies.

### Supports
- Adding a new module
- Renaming a module
- Removing a module
- 3rd party modules


### How to install
```
npm install gulp-ng-inject --save-dev
```

### Usage

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

## Example

Check out the example directory: [gulpfile.js](example/gulpfile.js), [index.html](example/index.html)


This is how the generated ng-inject.js will look like after the `ngInject` runs

```js
'use strict';
(function (ng) {
ng.module('ng-inject', ['module.name','another.module','ui.router']);
})(angular);
```
