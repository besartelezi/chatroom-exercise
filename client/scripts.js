//connecting socket
let socket = io.connect();
//where all messages are shown
const targetMessages = document.getElementById('allMessagesBox');

//sends the message to be shown by all
function sendMessageAll () {
    //message that the user inputs
    let message = document.getElementById('messageBox').value;
    socket.emit('sendToAll', (message));
}

//sends the message to be shown by only yourself
function sendMessageMyself () {
    //message that the user inputs
    let message = document.getElementById('messageBox').value;
    socket.emit('sendToMe', (message));
    console.log('button works')

}

//shows all messages
socket.on('displayMessage', (message) => {
    console.log('display works')
    targetMessages.innerHTML += '<br>'+ message;

});

//defines send to all button and adds event listener
const sendAllButton = document.getElementById('sendAll');
sendAllButton.addEventListener("click", sendMessageAll);

//defines send to myself button and adds event listener
const sendMyselfButton = document.getElementById('sendMyself');
sendMyselfButton.addEventListener("click", sendMessageMyself)