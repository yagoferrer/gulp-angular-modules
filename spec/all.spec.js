var File = require('vinyl');
var angularModules = require('../');

describe('when using gulp-angular-modules', function() {

    it("should return an Angular.js module with all the dependencies", function(done) {

        // create the fake file

        var fakeFile1 = new File({
            contents: new Buffer('ng.module("module.name", []); ')
        });

        var fakeFile2 = new File({
            contents: new Buffer('ng.module("module.name2", []); ')
        });

        // Create a plugin stream
        var myNgInject = angularModules("gulp-angular-modules.js", {name: "gulp-angular-modules"});

        // wait for the file to come back out
        myNgInject.on('data', function(file) {

            // make sure it came out the same way it went in
            expect(file.isBuffer()).toBeTruthy();

            var result = "(function (ng) {\n";
            result += "'use strict';\n";
            result += "ng.module('gulp-angular-modules', ['module.name','module.name2']);\n";
            result += "})(angular);";

            expect(file.contents.toString('utf8')).toEqual(result);

            done();

        });

        // write the fake file to it
        myNgInject.write(fakeFile1);
        myNgInject.write(fakeFile2);
        myNgInject.end();

    });

});