var assert = require('chai').assert;

var config = require('config');
var async = require('async');

var TestApp = require(__dirname + '/../lib/test/TestApp');

describe('app', function () {
    var app = new TestApp(require(__dirname + '/../app'));
    
    var models = app.app.get('models');
    var {%= main_model %} = models.{%= main_model %};

    before(function (done) {
        {%= main_model %}.remove({}, done);
    });

    it('create & show {%= main_model_instance %}', function (done) {
        var name = 'hogehoge';

        async.series([function (next) {
            app.request({ 
                method: 'POST',
                path: '/{%= main_model_instance %}?name=' + name
            }, function (err, res, body) {
                assert.equal(res.statusCode, '200');
                assert(body.indexOf(name) > 0);

                next();
            });
        }, function (next) {
            app.request({ path: '/{%= main_model_instance %}' }, function (err, res, body) {
                assert.equal(res.statusCode, '200');
                assert(body.indexOf(name) > 0);

                next();
            });
        }, function (next) {
            app.request({ path: '/{%= main_model_instance %}/' + name + '?format=json'}, function (err, res, body) {
                assert.equal(res.statusCode, '200');

                var json = JSON.parse(body);
                assert.equal(json.name, name);

                next();
            });
        }], done);
    });


    it('error on duplicating name', function (done) {
        var name = 'mogemoge';

        async.series([function (next) {
            app.request({ 
                method: 'POST',
                path: '/{%= main_model_instance %}?name=' + name
            }, function (err, res, body) {
                next();
            });
        }, function (next) {
            app.request({ 
                method: 'POST',
                path: '/{%= main_model_instance %}?name=' + name
            }, function (err, res, body) {
                assert.equal(res.statusCode, '400');

                next();
            });
        }], done);
    });
});
