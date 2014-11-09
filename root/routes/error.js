module.exports = function (err, req, res) {
    var format = req.param('format');

    res.status(res.statusCode || 500);

    var json = {
        statusCode: res.statusCode,
        error: err || null
    };

    if (format == 'json') {
        res.json(json);
    } else {
        res.render('error', json);
    }
};
