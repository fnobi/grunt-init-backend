var config = require('config');

module.exports = {
    getEasyName: function (req, res) {
        return req.session.easy_name;
    },
    setEasyName: function (req, res, name) {
        req.session.easy_name = name;
    },
    deleteEasyName: function (req, res) {
        delete req.session.easy_name;
    }
};
