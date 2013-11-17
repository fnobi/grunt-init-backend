var express = require('express');
var path = require('path');
var config = require('config');

var routes = require(__dirname + '/routes');
var app = express();


// =======================================================
//  all environments setting
// =======================================================

app.set('port', process.env.PORT || config.port);
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// =======================================================
//  development only setting
// =======================================================

if ('development' == app.get('env')) {
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
}


// =======================================================
//  routing
// =======================================================

app.get('/', routes.index);

app.get('/{%= main_model_instance %}/:name', routes.{%= main_model_instance %}.get);
app.get('/{%= main_model_instance %}/:name.:ext', routes.{%= main_model_instance %}.get);
app.post('/{%= main_model_instance %}', routes.{%= main_model_instance %}.post);


module.exports = app;
