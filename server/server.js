//requiring express and http to make it easier to host our client
const express = require('express');
const http = require('http')

//counter variable used to count amount of visitors
let counter = 0

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

//requires socket.io
const io = require('socket.io')(server);

//shows in client when a user has joined chatroom
io.on('connection', (socket) => {
    console.log(counter+' someone connected');
    counter++

    //socket to display username for messages to all
    socket.on('showUsername', (username) =>{
        io.emit("displayUsername", (username));
    });

    //socket to display username for messages to only the user themselves
    socket.on('showUsernamePrivate', (username) =>{
        socket.emit("displayUsername", (username));
    });

    //socket to display messages to everyone
    socket.on('sendToAll', (message) =>{
        io.emit("displayMessage", (message));
    });

    //socket to display messages to only the user themselves
    socket.on('sendToMe', (message) =>{
        socket.emit("displayMessage", (message));
    });

});
