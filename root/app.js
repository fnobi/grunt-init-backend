var express = require('express');
var path = require('path');
var config = require('config');

var extParser = require(__dirname + '/lib/ext-parser');/*[ if (use_session) { ]*/
var RedisStore = require('connect-redis')(express);/*[ } ]*/

var routes = require(__dirname + '/routes');/*[ if (use_model) { ]*/
var models = require(__dirname + '/models');/*[ } ]*/

var app = express();


// =======================================================
//  all environments setting
// =======================================================

app.set('port', process.env.PORT || config.port);
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.cookieParser(config.cookie_secret));/*[ if (use_session) { ]*/
app.use(express.session({
    key: config.session_key,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1week
    store: new RedisStore({
        db: 1,
        prefix: config.session_prefix
    })
}));/*[ } ]*/
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
/*[ if (use_model) { ]*/
app.set('models', models);/*[ } ]*/


// =======================================================
//  routing
// =======================================================

app.get('/', routes.index);/*[ if (use_model) { ]*/

app.get('//*[= main_model_instance ]*/', routes./*[= main_model_instance ]*/.index);
app.post('//*[= main_model_instance ]*/', routes./*[= main_model_instance ]*/.create);
app.get('//*[= main_model_instance ]*//:uid', routes./*[= main_model_instance ]*/.show);/*[ } ]*//*[ if (use_session) { ]*/

app.post('/easy/login', routes.easy.login);
app.get('/easy/logout', routes.easy.logout);/*[ } ]*//*[ if (use_auth_twitter) { ]*/

app.get('/twitter/login', routes.twitter.login);
app.get('/twitter/logout', routes.twitter.logout);
app.get('/twitter/callback', routes.twitter.loginCallback);
app.get('/twitter/me', routes.twitter.me);/*[ } ]*//*[ if (use_auth_facebook) { ]*/

app.get('/facebook/login', routes.facebook.login);
app.get('/facebook/logout', routes.facebook.logout);
app.get('/facebook/callback', routes.facebook.loginCallback);
app.get('/facebook/me', routes.facebook.me);/*[ } ]*//*[ if (use_auth_soundcloud) { ]*/

app.get('/soundcloud/login', routes.soundcloud.login);
app.get('/soundcloud/logout', routes.soundcloud.logout);
app.get('/soundcloud/callback', routes.soundcloud.loginCallback);
app.get('/soundcloud/me', routes.soundcloud.me);
app.get('/soundcloud/stream/:track_id', routes.soundcloud.stream);/*[ } ]*//*[ if (use_auth_github) { ]*/

app.get('/github/login', routes.github.login);
app.get('/github/logout', routes.github.logout);
app.get('/github/callback', routes.github.loginCallback);
app.get('/github/me', routes.github.me);/*[ } ]*/


module.exports = app;
