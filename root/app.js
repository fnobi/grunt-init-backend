var express = require('express');
var path = require('path');
var config = require('config');

var extParser = require(__dirname + '/lib/ext-parser');

var routes = require(__dirname + '/routes');{% if (use_model) { %}
var models = require(__dirname + '/models');{% } %}

var app = express();


// =======================================================
//  all environments setting
// =======================================================

app.set('port', process.env.PORT || config.port);
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(extParser({
    param: 'format',
    router: app.router
}));

// view locals setting
app.locals = config.locals;
app.locals.pretty = true; // jade output style


// =======================================================
//  development only setting
// =======================================================

if ('development' == app.get('env')) {
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
}


// =======================================================
//  init services
// =======================================================
{% if (use_model) { %}
app.set('models', models);{% } %}


// =======================================================
//  routing
// =======================================================

app.get('/', routes.index);
{% if (use_model) { %}
app.get('/{%= main_model_instance %}', routes.{%= main_model_instance %}.index);
app.post('/{%= main_model_instance %}', routes.{%= main_model_instance %}.create);
app.get('/{%= main_model_instance %}/:uid', routes.{%= main_model_instance %}.show);{% } %}


module.exports = app;
