var querystring = require('querystring');

var config = require('config');
var request = require('request');
var fbAPI = require('facebook-api');

var CLIENT_ID = config.facebook.app_id;
var CLIENT_SECRET = config.facebook.secret_key;
var REDIRECT_URI = config.locals.url + 'facebook/callback';

module.exports = {
    getClient: function (token) {
        return fbAPI.user(token || null);
    },
    getUserToken: function (session) {
        return session.facebook_access_token;
    },
    setUserToken: function (session, token) {
        session.facebook_access_token = token;
    },
    deleteUserToken: function (session) {
        delete session.facebook_access_token;
    },
    getMe: function (req, callback) {
        var token = this.getUserToken(req.session);
        var client = this.getClient(token);
        client.me.info(callback);
    },
    getAuthURI: function () {
        return 'https://www.facebook.com/dialog/oauth?' + querystring.stringify({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI
        });
    },
    requestAccessToken: function (req, callback) {
        var code = req.param('code');

        if (!code) {
            callback('invalid code.');
            return;
        }

        request('https://graph.facebook.com/oauth/access_token?' + querystring.stringify({
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI
        }), function (err, response, body) {
            if (err) {
                callback(err);
                return;
            }
            var params = querystring.parse(body);
            var accessToken = params.access_token;
            if (accessToken) {
                callback(null, accessToken);
            } else {
                callback('fail to get access token.');
            }
        });
    }
};
