var config = require('config');

var handleError = require(__dirname + '/error');
var easy = require(__dirname + '/../lib/auth-easy');/*[ if (use_auth_facebook) { ]*/
var facebook = require(__dirname + '/../lib/auth-facebook');/*[ } ]*/

module.exports = {
    index: function (req, res) {/*[ if (use_session) { ]*/
        var easyName = easy.getEasyName(req, res);/*[ if (use_auth_facebook) { ]*/
        var facebookToken = facebook.getUserToken(req.session);/*[ } ]*/

        res.render('index', {
            easy_name: easyName/*[ if (use_auth_facebook) { ]*/,
            is_facebook_user: !!facebookToken/*[ } ]*/
        });/*[ } else { ]*/
        res.render('index');/*[ } ]*/
    }/*[ if (use_session) { ]*/,
    easy: require(__dirname + '/easy')/*[ } ]*//*[ if (use_auth_facebook) { ]*/,
    facebook: require(__dirname + '/facebook')/*[ } ]*//*[ if (use_auth_soundcloud) { ]*/,
    soundcloud: require(__dirname + '/soundcloud')/*[ } ]*//*[ if (use_model) { ]*/,
    /*[= main_model_instance ]*/: require(__dirname + '//*[= main_model_instance ]*/')/*[ } ]*/
};
