var assert = require('chai').assert;

var mongoose = require('mongoose');
var config = require('config');
var async = require('async');

var models = require(__dirname + '/../models');
var /*[= main_model ]*/ = models./*[= main_model ]*/;

describe('/*[= main_model ]*/ model', function () {

    beforeEach(function (done) {
        /*[= main_model ]*/.remove({}, done);
    });

    it('create and find it', function (done) {
        var name = 'hogehoge';

        async.series([function (next) {
            var /*[= main_model_instance ]*/ = new /*[= main_model ]*/({
                name: name
            });
            /*[= main_model_instance ]*/.save(next);
        }, function (next) {
            /*[= main_model ]*/.findOne({ name: name }, function (err, /*[= main_model_instance ]*/) {
                if (err) {
                    return next(err);
                }
                assert(/*[= main_model_instance ]*/);
                next();
            });
        }], function (err) {
            assert(!err);
            done();
        });
    });

    it('create and remove it', function (done) {
        var name = 'mogemoge';

        async.series([function (next) {
            var /*[= main_model_instance ]*/ = new /*[= main_model ]*/({
                name: name
            });
            /*[= main_model_instance ]*/.save(next);
        }, function (next) {
            /*[= main_model ]*/.remove({
                name: name
            }, next);
        }, function (next) {
            /*[= main_model ]*/.findOne({
                name: name
            }, function (err, /*[= main_model_instance ]*/) {
                if (err) {
                    return next(err);
                }
                assert(!/*[= main_model_instance ]*/);
                next();
            });
        }], function (err) {
            assert(!err);
            done();
        });
    });
});
