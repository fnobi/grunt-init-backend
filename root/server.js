var http = require('http'),
    config = require('config'),
    mongoose = require('mongoose'),

    app = require(__dirname + '/app');


// create server
var server = http.createServer(app);

// init services
mongoose.connect(config.mongodb.url);

// listen
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

