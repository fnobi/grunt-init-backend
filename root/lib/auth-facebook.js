var qs = require('querystring');

var config = require('config');
var request = require('request');
var fbAPI = require('facebook-api');

var FACEBOOK_AUTH_URI = 'https://www.facebook.com/dialog/oauth';
var FACEBOOK_ACCESS_TOKEN_URI = 'https://graph.facebook.com/oauth/access_token';

var CLIENT_ID = config.facebook.app_id;
var CLIENT_SECRET = config.facebook.secret_key;
var REDIRECT_URI = config.locals.url + 'facebook/callback';

module.exports = {
    getClient: function (token) {
        return fbAPI.user(token || null);
    },
    isAuthorized: function (session) {
        return !!this.getUserToken(session);
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
        return FACEBOOK_AUTH_URI + '?' + qs.stringify({
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

        request(FACEBOOK_ACCESS_TOKEN_URI + '?' + qs.stringify({
            code: code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI
        }), function (err, response, body) {
            if (err) {
                callback(err);
                return;
            }
            var params = qs.parse(body);
            var accessToken = params.access_token;
            if (accessToken) {
                callback(null, accessToken);
            } else {
                callback('fail to get access token.');
            }
        });
    }
};
