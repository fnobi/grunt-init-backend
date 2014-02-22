var http = require('http');
var config = require('config');
var mongoose = require('mongoose');

var app = require(__dirname + '/app');


// create server
var server = http.createServer(app);

// init services
mongoose.connect(config.mongodb.url);{% if (use_socketio) { %}

// init socket.io
var io = require('socket.io').listen(server);{% }  %}

// listen
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});{% if (use_socketio) { %}

// listen socket events
require(__dirname + '/socket-app')(io);{% } %}
