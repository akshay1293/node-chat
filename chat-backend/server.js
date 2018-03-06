var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require("path");
var cors = require("cors");

app.use(cors());


app.get("/", function (req, res) {

    //res.sendFile(path.join(__dirname + '/index.html'));
})
io.set('transports', ['websocket']);
io.on('connection', function (socket) {

    socket.on('chat message', function (data) {
        console.log(data.msg);
        socket.emit('catch it', { message: data.msg });
    });
});
server.listen(3002, function () {

    console.log("server is running...");
});