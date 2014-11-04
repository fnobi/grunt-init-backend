var config = require('config');

module.exports = {
    index: function (req, res) {{% if (use_session) { %}
        var userUid = req.session.user_uid;
        res.render('index', {
            user_uid: userUid
        });{% } else { %}
        res.render('index');{% } %}
    }{% if (use_session) { %},
    login: function (req, res) {
        var userUid = req.param('user_uid');
        if (!userUid) {
            res.json(400, {
                error: 'invalid login.'
            });
            return;
        }
        
        req.session.user_uid = userUid;
        res.redirect('/');
    },
    logout: function (req, res) {
        delete req.session.user_uid;
        res.redirect('/');
    }{% } %}{% if (use_model) { %},
    {%= main_model_instance %}: require(__dirname + '/{%= main_model_instance %}'){% } %}
};
