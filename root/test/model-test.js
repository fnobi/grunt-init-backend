var assert = require('chai').assert,

    mongoose = require('mongoose'),
    config = require('config'),

    {%= main_model_class %} = require('../models/{%= main_model_class %}'),
    TestApp = require('../lib/test/TestApp');

describe('app', function () {
    var app = new TestApp(require('../app'));

    before(function () {
        mongoose.connect(config.mongodb.url);
    });

    beforeEach(function (done) {
        {%= main_model_class %}.remove({}, done);
    });

    it('get /{%= main_model %}', function (done) {
        {%= main_model_class %}.findOne({}, function (err, {%= main_model %}) {
            assert(!err);
            done();
        });
    });
});