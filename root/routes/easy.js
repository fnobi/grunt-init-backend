var config = require('config');

var handleError = require(__dirname + '/error');
var easy = require(__dirname + '/../lib/auth-easy');

module.exports = {
    login: function (req, res) {
        var easyName = req.param('easy_name');
        if (!easyName) {
            res.status(400);
            return handleError('invalid login.', req, res);
        }

        easy.setEasyName(req, res, easyName);
        res.redirect('/');
    },
    logout: function (req, res) {
        easy.deleteEasyName(req, res);
        res.redirect('/');
    }
};
