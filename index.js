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

            list.push(matches[1]);

            cb();
        }, inject);
    }

    function escapeForRegExp(str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    function getReplacementText() {
        var replacement = options.starttag + "\n";

        list = list.concat(options.modules);

        list.sort();

        for (var item in list) {
            replacement += "'" + list[item] + "',\n";
        }

        replacement += options.endtag;

        return replacement;
    }

    function getTextToReplace(contents) {
        var re = new RegExp('(' + escapeForRegExp(options.starttag) + ')(\\s*)(\\n|\\r|.)*?(' + escapeForRegExp(options.endtag) + ')', 'gi');

        var matches = contents.match(re);

        return matches[0];
    }

    function inject() {

        var fs = require('fs');

        fs.readFile(options.mainFile, 'utf8', function (err, contents) {

            if (err) {
                return console.log(err);
            }

            var result = contents.replace(getTextToReplace(contents), getReplacementText());

            fs.writeFile(options.mainFile, result, 'utf8', function (err) {
                if (err) return console.log(err);
            });

        });
    }

    var paths = options.path;

    options.exclude.push(options.mainFile);

    _.each(options.exclude, function(item) {
        paths.push("!" + item);
    });


    vfs.src(paths).pipe(getModuleNames());
};



