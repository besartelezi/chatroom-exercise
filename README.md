# Chatrooms, the one true form of communication
For this assignment, we need to use NodeJS, Socket.io, and Javascript to set up a chatroom.
I might have some experience now under my belt in backend using PHP, but NodeJS is something completely different.
But at least I have some experience **using** chatrooms, so that might come in handy.
For now, I can only look forward to how the result of this awesome assignment will look like, and get there one small step at a time!
 
From this point, you can see the steps of the assignment we should follow.

---

### Steps
- [x] In the root of the project make a server and a client folder.
    - [x] In the server folder, make a server.js file
    - [x] In the client file make a html, css and js file. Link them in the html. 
- [x] In the server folder, do the <code>npm init</code> command.
    - [x] The default values for the following prompts are fine, but play around if you like.
    - [x] This will generate a package.json with some information about our project and it's dependencies.
- [x] Next we are going to install express
    - [x] <code>npm install express --save</code>
    - [x] Go take a look at the package.json, it's there!
- [x] In the server.js file, let's require express and http
    - [x] <code>const express = require('express');</code>
    - [x] <code>const http = require('http');</code>
- [x] We will use express and http to make it easy to host our client
    - [x] <code>const app = express();</code> To define our application
    - [x] <code>const clientPath = \`${__dirname}/../client\`;</code> To give the path to our client
    - [x] <code>app.use(express.static(clientPath));</code> To use express to host the client
    - [x] <code>const server = http.createServer(app);</code> To use http to serve the app that express provides
    - [x] One more step to get the server live
  ```
      server.listen(8080, () =>{
         console.log("server running on "+port);
      });
  ```
  - [x] <code>node server</code> and check your server out on localhost with the correct port!
- [x] Time to get socket.io installed
    - [x] <code>npm install socket.io --save</code>
    - [x] It's now inside of the package.json dependencies!
- [x] Time to set it up in the server
    - [x] <code>const io = require('socket.io')(server);</code> to require socket.io!
    - [x] The io variable is now the entry point of all the sockets connected to the server
- [x] The server now is ready to use socket.io, but for the client we still need to add the connection to socket.io
    - [x] Add ```<script src="/socket.io/socket.io.js"></script>``` above your other script in the client html.
    - [x] Add <code>let socket = io.connect();</code> to your script to define your socket.
- [x] Now we can start by making a connection from your client to your server
    - [x] In your server.js, add the following code
    - ```
      io.on('connection', (socket) => {
          console.log('someone connected');
      });
      ```
    - [x] If you open up your blank page at localhost 8080 nothing much will happen, but go take a look at the terminal which is running your server! In here you will see that someone connected!
- [x] At this moment you can connect with multiple devices to your server, try adding a little code to verify this.
    - [x] In your server make a counter: <code>let counter = 0</code>
    - [x] Change your console log in the connection to: <code>console.log(counter+' someone connected');</code>
    - [x] Make the counter go up by 1 every time someone connects.
    - [x] Now try connecting in 2 different browser tabs, in your terminal you will now see
      ```
        0 someone connected
        1 someone connected
        ```
    - As you can see you can now connect with multiple devices to the same server.
- [x] Now let's make something happen, add an input field, 2 buttons and a target div.
    - [x] The input will contain your message
    - [x] 1 button that sends this message to all connected clients
    - [x] 1 button that sends this message to you only
    - [x] A target div where all messages will be displayed
- [x] On click of a button, do an emit to the server. The server will receive this and react appropriately after we give the server the instructions of what to do on said action.
    - [x] For example, to send the message to everyone: <code>socket.emit('sendToAll', ('message'));</code>
    - [x] Your server will now receive the call 'sendToAll', now we need to write code to make it react appropriately
- [x] In the connection function in your server, add the following:
  ```
        socket.on('sendToAll', (message) =>{
            io.emit("displayMessage", (message));
        });
  ```
    - This is an observer that waits until the message "sendToAll" gets passed to the server.
    - When we press the button on the client, because of our emit on the client, the server will receive the 'sendToAll' call and execute the piece of code within on the server.
    - The io.emit on the server means that the server will now send the call to 'displayMessage' to ALL clients connected and also passes the message back as a parameter.
- [x] We have now sent the message from the client to the server, now we just need to receive it back from the server.
    - [x] In the client add:
  ```
        socket.on('displayMessage', (message) => {
            target.innerHTML += '<br>'+message;
        });
  ```
    - [x] So now your client is waiting for the call to 'displayMessage' and then it will add that message to your target div.
    - [x] Try connecting with a few browser tabs and sending messages to each other.
- [x] So now we can send a message to everyone, let's see if we can send some messages that only the sender can see.
    - [x] In your client, replicate the 'sendToAll' emit but now change it to be 'sendToMe'.
    - [x] Now in the server you also have to make an observer for the message "sendToMe", so go ahead and replicate the "sendToAll" observer in the server.
    - [x] Now instead of doing an io.emit, we are going to do a socket.emit. The difference here is that if you emit to io, all connected clients will receive the message, whereas the socket.emit will only send it back to the socket of which it received the message.
    - [x] Try it out by opening some tabs and send a message to yourself. If only that client can see it, and the others don't receive it you've completed this step
- [x] Now we have all the tools we need to make a basic chatroom. The requirements you need to add will come with a small tip on how to achieve them.

### Must-have features

- [ ] Make a UI that makes it easy for people to send messages in this chatroom.
- [x] It must be possible to send a message to everyone or to yourself
- [x] Make sure we can identify who sent the message through a username.
    - [x] We could make a local variable and prompt the user to choose a username
    - [x] We can then emit this username along with the sent message to keep track of who sent what.
- [ ] Make a list to show everyone who is connected to the chatroom
  - [x] Create a div
  - [x] Add some boilerplate names
  - [x] Add some styling, put it next to the chatroom
  - [x] Person joins the chatroom
  - [x] Person enters their username
  - [x] Client socket.emits this username to server
  - [x] Server adds that username to an array called allUserNames
  - [x] Server io.emits that array to the client
    - [x] Array of active users is able to be console logged
    - There are still a lot of bugs doing it this way, so I will look into the socket.id's
  - [ ] Function in client loops through this array according to its length, and shows every username on the screen
    - [ ] Find a way to delete usernames of users who aren't active anymore
      - Can't work with disconnect socket!!
      - [ ] Research socket #id's
      - [ ] Check for which socket id's are active, not which ones are removed.
      - [ ] Create array of only active socket #id's
      - [ ] Only show active sockets
      - [ ] Doing it this way, I should normally not be required to add a delete function if a user leaves the chatroom
- [ ] Implement something funny! The sky is the limit! (it can be very simple if you want)
   - For example, you could make a functionality to make someone else's font size obscurely small!
   - You could implement a feature where you can speak with someone else's username
   - AND SO MUCH MORE -> BE CREATIVE
   - 

### Nice-to-have features

- Instead of just asking for a username, we can make a user class with properties such as
    - username
    - password (if you make a login system)
    - avatar
    - font-color
    - ... whatever you want :D
    - ps: don't worry about security
- You can make different rooms to join by code
- Make it possible to send private messages to a person
- Add images, emojis, videos, gifs to your messages
- Bring back some features from MSN! (lol)
- Make a login / registration (a bit more difficult)
    - again, security is not a must
- PIMP IT

For the nice to haves, you definitely will need to research the documentation for a lot of them.
Go check it out at https://socket.io/docs/v4 

---

## Someone connected!
Getting a connection with the server went smoothly, but with the sockets is where I started to struggle more than I anticipated.
And that's all thanks to this piece of code:
````
let socket = io.connect();
````
When I placed in it in the server.js, I couldn't connect to the server anymore.
At first I thought I installed socket.io wrong, or there was something wrong with my require(socket.io).
But after some **very thorough** testing, this wasn't the case.
So I went back to the TO-DO list to repeat some steps and re-read the steps.

That's when I found the issue.
Because I was so concentrated on the server.js file, I completely forgot I made another JS file.
And apparently I had to add that piece of code to the scripts.js file.
Once I did that, everything worked smoothly.

At that moment the only thought in my head was "I thank the Lord that I don't have gargantuan hands" because the facepalm I did after this realization would've broken the sound barrier.

## Styling Gone Wrong! The Inner Turmoil of Bes-ART
When starting out on this assignment, I had but one goal in mind.
To throw away every single thought I had about good design, and create the most awful-looking, vile, grotesque, old-school chatroom imaginable.
Years of Art School, Graphic Designing and 'Less is More'-propaganda will be thrown away.

I do hope, that I do not lose my own humanity in the process, all for the sake of memes...
But all jokes aside, I do think this is a very good learning experience.
Until now, I have been using the 'Less is More' method, designing everything the way I'd like it to be.
But I think this has really narrowed down my way of thinking and just keeps me repeating the same stuff the entire time.

Trying to make it look as ugly as possible forces me to try out **a lot** of new stuff I'd normally never even imagine to try.
Making the UI look as ugly as possible, while still making it clear for the user how to use it.
That's my own personal goal.
I hope I can make myself proud on this assignment and achieve this personal goal of mine.

![alt-text](images/graphic_design_is_my_passion.jpg)

## Pro Tip #1, Did ya try turning it off and on again?
Just a small tip for my future self and all readers.
If you have a bug while working on Node.JS and you can't for the life of you understand what's going wrong.
Just restart the server.
Why, you may ask? Because...

![alt-text](images/60-percent.gif)

The amount of weird bugs that were fixed like this is both as staggering as it is headache-inducing.

