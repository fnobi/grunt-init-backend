var assert = require('chai').assert;
var TestApp = require(__dirname + '/../lib/test/TestApp');

describe('Index routing', function () {
    var app = new TestApp(require(__dirname + '/../app'));

    it('to /', function (done) {
        app.request({
            path: '/'
        }, function (err, res, body) {
            assert.equal(res.statusCode, '200');
            assert(body);
            done();
        });
    });
});
