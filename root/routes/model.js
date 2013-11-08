var {%= main_model %} = require(__dirname + '/../models/{%= main_model %}');

module.exports = {
    get: function (req, res) {
        var {%= main_model_instance %} = {%= main_model %}.find({
            id: req.param('id')
        });
        req.json(200, {%= main_model_instance %});
    },
    post: function (req, res) {
        req.json(200, {});
    }
};
