//connecting socket
let socket = io.connect();

let username

//on page load, user fills in username
window.onload = function createUsername () {
    let user = prompt("Please enter your username: ", "I-Hate-He-Man69");
    if (user == null || user === " " || user === "") {
        username = "I-Love-He-Man69"
    }
    else {
        username = user;
    }
}

//where all messages are shown
const targetMessages = document.getElementById('allMessagesBox');

//sends the message to be shown by all
function sendMessageAll () {
    //message that the user inputs
    let message = document.getElementById('messageBox').value;
    socket.emit('sendToAll', (message));
    socket.emit('showUsername', (username))

}

//sends the message to be shown by only yourself
function sendMessageMyself () {
    //message that the user inputs
    let message = document.getElementById('messageBox').value;
    socket.emit('sendToMe', (message));
    socket.emit('showUsernamePrivate', (username))
}


//shows all messages
socket.on('displayMessage', (message) => {
    targetMessages.innerHTML += '<br>'+ message;
});

//displays username on messages that everyone can see
socket.on('displayUsername', (username) => {
    targetMessages.innerHTML += '<br>' + 'Sent by ' + username;
})

//defines send to all button and adds event listener
const sendAllButton = document.getElementById('sendAll');
sendAllButton.addEventListener("click", sendMessageAll);

//defines send to myself button and adds event listener
const sendMyselfButton = document.getElementById('sendMyself');
sendMyselfButton.addEventListener("click", sendMessageMyself);

