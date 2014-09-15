'use strict';

var vfs = require('vinyl-fs');
var through = require('through2');
var _ = require('lodash');


module.exports = function (options) {

    var list = [];

    options = options || {};


    function getModuleNames() {

        return through.obj(function (file, enc, cb) {

            var contents = file.contents.toString();
            var re = new RegExp(/.module\(\'([a-zA-Z0-9_.-]*)/);
            var matches = contents.match(re);

            if (matches) {
                list.push(matches[1]);
            }

            cb();
        }, inject);
    }

    function inject() {

        var fs = require('fs');

        list = list.concat(options.modules);

        list.sort();

        var result;

        result = "'use strict';\n";
        result += "(function (ng) {\n";
        result += "ng.module('"+ options.module.name +"', ['"+ list.join("','") +"']);\n";
        result += "})(angular);";


        fs.writeFile(options.module.path, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });


    }


    function getPaths()
    {
        var paths = options.path;

        _.each(options.exclude, function(item) {
            paths.push("!" + item);
        });

        return paths;
    }


    vfs.src(getPaths()).pipe(getModuleNames());
};



