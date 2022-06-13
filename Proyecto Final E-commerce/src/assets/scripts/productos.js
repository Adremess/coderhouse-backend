
const productsTab = document.getElementById("nav-home");
const productsButton = document.getElementById("nav-home-tab");
const addProductTab = document.getElementById("nav-profile");
const addProductButton = document.getElementById("nav-profile-tab");


async function addCart(e) {
  e.preventDefault();
  const producto = {};
  for (let i = 0; i < 6; i++) {
    producto[`${e.target[i].name}`] = e.target[i].value;
  }
  await pushProduct(producto);
  return false;
}

async function pushProduct(prod) {
  return await fetch('http://localhost:3000/carrito', {
    method: 'POST',
    body: JSON.stringify(prod),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}
