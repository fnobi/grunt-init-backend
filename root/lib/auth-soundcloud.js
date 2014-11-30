var config = require('config');
var SoundCloudAPI = require('soundcloud-node');

var CLIENT_ID = config.soundcloud.client_id;
var CLIENT_SECRET = config.soundcloud.client_secret;
var REDIRECT_URI = config.locals.url + 'soundcloud/callback';

module.exports = {
    getClient: function () {
        return new SoundCloudAPI(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );
    },
    getClientWithToken: function (token) {
        var client = this.getClient();
        client.setToken(token);
        return client;
    },
    isAuthorized: function (session) {
        return !!this.getUserToken(session);
    },
    getUserToken: function (session) {
        return session.soundcloud_access_token;
    },
    setUserToken: function (session, token) {
        session.soundcloud_access_token = token;
    },
    deleteUserToken: function (session) {
        delete session.soundcloud_access_token;
    },
    getAuthURI: function () {
        var client = this.getClient();
        return client.getConnectUrl();
    },
    requestAccessToken: function (req, callback) {
        var code = req.param('code');
        var client = this.getClient();

        if (!code) {
            callback('invalid code.');
            return;
        }

        client.getToken(code, function (err, tokens) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, tokens.access_token);
        });
    }
};
