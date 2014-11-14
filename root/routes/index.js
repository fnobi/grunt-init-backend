var config = require('config');

var handleError = require(__dirname + '/error');
var easy = require(__dirname + '/../lib/auth-easy');

module.exports = {
    index: function (req, res) {/*[ if (use_session) { ]*/
        var easyName = easy.getEasyName(req, res);
        res.render('index', {
            easy_name: easyName
        });/*[ } else { ]*/
        res.render('index');/*[ } ]*/
    }/*[ if (use_session) { ]*/,
    easy: require(__dirname + '/easy')/*[ } ]*//*[ if (use_auth_soundcloud) { ]*/,
    soundcloud: require(__dirname + '/soundcloud')/*[ } ]*//*[ if (use_model) { ]*/,
    /*[= main_model_instance ]*/: require(__dirname + '//*[= main_model_instance ]*/')/*[ } ]*/
};
