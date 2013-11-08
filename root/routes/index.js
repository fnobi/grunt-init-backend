module.exports = {
    index: function (req, res) {
        res.render('index', { title: 'Express' });
    },
    {%= main_model_instance %}: require('./{%= main_model_instance %}')
};
