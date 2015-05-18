var File = require('vinyl');
var angularModules = require('../');

describe('when using gulp-angular-modules', function() {

    var response;
    beforeEach(function() {
        response = "(function (ng) {\n";
        response += "'use strict';\n";
        response += "ng.module('gulp-angular-modules', %s);\n";
        response += "})(angular);";
    });

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
            var result = response.replace('%s', "['module.name','module.name2']");
            expect(file.contents.toString('utf8')).toEqual(result);
            done();
        });

        // write the fake file to it
        myNgInject.write(fakeFile1);
        myNgInject.write(fakeFile2);
        myNgInject.end();

    });

    it('should not include commented lines', function(done) {

        // create the fake file

        var fakeFile1 = new File({
            contents: new Buffer('//ng.module("module.name", []); ')
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
            var result = response.replace('%s', "['module.name2']");
            expect(file.contents.toString('utf8')).toEqual(result);
            done();

        });

        // write the fake file to it
        myNgInject.write(fakeFile1);
        myNgInject.write(fakeFile2);
        myNgInject.end();

    });

});