
const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
// const server = require('./listen.js')
const path = require('path');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;  // require MongoClient functionality
var  ObjectID = require('mongodb').ObjectID; //require ObjectID functionality
const formidable = require('formidable');

//Define port used for the server
const PORT = 3000;
const url = 'mongodb://localhost:27017';

//Apply express middleware
app.use(express.static(path.join(__dirname, '../dist/assignment1')));
app.use('/image',express.static(path.join(__dirname, './images')));
app.use(bodyParser.json());

app.use(cors());

MongoClient.connect(url, {poolSize:10,useNewUrlParser: true,useUnifiedTopology: true},function(err, client) {
    //Callback function code. When we have a connection start the rest of the app.
    if (err) {return console.log(err)}
        const dbName = 'assignment2';
        const db = client.db(dbName);

        require('./routes/api-login.js')(app, path, db, ObjectID, formidable);
        require('./routes/upload.js')(app, formidable);
        // require('./routes/add.js')(db, app);
        // require('./routes/read.js')(db,app);
        // require('./routes/update.js')(db,app, ObjectID);
        // // require('./routes/api-getlist.js')(db,app);
        // // require('./routes/api-getitem.js')(db,app,ObjectID);
        // // require('./routes/api-update.js')(db,app,ObjectID);
        // require('./routes/remove.js')(db,app,ObjectID);
        
    //Start the server listening on port 3000. Outputs message to console once server has started.(diagnostic only)
    require('./listen.js')(http);
    sockets.connect(io, PORT, db)

});

//Setup Socket
//sockets.connect(io, PORT)



//require('./routes/api-login.js')(app, path);
