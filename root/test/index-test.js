var assert = require('chai').assert,
    TestApp = require('../lib/test/TestApp');

describe('app', function () {
    var app = new TestApp(require('../app'));

    it('get /', function (done) {
        app.request({ path: '/' }, function (err, res, body) {
            assert.equel(res.statusCode, '200');
            assert(body);
            done();
        });
    });
});