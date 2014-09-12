ng-autoinject
=============

How to use it

```
require("ng-autoinject")({
    starttag: "/* modules-init */",
    endtag: "/* modules-end */",
    mainFile: "app/src/init/app.module.js",
    path: ["app/src/**/*.js"],
    exclude: ["app/src/_templates/*"],
    modules: ['ui.router']
});
````
