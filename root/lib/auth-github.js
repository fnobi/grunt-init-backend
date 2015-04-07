var config = require('config');
var github = require('github-oauth-token');
var request = require('request');

var GITHUB_API_ROOT = 'https://api.github.com';

var CLIENT_ID = config.github.client_id;
var CLIENT_SECRET = config.github.client_secret;
var REDIRECT_URI = config.locals.url + 'github/callback';
var USER_AGENT = config.github.user_agent;

module.exports = {
    getClient: function () {
        return github({
            githubClient: CLIENT_ID,
            githubSecret: CLIENT_SECRET,
            baseURL: config.locals.url,
            callbackURI: '/github/callback',
            scope: 'user'
        });
    },
    getClientWithToken: function (token) {
        var client = this.getClient();
        client.setToken(token);
        return client;
    },
    isAuthorized: function (session) {
        return !!this.loadAccessToken(session);
    },
    loadAccessToken: function (session) {
        return session.github_access_token;
    },
    saveAccessToken: function (session, token) {
        session.github_access_token = token;
    },
    clearAccessToken: function (session) {
        delete session.github_access_token;
    },
    getAuthURI: function () {
        var client = this.getClient();
        return client.authorizeURL;
    },
    requestAccessToken: function (req, callback) {
        this.getClient().getAccessToken(req.url, callback);
    },
    request: function (method, path, session, callback) {
        var token = this.loadAccessToken(session);
        var client = this.getClient();
        var qs = {
            access_token: token
        };
        request[method]({
            url: GITHUB_API_ROOT + path,
            qs: qs,
            headers: {
                'User-Agent': USER_AGENT
            }
        }, function (err, response, body) {
            if (err) {
                callback(err);
                return;
            }
            if (response.statusCode < 300) {
                callback(null, JSON.parse(body));
            } else {
                callback(new Error(body));
            }
        });
    },
    getMe: function (session, callback) {
        this.request('get', '/user', session, callback);
    }
};
