module.exports = {
    index: function (req, res) {
        res.render('index', { title: 'Express' });
    },
    {%= main_model %}: require('./{%= main_model %}')
};