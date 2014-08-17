var config = require('config');

module.exports = {
    index: function (req, res) {
        res.render('index');
    }{% if (use_model) { %},
    {%= main_model_instance %}: require(__dirname + '/{%= main_model_instance %}'){% } %}
};
