var assert = require('chai').assert,

    mongoose = require('mongoose'),
    config = require('config'),
    async = require('async'),

    {%= main_model %} = require(__dirname + '/../models/{%= main_model %}');

describe('app', function () {
    before(function () {
        mongoose.connect(config.mongodb.url);
    });

    beforeEach(function (done) {
        {%= main_model %}.remove({}, done);
    });

    it('insert and find {%= main_model_instance %}', function (done) {
        var name = 'hogehoge';

        async.series([function (next) {
            var {%= main_model_instance %} = new {%= main_model %}({
                name: name
            });
            {%= main_model_instance %}.save(next);
        }, function (next) {
            {%= main_model %}.findOne({ name: name }, function (err, {%= main_model_instance %}) {
                if (err) {
                    return next(err);
                }
                assert({%= main_model_instance %});
                next();
            });
        }], function (err) {
            assert(!err);
            done();
        });
    });

    it('insert and remove {%= main_model_instance %}', function (done) {
        var name = 'mogemoge';

        async.series([function (next) {
            var {%= main_model_instance %} = new {%= main_model %}({
                name: name
            });
            {%= main_model_instance %}.save(next);
        }, function (next) {
            {%= main_model %}.remove({
                name: name
            }, next);
        }, function (next) {
            {%= main_model %}.findOne({
                name: name
            }, function (err, {%= main_model_instance %}) {
                if (err) {
                    return next(err);
                }
                assert(!{%= main_model_instance %});
                next();
            });
        }], function (err) {
            assert(!err);
            done();
        });
    });
});
