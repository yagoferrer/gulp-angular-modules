
var through = require('through2');

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var path = require("path");
var stripComments = require("strip-comments");

// consts
const PLUGIN_NAME = 'gulp-angular-modules';

function angularModules(fileName, options)
{

    var opts = options || {};

    options.name = options.name || "gulp-angular-modules";

    if (!fileName) {
        throw new PluginError(PLUGIN_NAME, 'Missing Filename');
    }

    var list = [];

    var resultFile = new File({
        base: __dirname,
        cwd: __dirname,
        path: path.join(__dirname, fileName)
    });

    function getModuleNames(file, enc, cb){

        if (file.isNull()) {
            // do nothing if no contents
            cb();
            return false;
        }

        if (file.isStream()) {
            // Support streams?
            cb();
            return false;
        }

        var contents = file.contents.toString();

        var contents = stripComments(contents);

        var re = new RegExp(/\.module\((["'])([a-zA-Z0-9_.-]*)/);

        var matches = contents.match(re);

        if (matches && list.indexOf(matches[2]) === -1) {
            list.push(matches[2]);
        }

        cb();

    }

    function getContent()
    {
        if (options.modules)
        {
            list = list.concat(options.modules);
        }

        list.sort();

        var result;

        result = "(function (ng) {\n";
        result += "'use strict';\n";
        result += "ng.module('"+ options.name +"', ['"+ list.join("','") +"']);\n";
        result += "})(angular);";

        return result;
    }

    function sendBack(cb)
    {

        var content = getContent();

        resultFile.contents = new Buffer(content);

        this.push(resultFile);

        cb();

    }

    return through.obj(getModuleNames, sendBack);
}


module.exports = angularModules;
