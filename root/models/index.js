module.exports = (function (classes) {
    var mongoose = require('mongoose');
    var config = require('config');
    
    var db = mongoose.createConnection(config.mongodb.url);

    var models = {};
    classes.forEach(function (model) {
        models[model] = db.model(model, require(__dirname + '/' + model));
    });

    return models;
})([
    '/*[= main_model ]*/'
]);
