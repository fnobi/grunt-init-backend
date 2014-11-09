module.exports = {
    port: /*[= port ]*/,
    mongodb: {
        url: 'mongodb://localhost//*[= name ]*/'
    },
    uid_try_max_count: 5,
    cookie_secret: '/*[= name ]*/',/*[ if (use_session) { ]*/
    session_key: '/*[= name ]*/.sid',
    session_prefix: '/*[= name ]*/:',/*[ } ]*/
    locals: {
        title: '/*[= name ]*/',
        description: '/*[= description ]*/',
        url: 'http://localhost:/*[= port ]*//'
    }
};
