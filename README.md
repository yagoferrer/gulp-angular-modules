# ng-inject

WORK IN PROGRESS


I love using [gulp-inject](https://github.com/klei/gulp-inject). It's a great task that can take care of dynamically including your JavaScript and [bower](https://github.com/bower/bower) files into your `index.html` file using for example [gulp-watch](https://github.com/floatdrop/gulp-watch) and [BrowserSync](https://github.com/shakyShane/browser-sync).

When I discoverted this, I also wanted to include all my long list of Angular modules as a depedency of my `Angular.js` application automatically. That's where `ng-inject` comes handy. 

When I'm writing a new Angular module, gulp: automatically adds the file into the `index.html`, includes the module name as a dependency in my project and reloads the browser so that I can see it working. How cool is that?


##Install
```
npm install git://github.com/yagoferrer/ng-autoinject.git#master --save-dev
```

##Usage

1) This is the only depedency you'll need into your `Angular.js` project: 'ng-inject'
```javascript
// app/src/main.js
angular.module('app', ['ng-inject']);
```


2) Create a task to run:


```javascript

var gulp = require("gulp");

var ngInject = require("ng-inject");

gulp.task("default", function() {

    var options = {
        name: "ng-inject", // The name of the module to use in your main Angular.js
        modules: ['ui.router'] // Any extra modules that you want to include.
    };

    return gulp.src(["!app/src/templates/*", "app/src/**/*.js"])
        .pipe(ngInject("ng-inject.js", options))
        .pipe(gulp.dest("app/src/init/"))
});
```

3) Make sure that the module path it's added to your index.html
```html
<script src="app/src/init/ng-inject.js">
```
