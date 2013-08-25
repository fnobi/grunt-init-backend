var express = require('express'),
    path = require('path'),
    config = require('config'),

    routes = require('./routes'),
    app = express();


// all environments setting
app.set('port', process.env.PORT || config.port);
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
}


// routing
app.get('/', routes.index);


module.exports = app;