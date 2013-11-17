var assert = require('chai').assert,

    mongoose = require('mongoose'),
    config = require('config'),
    async = require('async'),

    {%= main_model %} = require(__dirname + '/../models/{%= main_model %}'),
    TestApp = require(__dirname + '/../lib/test/TestApp');

describe('app', function () {
    var app = new TestApp(require(__dirname + '/../app'));

    before(function () {
        mongoose.connect(config.mongodb.url);
    });

    beforeEach(function (done) {
        {%= main_model %}.remove({}, done);
    });

    it('get {%= main_model_instance %} as json', function (done) {
        var name = 'hogehoge';

        async.series([function (next) {
            var {%= main_model_instance %} = new {%= main_model %}({
                name: name
            });
            {%= main_model_instance %}.save(next);
        }, function (next) {
            app.request({ path: '/{%= main_model_instance %}/' + name + '.json' }, function (err, res, body) {
                assert.equal(res.statusCode, '200');

                var json = JSON.parse(body);
                assert.equal(json.name, name);

                done();
            });
        }]);
    });

    it('get {%= main_model_instance %} as html', function (done) {
        var name = 'hogehoge';

        async.series([function (next) {
            var {%= main_model_instance %} = new {%= main_model %}({
                name: name
            });
            {%= main_model_instance %}.save(next);
        }, function (next) {
            app.request({ path: '/{%= main_model_instance %}/' + name }, function (err, res, body) {
                assert.equal(res.statusCode, '200');
                assert(body.indexOf(name) > 0);

                done();
            });
        }]);
    });
});
