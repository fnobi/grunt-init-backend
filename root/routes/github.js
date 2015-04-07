var handleError = require(__dirname + '/error');
var github = require(__dirname + '/../lib/auth-github');

module.exports = {
    login: function (req, res) {
        res.redirect(github.getAuthURI());
    },
    loginCallback: function (req, res) {
        github.requestAccessToken(req, function (err, accessToken) {
            if (err) {
                res.status(500);
                handleError(err.data, req, res);
                return;
            }
            github.saveAccessToken(req.session, accessToken);
            res.redirect('/');
        });
    },
    logout: function (req, res) {
        github.clearAccessToken(req.session);
        res.redirect('/');
    },
    me: function (req, res) {
        github.getMe(req.session, function (err, data) {
            if (err) {
                res.status(500);
                handleError(err.data, req, res);
                return;
            }
            res.json(data);
        });
    }
};
