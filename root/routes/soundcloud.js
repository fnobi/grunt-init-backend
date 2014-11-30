var config = require('config');
var async = require('async');

var handleError = require(__dirname + '/error');
var soundcloud = require(__dirname + '/../lib/auth-soundcloud');

module.exports = {
    login: function (req, res) {
        res.redirect(soundcloud.getAuthURI());
    },
    loginCallback: function (req, res) {
        soundcloud.requestAccessToken(req, function (err, accessToken) {
            if (err) {
                res.status(500);
                handleError(err.data, req, res);
                return;
            }
            soundcloud.saveAccessToken(req.session, accessToken);
            res.redirect('/');
        });
    },
    logout: function (req, res) {
        soundcloud.clearUserToken(req.session);
        res.redirect('/');
    },
    me: function (req, res) {
        var accessToken = soundcloud.loadAccessToken(req.session);
        if (!accessToken) {
            res.status(400);
            handleError('not authorized.', req, res);
            return;
        }
        
        var client = soundcloud.getClientWithToken(accessToken);
        client.get('/me', function (err, data) {
            if (err) {
                handleError(err, req, res);
                return;
            }
            res.json(200, data);
        });
    },
    stream: function (req, res) {
        var trackId = req.param('track_id');
        if (!trackId) {
            res.status(400);
            handleError('track id is not specified.', req, res);
            return;
        }

        var accessToken = soundcloud.loadAccessToken(req.session);
        if (!accessToken) {
            res.status(400);
            handleError('not authorized', req, res);
            return;
        }

        var client = soundcloud.getClientWithToken(accessToken);
        var apiPath = '/' + ['tracks', trackId, 'stream'].join('/');

        client.get(apiPath, function (err, stream) {
            if (err) {
                handleError(err, req, res);
                return;
            }
            res.redirect(302, stream.location);
        });
    }
};
