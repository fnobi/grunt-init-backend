module.exports = {
    port: {%= port %},
    mongodb: {
        url: 'mongodb://localhost/{%= name %}'
    },
    uid_try_max_count: 5,
    locals: {
        title: "{%= name %}",
        description: "{%= description %}",
        url: "http://localhost:{%= port %}/"
    }
};
