var handleError = require(__dirname + '/error');
var twitter = require(__dirname + '/../lib/auth-twitter');

module.exports = {
    login: function (req, res) {
        twitter.requestRequestToken(req.session, function (err, requestToken) {
            if (err) {
                res.status(500);
                handleError(err.data, req, res);
                return;
            }
            res.redirect(twitter.getAuthURI(requestToken));
        });
    },
    loginCallback: function (req, res) {
        twitter.requestAccessToken(req, function (err, accessToken, accessTokenSecret) {
            if (err) {
                res.status(500);
                handleError(err.data, req, res);
                return;
            }
            twitter.saveAccessTokenPair(req.session, accessToken, accessTokenSecret);
            res.redirect('/');
        });
    },
    logout: function (req, res) {
        twitter.clearAccessTokenPair(req.session);
        res.redirect('/');
    },
    me: function (req, res) {
        twitter.getMe(req, function (err, data) {
            if (err) {
                res.status(500);
                handleError(err.data, req, res);
                return;
            }
            res.json(200, data);
        });
    }
};
