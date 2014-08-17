module.exports = function (opts) {
    var param = opts.param || 'format';
    var router = opts.router || function () {};

    var REGEXP = /\.([\w]+)$/;

    return function (req, res, next) {
        var extMatch = req.url.match(REGEXP);
        if (extMatch) {
            var ext = extMatch[1];
            req.url = req.url.replace(REGEXP, '');
            req.query[param] = ext;
        }
        
        router(req, res, function () {
            if (req.param[param]) {
                req.url += req.param[param];
                delete req.query[param];
            }
            next();
        });
    };
};
