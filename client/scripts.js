//connecting socket
let socket = io.connect();
//where all messages are shown
const targetMessages = document.getElementById('allMessagesBox');
//message that user inputs
let message = document.getElementById('messageBox').value;

//shows all messages
//there is currently a bug, the first message the user has input is the
function showMessage () {
    socket.emit('sendToAll', (message));
    socket.on('displayMessage', (message) => {
        targetMessages.innerHTML += '<br>'+message;
    });
}

//defines send to all button and adds event listener
const sendAllButton = document.getElementById('sendAll');
sendAllButton.addEventListener("click", showMessage);
