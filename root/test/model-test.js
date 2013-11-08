var assert = require('chai').assert,

    mongoose = require('mongoose'),
    config = require('config'),

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

    it('get /{%= main_model_instance %}', function (done) {
        {%= main_model %}.findOne({}, function (err, {%= main_model_instance %}) {
            assert(!err);
            done();
        });
    });
});
