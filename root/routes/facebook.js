var handleError = require(__dirname + '/error');
var facebook = require(__dirname + '/../lib/auth-facebook');

module.exports = {
    login: function (req, res) {
        res.redirect(facebook.getAuthURI());
    },
    loginCallback: function (req, res) {
        facebook.requestAccessToken(req, function (err, accessToken) {
            if (err) {
                res.status(500);
                handleError(err.data, req, res);
                return;
            }
            facebook.saveAccessToken(req.session, accessToken);
            res.redirect('/');
        });
    },
    logout: function (req, res) {
        facebook.clearAccessToken(req.session);
        res.redirect('/');
    },
    me: function (req, res) {
        facebook.getMe(req.session, function (err, data) {
            if (err) {
                res.status(500);
                handleError(err.data, req, res);
                return;
            }
            res.json(data);
        });
    }
};
