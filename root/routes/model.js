var config = require('config');
var path = require('path');
var {%= main_model %} = require(__dirname + '/../models/{%= main_model %}');

module.exports = {
    get: function (req, res) {
        var file = req.param('name');
        var ext = path.extname(file) || '.html';
        var name = path.basename(file, ext);

        {%= main_model %}.findOne({
            name: name
        }, function (err, {%= main_model_instance %}) {
            if (!{%= main_model_instance %}) {
                res.json(404, {});
                return;
            }

            var options = config.options;
            options.{%= main_model_instance %} = {
                name: {%= main_model_instance %}.name
            };

            if (ext == '.json') {
                res.json(200, options.{%= main_model_instance %});
            } else {
                res.render('{%= main_model_instance %}', options);
            }
        });
    },
    post: function (req, res) {
        res.json(200, {});
    }
};





