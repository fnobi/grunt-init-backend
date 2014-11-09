var assert = require('chai').assert;

var config = require('config');
var async = require('async');

var TestApp = require(__dirname + '/../lib/test/TestApp');

describe('/*[= main_model ]*/ routing', function () {
    var app = new TestApp(require(__dirname + '/../app'));
    
    var models = app.app.get('models');
    var /*[= main_model ]*/ = models./*[= main_model ]*/;

    before(function (done) {
        /*[= main_model ]*/.remove({}, done);
    });

    it('to //*[= main_model_instance ]*/', function (done) {
        app.request({
            path: '//*[= main_model_instance ]*/'
        }, function (err, res, body) {
            if (err) {
                return done(err);
            }

            assert.equal(res.statusCode, '200');
            assert(body);

            done();
        });
    });

    it('to //*[= main_model_instance ]*/.json', function (done) {
        app.request({
            path: '//*[= main_model_instance ]*/.json'
        }, function (err, res, body) {
            if (err) {
                return done(err);
            }

            assert.equal(res.statusCode, '200');
            assert(body);

            done();
        });
    });

    it('create and show /*[= main_model_instance ]*/', function (done) {
        var name = 'hogehoge';
        var uid;

        async.series([function (next) {
            app.request({ 
                method: 'POST',
                path: '//*[= main_model_instance ]*/.json',
                query: {
                    name: name
                }
            }, function (err, res, body) {
                if (err) {
                    return next(err);
                }

                assert.equal(res.statusCode, '200');
                assert(body.indexOf(name) > 0);

                var json = JSON.parse(body);
                uid = json./*[= main_model_instance ]*/.uid;

                next();
            });
        }, function (next) {
            app.request({
                path: '//*[= main_model_instance ]*//' + uid + '.json'
            }, function (err, res, body) {
                if (err) {
                    return next(err);
                }

                assert.equal(res.statusCode, '200');
                assert(body.indexOf(name) > 0);

                var json = JSON.parse(body);
                assert.equal(json./*[= main_model_instance ]*/.name, name);

                next();
            });
        }], done);
    });
});
