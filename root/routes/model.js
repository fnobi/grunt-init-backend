var config = require('config');
var path = require('path');
var async = require('async');

module.exports = {
    index: function (req, res) {
        var models = res.app.get('models');
        var {%= main_model %} = models.{%= main_model %};

        {%= main_model %}.find({}, function (err, result) {
            result = result || [];

            var json = [];
            result.forEach(function ({%= main_model_instance %}) {
                json.push({%= main_model_instance %}.json());
            });

            res.json(200, json);
        });
    },
    show: function (req, res) {
        var name = req.param('name');
        var format = req.param('format');
        
        var models = res.app.get('models');
        var {%= main_model %} = models.{%= main_model %};

        {%= main_model %}.findOne({
            name: name
        }, function (err, {%= main_model_instance %}) {
            if (!{%= main_model_instance %}) {
                return res.json(404, {});
            }

            var options = config.options;
            options.{%= main_model_instance %} = {%= main_model_instance %}.json();

            if (format == 'json') {
                res.json(200, options.{%= main_model_instance %});
            } else {
                res.render('{%= main_model_instance %}', options);
            }
        });
    },
    create: function (req, res) {
        var name = req.param('name');
        
        var models = res.app.get('models');
        var {%= main_model %} = models.{%= main_model %};

        async.series([function (next) {
            {%= main_model %}.findOne({ name: name }, function (err, {%= main_model_instance %}) {
                if ({%= main_model_instance %}) {
                    return res.json(400, {
                        error: 'name "' + name + '" has been used already.'
                    });
                }

                next();
            });
        }, function (next) {
            var {%= main_model_instance %} = new {%= main_model %}({
                name: name
            });

            {%= main_model_instance %}.save(function (err) {
                if (err) {
                    return res.json(500, {
                        error: err
                    });
                }

                return res.json(200, {%= main_model_instance %}.json());
            });
        }]);
    }
};
