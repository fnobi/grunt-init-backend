var assert = require('chai').assert,

    mongoose = require('mongoose'),
    config = require('config'),

    {%= main_model %} = require('../models/{%= main_model %}'),
    TestApp = require('../lib/test/TestApp');

describe('app', function () {
    var app = new TestApp(require('../app'));

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
