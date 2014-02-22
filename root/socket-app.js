module.exports = function (io) {
    io.sockets.on('connection', function (socket) {
        console.log('[connection: %s]', socket.id);

        socket.on('disconnect', function () {
            console.log('[disconnect: %s]', this.id);
        });
    });
};
