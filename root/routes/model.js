var config = require('config');
var path = require('path');
var async = require('async');

var handleError = require(__dirname + '/error');

module.exports = {
    index: function (req, res) {
        var format = req.param('format');

        var models = res.app.get('models');
        var {%= main_model %} = models.{%= main_model %};

        {%= main_model %}.find({}, function (err, result) {
            if (err) {
                res.status(500);
                return handleError(err, req, res);
            }

            result = result || [];

            var {%= main_model_instance %}s = [];
            result.forEach(function ({%= main_model_instance %}) {
                {%= main_model_instance %}s.push({%= main_model_instance %}.json());
            });

            var json = {};
            json.{%= main_model_instance %}s = {%= main_model_instance %}s;

            if (format == 'json') {
                res.json(200, json);
            } else {
                res.render('{%= main_model_instance %}:index', json);
            }
        });
    },
    show: function (req, res) {
        var uid = req.param('uid');
        var format = req.param('format');
        
        var models = res.app.get('models');
        var {%= main_model %} = models.{%= main_model %};

        {%= main_model %}.findOne({
            uid: uid
        }, function (err, {%= main_model_instance %}) {
            if (err) {
                res.status(500);
                return handleError(err, req, res);
            }
            if (!{%= main_model_instance %}) {
                res.status(404);
                return handleError(err, req, res);
            }

            var json = {
                {%= main_model_instance %}: {%= main_model_instance %}.json()
            };

            if (format == 'json') {
                res.json(200, json);
            } else {
                res.render('{%= main_model_instance %}:show', json);
            }
        });
    },
    create: function (req, res) {
        var format = req.param('format');
        var name = req.param('name');
        
        var models = res.app.get('models');
        var {%= main_model %} = models.{%= main_model %};

        var {%= main_model_instance %} = new {%= main_model %}({
            name: name
        });

        {%= main_model_instance %}.save(function (err, {%= main_model_instance %}) {
            if (err) {
                if (err.code == 11000) { // duplicate key error
                    var uidTryCount = req.query.__uid_try || 0;
                    if (uidTryCount < config.uid_try_max_count) {
                        req.query.__uid_try = uidTryCount + 1;
                        return module.exports.create(req, res);
                    }
                }

                res.status(500);
                return handleError(err, req, res);
            }
            
            if (format == 'json') {
                res.json(200, {
                    {%= main_model_instance %}: {%= main_model_instance %}.json()
                });
            } else {
                res.redirect('/{%= main_model_instance %}/' + {%= main_model_instance %}.uid);
            }
        });
    }
};
