var config = require('config');

var handleError = require(__dirname + '/error');

module.exports = {
    index: function (req, res) {/*[ if (use_session) { ]*/
        var userUid = req.session.user_uid;
        res.render('index', {
            user_uid: userUid
        });/*[ } else { ]*/
        res.render('index');/*[ } ]*/
    }/*[ if (use_session) { ]*/,
    login: function (req, res) {
        var userUid = req.param('user_uid');
        if (!userUid) {
            res.status(400);
            return handleError('invalid login', req, res);
        }
        
        req.session.user_uid = userUid;
        res.redirect('/');
    },
    logout: function (req, res) {
        delete req.session.user_uid;
        res.redirect('/');
    }/*[ } ]*//*[ if (use_auth_soundcloud) { ]*/,
    soundcloud: require(__dirname + '/soundcloud')/*[ } ]*//*[ if (use_model) { ]*/,
    /*[= main_model_instance ]*/: require(__dirname + '//*[= main_model_instance ]*/')/*[ } ]*/
};
