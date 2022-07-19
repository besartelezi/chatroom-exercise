//requiring express and http to make it easier to host our client
const express = require('express');
const http = require('http');

//defining the application
const app = express();
//This gives the path to our client
const clientPath =`${__dirname}/../client/`;

//uses express to host the client
app.use(express.static(clientPath));
//use http to serve the app that express provides
const server = http.createServer(app);

//sets the server live
server.listen(8080, () =>{
    console.log("server running on "+8080);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('someone connected');
});
