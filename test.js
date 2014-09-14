
var autoinject = require("./index");

autoinject({
    module: {name: "autoinject", path: "app/src/init/autoinject.js"},
    path: ["app/src/**/*.js"],
    exclude: ["app/src/_templates/*"],
    modules: ['ui.router']
})