var Schema = require('mongoose').Schema;

var {%= main_model %} = new Schema({
    name: {
        type: String,
        index: { unique: true }
    }
});

{%= main_model %}.methods = {
    json: function () {
        return {
            name: this.name
        };
    }
};

module.exports = {%= main_model %};
