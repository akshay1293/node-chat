var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require("path");
var cors = require("cors");
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./src/routes/users');
var config = require('./config');


app.use(cors());

mongoose.connect(config.db);
mongoose.connection.on('error', () => {
    throw new Error("unable to connect to database");
});
mongoose.connection.on('connected', () => {
    console.log(`Connected to database`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes);


io.set('transports', ['websocket']);
io.on('connection', function (socket) {

    socket.on('join', function (data) {

        socket.join(data.id);
        console.log("joined by :" + data.user);
        io.sockets.in("5aa3a4bfa96aaf1d25398fe0").emit('msg', { msg: 'hello' });
    })

    // socket.on('chat message', function (data) {

    //     socket.emit('catch it', { message: data });
    // });
});
server.listen(config.port, function () {

    console.log("server is running...");
});