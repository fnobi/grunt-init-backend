var Schema = require('mongoose').Schema;
var uidFactory = require(__dirname + '/../lib/uid-factory');

var {%= main_model %} = new Schema({
    uid: {
        type: String,
        index: { unique: true },
        default: uidFactory
    },
    name: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

{%= main_model %}.methods = {
    json: function () {
        return {
            uid: this.uid,
            name: this.name,
            created_at: this.created_at
        };
    }
};

module.exports = {%= main_model %};
