var config = require('config');
var async = require('async');

var handleError = require(__dirname + '/error');
var soundcloud = require(__dirname + '/../lib/auth-soundcloud');

module.exports = {
    login: function (req, res) {
        var client = soundcloud.getClient();
        res.redirect(301, client.getConnectUrl());
    },
    loginCallback: function (req, res) {
        var code = req.param('code');
        var client = soundcloud.getClient();

        client.getToken(code, function (err, tokens) {
            if (err) {
                return handleError(err, req, res);
            }

            client.getMe(function (err, user) {
                if (err) {
                    res.status(400);
                    return handleError(err, req, res);
                }

                soundcloud.setAccessToken(req, res, tokens.access_token);

                res.redirect('/');
            });
        });
    },
    stream: function (req, res) {
        var trackId = req.param('track_id');
        if (!trackId) {
            res.status(400);
            return handleError('track id is not specified.', req, res);
        }

        var accessToken = req.param('token') || soundcloud.getAccessToken(req, res);
        if (!accessToken) {
            res.status(400);
            return handleError('not authorized', req, res);
        }

        var client = soundcloud.getClientWithToken(accessToken);
        var apiPath = ['tracks', trackId, 'stream'].join('/');
        client.get('/' + apiPath, function (err, stream) {
            if (err) {
                return handleError(err, req, res);
            }
            res.redirect(302, stream.location);
        });
    }
};
