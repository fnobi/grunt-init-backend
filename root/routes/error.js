module.exports = function (err, req, res) {
    var format = req.param('format');

    var json = {
        statusCode: res.statusCode,
        error: err ? err.toString() : null
    };

    if (format == 'json') {
        res.json(json);
    } else {
        res.render('error', json);
    }
};
