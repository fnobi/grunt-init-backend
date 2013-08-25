var express = require('express'),
    http = require('http'),
    path = require('path'),
    config = require('config'),
    mongoose = require('mongoose'),

    app = express(),
    server = http.createServer(app);

// all environments setting
app.set('port', process.env.PORT || config.port);
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

mongoose.connect(config.mongodb.url);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

