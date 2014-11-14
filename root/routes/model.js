var config = require('config');
var path = require('path');
var async = require('async');

var handleError = require(__dirname + '/error');

module.exports = {
    index: function (req, res) {
        var format = req.param('format');

        var models = res.app.get('models');
        var /*[= main_model ]*/ = models./*[= main_model ]*/;

        /*[= main_model ]*/.find({}, function (err, rows) {
            if (err) {
                res.status(500);
                return handleError(err, req, res);
            }

            var /*[= main_model_instance ]*/s = [];
            (rows || []).forEach(function (/*[= main_model_instance ]*/) {
                /*[= main_model_instance ]*/s.push(/*[= main_model_instance ]*/.json());
            });

            var locals = {};
            locals./*[= main_model_instance ]*/s = /*[= main_model_instance ]*/s;

            if (format == 'json') {
                res.json(200, locals);
            } else {
                res.render('/*[= main_model_instance ]*/:index', locals);
            }
        });
    },
    show: function (req, res) {
        var uid = req.param('uid');
        var format = req.param('format');
        
        var models = res.app.get('models');
        var /*[= main_model ]*/ = models./*[= main_model ]*/;

        /*[= main_model ]*/.findOne({
            uid: uid
        }, function (err, row) {
            if (err) {
                res.status(500);
                return handleError(err, req, res);
            }
            if (!row) {
                res.status(404);
                return handleError(err, req, res);
            }

            var locals = {
                /*[= main_model_instance ]*/: row.json()
            };

            if (format == 'json') {
                res.json(200, locals);
            } else {
                res.render('/*[= main_model_instance ]*/:show', locals);
            }
        });
    },
    create: function (req, res) {
        var format = req.param('format');
        var name = req.param('name');
        
        var models = res.app.get('models');
        var /*[= main_model ]*/ = models./*[= main_model ]*/;

        var /*[= main_model_instance ]*/ = new /*[= main_model ]*/({
            name: name
        });

        /*[= main_model_instance ]*/.saveWithRetry(config.uid_try_max_count, function (err, /*[= main_model_instance ]*/) {
            if (err) {
                return handleError(err, req, res);
            }
            if (format == 'json') {
                res.json(200, {
                    /*[= main_model_instance ]*/: /*[= main_model_instance ]*/.json()
                });
            } else {
                res.redirect('//*[= main_model_instance ]*//' + /*[= main_model_instance ]*/.uid);
            }
        });
    }
};
