//connecting socket
let socket = io.connect();
//where all messages are shown
const targetMessages = document.getElementById('allMessagesBox');
//message that user inputs

//shows all messages
//there is currently a bug, the messages keep incrementing
function sendMessage () {
    let message = document.getElementById('messageBox').value;
    socket.emit('sendToAll', (message ));
    //socket.on kept incrementing the amount of times it was activated
    //I changed it to socket.once, so it will be called upon just once
    socket.once('displayMessage', (message) => {
        console.log(message)
        targetMessages.innerHTML += '<br>'+ message;
    });
}

//defines send to all button and adds event listener
const sendAllButton = document.getElementById('sendAll');
sendAllButton.addEventListener("click", sendMessage);
