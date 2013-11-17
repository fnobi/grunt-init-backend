var config = require('config');
var {%= main_model %} = require(__dirname + '/../models/{%= main_model %}');

module.exports = {
    get: function (req, res) {
        var ext = req.params('ext');

        {%= main_model %}.findOne({
            name: req.param('name')
        }, function (err, {%= main_model_instance %}) {
            var options = config.options;
            options.{%= main_model_instance %} = {
                name: {%= main_model_instance %}.name
            };

            if (ext == 'json') {
                res.json(200, options.{%= main_model_instance %});
            } else {
                res.render('{%= main_model_instance %}', opts);
            }
        });
    },
    post: function (req, res) {
        res.json(200, {});
    }
};





