//connecting socket
let socket = io.connect();

let username

//on page load, user fills in username
window.onload = function createUsername () {
    let user = prompt("Please enter your username: ", "I-Hate-He-Man69");
    if (user == null || user === " " || user === "") {
        username = "Loser-who-thinks-they-are-too-cool-for-usernames"
    }
    else if (user.includes("tim") || user.includes("sicco")) {
        window.location = "https://www.youtube.com/watch?v=J9cwsKHjTEk";
    }
    else {
        username = user;
    }
    socket.emit('newUser', (username))
}

//where all messages are shown
const targetMessages = document.getElementById('allMessagesBox');

const userList = document.getElementById('allUsersList');

//sends the message to be shown by all
function sendMessageAll () {
    //message that the user inputs
    let message = document.getElementById('messageBox').value;
    socket.emit('showUsername', (username))
    socket.emit('sendToAll', (message));
}

//sends the message to be shown by only yourself
function sendMessageMyself () {
    //message that the user inputs
    let message = document.getElementById('messageBox').value;
    socket.emit('showUsernamePrivate', (username))
    socket.emit('sendToMe', (message));
}

socket.on('showUsers', data => {
    userList.append(data[socket.id])
})

socket.on('onlineUsers', data => {
    showOnlineUsers(data);
})

function showOnlineUsers(array){
    userList.innerHTML = "";

    array.forEach(user =>{
        console.log(user)
        let list = document.createElement('li');
        list.innerText = user;
        userList.append(list);
    })

}





//displays username on messages that everyone can see
socket.on('displayUsername', (username) => {
    targetMessages.innerHTML += username + ': ';
})

//shows all messages
socket.on('displayMessage', (message) => {
    targetMessages.innerHTML += message + '<br>';
});

//defines send to all button and adds event listener
const sendAllButton = document.getElementById('sendAll');
sendAllButton.addEventListener("click", sendMessageAll);

//defines send to myself button and adds event listener
const sendMyselfButton = document.getElementById('sendMyself');
sendMyselfButton.addEventListener("click", sendMessageMyself);

