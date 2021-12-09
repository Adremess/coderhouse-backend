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
    return `<b style="color: blue">${value.email}</b> [<span style="color: brown">${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.toLocaleString()}</span>]: <span style="color: green; font-family: 'italic';">${value.msg}</span> <br>`
  }).join(' ');
  chatBox.innerHTML = htmlData;
  chatMail.value = '';
  chatMsg.value = '';
});

formBtn.addEventListener('click', () => {
  socket.emit('newProduct');
});

chatBtn.addEventListener('click', e => {
  if (chatMail.value === '') {
    alert('Campo mail es obligatorio para utilizar el chat!');
    return;
  }
  let msgInfo = {
    email: chatMail.value,
    msg: chatMsg.value,
  }
  socket.emit('chatMsg', msgInfo);
});
