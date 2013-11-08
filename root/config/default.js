module.exports = {
    port: {%= port %},
    mongodb: {
        url: 'mongodb://localhost/{%= name %}'
    },

    options: {
        title: "{%= name %}",
        description: "{%= description %}"
    }
};
