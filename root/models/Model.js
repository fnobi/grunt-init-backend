var mongoose = require('mongoose'),

    Schema = mongoose.Schema,
    {%= main_model %} = new Schema({
        id: {
            type: Number,
            index: { unique: true }
        }
    });

module.exports = mongoose.model('{%= main_model %}', {%= main_model %});