const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const message = document.getElementById('message');
const chatBox = document.querySelector('.chat-box');

const audio = new Audio('swiftly.mp3');

const name = prompt('Enter your name');

const appendElement = (message, position) => {
    const messageElement =  document.createElement('div');
    messageElement.innerText = message;
    console.log(message);
    messageElement.classList.add(`chat-box__${position}`);
    chatBox.append(messageElement);
    if(position === 'left'){
        audio.play();
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const messageInput = document.getElementById('message').value;
    appendElement(`${messageInput}`, 'right');
    socket.emit('send', messageInput);
    document.getElementById('message').value = '';
});

socket.emit('new-user-joined', name);

socket.on('user-joined', data => {
        appendElement(`${data} has Joined!`, 'left');
});

socket.on('receive', data => {
    appendElement(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', data=> {
    appendElement(`${data} left the chat!`, 'left');
});