var querystring = require('querystring');

var config = require('config');
var request = require('request');
var twitterAPI = require('node-twitter-api');

var TWITTER_AUTH_URI = 'https://api.twitter.com/oauth/authenticate';
var TWITTER_ACCESS_TOKEN_URI = 'https://api.twitter.com/oauth/access_token';

var CONSUMER_KEY = config.twitter.consumer_key;
var CONSUMER_SECRET = config.twitter.consumer_secret;
var REDIRECT_URI = config.locals.url + 'twitter/callback';

module.exports = {
    getClient: function (token) {
        return new twitterAPI({
            consumerKey: CONSUMER_KEY,
            consumerSecret: CONSUMER_SECRET,
            callback: REDIRECT_URI
        });
    },
    isAuthorized: function (session) {
        var accessTokenPair = this.loadAccessTokenPair(session);
        return accessTokenPair[0] && accessTokenPair[1];
    },
    loadAccessTokenPair: function (session) {
        return [
            session.twitter_access_token,
            session.twitter_access_token_secret
        ];
    },
    saveAccessTokenPair: function (session, token, tokenSecret) {
        session.twitter_access_token = token;
        session.twitter_access_token_secret = tokenSecret;
    },
    loadRequestTokenPair: function (session) {
        return [
            session.twitter_request_token,
            session.twitter_request_token_secret
        ];
    },
    saveRequestTokenPair: function (session, token, tokenSecret) {
        session.twitter_request_token = token;
        session.twitter_request_token_secret = tokenSecret;
    },
    clearAccessTokenPair: function (session) {
        delete session.twitter_access_token;
        delete session.twitter_access_token_secret;
    },
    getMe: function (session, callback) {
        var accessTokenPair = this.loadAccessTokenPair(session);
        var client = this.getClient();

        client.account(
            'verify_credentials',
            {},
            accessTokenPair[0],
            accessTokenPair[1],
            function(err, data, response) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            }
        );
    },
    getAuthURI: function (requestToken) {
        return TWITTER_AUTH_URI + '?' + querystring.stringify({
            oauth_token: requestToken
        });
    },
    requestRequestToken: function (session, callback) {
        var instance = this;
        var client = this.getClient();
        client.getRequestToken(function (err, requestToken, requestTokenSecret, results) {
            if (err) {
                callback(err);
                return;
            }
            instance.setRequestTokenPair(session, requestToken, requestTokenSecret);
            callback(null, requestToken);
        });
    },
    requestAccessToken: function (req, callback) {
        var session = req.session;
        var requestTokenPair = this.getRequestTokenPair(session);

        var oauthToken = req.param('oauth_token');
        var oauthVerifier = req.param('oauth_verifier');

        if (!oauthToken || requestTokenPair[0] != oauthToken) {
            callback('invalid request token.');
            return;
        }
        if (!oauthVerifier) {
            callback('invalid oauth verifier.');
            return;
        }

        var client = this.getClient();
        client.loadAccessToken(
            requestTokenPair[0],
            requestTokenPair[1],
            oauthVerifier,
            function (err, accessToken, accessTokenSecret, results) {
                if (err) {
                    callback(err);
                    return;
                }
                if (accessToken) {
                    callback(null, accessToken, accessTokenSecret);
                } else {
                    callback('fail to get access token.');
                }
            }
        );
    }
};
