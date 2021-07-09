const socket = io();

const name1 = prompt("Enter Your Name")

const divClass = document.querySelector(".border")
const form = document.getElementById("form")
const messageInput = document.getElementById("message_input")

socket.emit("user_joined", name1);

const append = (message, postion) => {

    const DivList = document.createElement("div")
    DivList.innerText = message
    DivList.classList.add('message')
    DivList.classList.add(postion)
    divClass.append(DivList)


}
socket.on("new_user", data => {
    append(`${data} joined The Chatt`, 'right')
    console.log(`${data} joined The Chatt`, 'right')
})

socket.on("receive", data => {
    append(`${data.name1} : ${data.message}`, 'left')

})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const message = messageInput.value;
    append(`You ${message}`, 'right')
    socket.emit("send", message)
    messageInput.value = "";

})