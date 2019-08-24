const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
//const sockets = require('./socket.js');
const server = require('./listen.js')
const path = require('path');
var bodyParser = require('body-parser');

//Define port used for the server
const PORT = 3000;

//Apply express middleware
app.use(cors());

//Setup Socket
//sockets.connect(io, PORT)

//Start server listening for requests
server.listen(http, PORT);

users = [
    {
        username: "Runda",
        email: "Runda@com.au",
        password: "abc",
        role: "Super",
        groups: [],
        valid: false
    }
]