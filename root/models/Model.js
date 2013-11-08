var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var {%= main_model %} = new Schema({
    id: {
        type: Number,
        index: { unique: true }
    }
});

module.exports = mongoose.model('{%= main_model %}', {%= main_model %});
