var config = require('config');
var SoundCloudAPI = require('soundcloud-node');

module.exports = {
    getClient: function () {
        return new SoundCloudAPI(
            config.soundcloud.client_id,
            config.soundcloud.client_secret,
            config.soundcloud.redirect_uri
        );
    },
    getClientWithToken: function (token) {
        var client = this.getClient();
        client.setToken(token);
        return client;
    },
    getAccessToken: function (req, res) {
        return req.session.soundcloud_access_token;
    },
    setAccessToken: function (req, res, token) {
        req.session.soundcloud_access_token = token;
    }
};
