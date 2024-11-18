const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInp = document.getElementById("messageInp");
const messageContainer = document.querySelector(".contianer");
const notificationContainer = document.querySelector(".notification");
var audio = new Audio('alert.mp3')

console.log({ messageInp });

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  audio.play();
};

const notify = (userName) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = userName;
    messageElement.classList.add("notify");
    notificationContainer.append(messageElement);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInp.value;
  append(`You : ${message}`, "right");
  socket.emit("send", message);
  messageInp.value = "";
});
const userName = prompt("What's your name ?");
socket.emit("new-user-joined", userName);

socket.on("user-joined", (userName) => {
  notify(`${userName} joined the chat`);

});

socket.on("receive", (data) => {
  append(`${data?.name}: ${data?.message}`, "left");
});

socket.on("left", userName => {
    notify(`${userName} left the chat`)
})
