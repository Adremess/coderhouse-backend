const nombre = document.getElementById("InputNombre");
const usuario = document.getElementById("InputUsuario");
const email = document.getElementById("InputEmail");
const pwd = document.getElementById("InputPassword");
const requirements = document.querySelectorAll("#passwordHelpInline");
const formControl = document.querySelectorAll(".form-control");
const btn = document.querySelector(".btn");
btn.classList.add('disabled');

let complete = false;
let form = {
  nombre: false,
  usuario: false,
  email: false,
  password: false
}
const mayus = /[A-Z]/g;
const nums = /(?=.*\d)/
const caracteres = /[^\w.\xC0-\xFF]/g;

for(let i = 0; i < formControl.length; i++) {
  formControl[i].style.border = '1px solid rgba(255, 0, 0, .3)';
}

for(let i = 0; i < requirements.length; i++) {
  requirements[i].style.color = 'red';
}
nombre.addEventListener('keyup', (e) => {
  if(e.target.value != '') {
    formControl[0].style.border = '1px solid rgba(0, 255, 0, .7)';
    form.nombre = true;
    checkForm(form);
  } else {
    formControl[0].style.border = '1px solid rgba(255, 0, 0, .3)';
    form.nombre = false;
  }
});
usuario.addEventListener('keyup', (e) => {
  if(e.target.value != '') {
    formControl[1].style.border = '1px solid rgba(0, 255, 0, .7)';
    form.usuario = true;
    checkForm(form);
  } else {
    formControl[1].style.border = '1px solid rgba(255, 0, 0, .3)';
    form.usuario = false;
  }
});
email.addEventListener('keyup', (e) => {
  if(e.target.value != '') {
    formControl[2].style.border = '1px solid rgba(0, 255, 0, .7)';
    form.email = true;
    checkForm(form);
  } else {
    formControl[2].style.border = '1px solid rgba(255, 0, 0, .3)';
    form.email = false;
  }
});

pwd.addEventListener('keyup', (e) => {
  if (e.target.value.length >= 8) {
    requirements[0].style.color = 'green';
    complete++;
  } else {
    requirements[0].style.color = 'red'
  }
  
  if (e.target.value.match(nums)) {
    requirements[1].style.color = 'green';
    complete++;
  } else {
    requirements[1].style.color = 'red'
  }

  if (e.target.value.match(caracteres)) {
    requirements[2].style.color = 'green';
    complete++;
  } else {
    requirements[2].style.color = 'red'
  }

  if (e.target.value.match(mayus)) {
    requirements[3].style.color = 'green';
    complete++;
  } else {
    requirements[3].style.color = 'red'
  }
  let count = 0;
  for(let i = 0; i < requirements.length; i++) {
    if (requirements[i].style.color == 'green') {
      count++;
    } else {
      count--;
    }
  }
  
  if(count == 4) {
    form.password = true;
    formControl[3].style.border = '1px solid rgba(0, 255, 0, .7)';
    checkForm(form);
  } else {
    formControl[3].style.border = '1px solid rgba(255, 0, 0, .3)';
  }
});

function checkForm(obj) {
  let count = 0;
  for(let i = 0; i < Object.keys(obj).length; i++) {
    if (Object.values(obj)[i] === true) {
      count++;
    } else {
      count--;
    }
  }
  if (count === 4) {
    btn.classList.remove('disabled')
  } else {
    btn.classList.add('disabled')
  }
  // console.log(Object.values(obj).includes("false"));
  // if (Object.values(obj).includes("false")) {
  //   complete = true;
  //   btn.classList.remove('disabled')
  // } else {
  //   complete = false;
  //   btn.classList.add('disabled');
  // }
}
