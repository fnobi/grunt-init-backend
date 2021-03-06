var config = require('config');

var handleError = require(__dirname + '/error');/*[ if (use_session) { ]*/
var easy = require(__dirname + '/../lib/auth-easy');/*[ } ]*//*[ if (use_auth_twitter) { ]*/
var twitter = require(__dirname + '/../lib/auth-twitter');/*[ } ]*//*[ if (use_auth_facebook) { ]*/
var facebook = require(__dirname + '/../lib/auth-facebook');/*[ } ]*//*[ if (use_auth_soundcloud) { ]*/
var soundcloud = require(__dirname + '/../lib/auth-soundcloud');/*[ } ]*//*[ if (use_auth_github) { ]*/
var github = require(__dirname + '/../lib/auth-github');/*[ } ]*/

module.exports = {
    index: function (req, res) {/*[ if (use_session) { ]*/
        var easyName = easy.getEasyName(req, res);/*[ if (use_auth_twitter) { ]*/
        var hasTwitterUser = twitter.isAuthorized(req.session);/*[ } ]*//*[ if (use_auth_facebook) { ]*/
        var hasFacebookUser = facebook.getUserToken(req.session);/*[ } ]*//*[ if (use_auth_soundcloud) { ]*/
        var hasSoundcloudUser = soundcloud.isAuthorized(req.session);/*[ } ]*//*[ if (use_auth_github) { ]*/
        var hasGithubUser = github.isAuthorized(req.session);/*[ } ]*/

        res.render('index', {
            easy_name: easyName/*[ if (use_auth_twitter) { ]*/,
            has_twitter_user: hasTwitterUser/*[ } ]*//*[ if (use_auth_facebook) { ]*/,
            is_facebook_user: hasFacebookUser/*[ } ]*//*[ if (use_auth_soundcloud) { ]*/,
            has_soundcloud_user: hasSoundcloudUser/*[ } ]*//*[ if (use_auth_github) { ]*/,
            has_github_user: hasGithubUser/*[ } ]*/
        });/*[ } else { ]*/
        res.render('index');/*[ } ]*/
    }/*[ if (use_session) { ]*/,
    easy: require(__dirname + '/easy')/*[ } ]*//*[ if (use_auth_twitter) { ]*/,
    twitter: require(__dirname + '/twitter')/*[ } ]*//*[ if (use_auth_facebook) { ]*/,
    facebook: require(__dirname + '/facebook')/*[ } ]*//*[ if (use_auth_soundcloud) { ]*/,
    soundcloud: require(__dirname + '/soundcloud')/*[ } ]*//*[ if (use_auth_github) { ]*/,
    github: require(__dirname + '/github')/*[ } ]*//*[ if (use_model) { ]*/,
    /*[= main_model_instance ]*/: require(__dirname + '//*[= main_model_instance ]*/')/*[ } ]*/
};
