var Schema = require('mongoose').Schema;
var uidFactory = require(__dirname + '/../lib/uid-factory');

var /*[= main_model ]*/ = new Schema({
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

/*[= main_model ]*/.methods = {
    json: function () {
        return {
            uid: this.uid,
            name: this.name,
            created_at: this.created_at
        };
    },
    createWithRetry: function (tryCount, callback) {
        var instance = this;
        instance.save(function (err, row) {
            if (err) {
                if (err.code == 11000 && tryCount > 0) {
                    // duplicate key error
                    process.nextTick(function () {
                        instance.saveWithRetry(tryCount - 1, callback);
                    });
                    return;
                }
                callback(err);
                return;
            }
            callback(null, row);
        });
    }
};

module.exports = /*[= main_model ]*/;
