const socket = io();
socket.emit('getProducts');

const tableBody = document.getElementById('tbody');
const formBtn = document.getElementById('formBtn');

const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');
const chatMsg = document.getElementById('chat-msg');
const chatMail = document.getElementById('chat-mail');

socket.on('productList', (data) => {

  if (!data.error && data.length > 0) {
    const htmlData = data.map((value) => {
      return `
        <tr>
            <td>${value.title}</td>
            <td>${value.price}</td>
            <td><img class='img-thumbnail' style="width: 250px; height: 250px;" src='${value.thumbnail}'> </td>
        </tr> `
    }).join(' ');
    tableBody.innerHTML = htmlData;
  }
});

socket.on('newMsg', data => {
  const date = new Date();
  const htmlData = data.map(value => {
    return `<b>${value.email}</b> [${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]: ${value.msg} <br>`
  }).join(' ');
  chatBox.innerHTML = htmlData;
});

formBtn.addEventListener('click', () => {
  socket.emit('newProduct');
});

chatBtn.addEventListener('click', e => {
  let msgInfo = {
    email: chatMail.value,
    msg: chatMsg.value,
  }
  socket.emit('chatMsg', msgInfo);
});
