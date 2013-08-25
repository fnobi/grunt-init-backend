module.exports = {
    port: {%= port + 1 %},
    mongodb: {
        url: 'mongodb://localhost/{%= name %}_test'
    }
};