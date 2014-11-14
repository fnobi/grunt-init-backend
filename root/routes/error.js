module.exports = function (err, req, res) {
    var format = req.param('format');

    res.status(res.statusCode || 500);

    var locals = {
        statusCode: res.statusCode,
        error: err || null
    };

    if (format == 'json') {
        res.json(locals);
    } else {
        res.render('error', locals);
    }
};
