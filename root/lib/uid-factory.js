var LENGTH = 15;
var STRINGS = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789'
].join('');

module.exports = function (length) {
    length = isNaN(length) ? LENGTH : length;
    var str = [];
    for (var i = 0; i < length; i++) {
        str.push(STRINGS.substr(Math.floor(Math.random() * STRINGS.length), 1));
    }
    return str.join('');
};


