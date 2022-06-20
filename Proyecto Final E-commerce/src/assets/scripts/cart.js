const cantidad = document.querySelectorAll('#exampleInputCantidad');
const totalStrong = document.querySelectorAll('#totalStrong');
const totalTd = document.getElementById('totalTd');
const precioId = document.querySelectorAll('#precioId');

for (let i = 0; i < cantidad.length; i++) {
  cantidad[i].addEventListener('change', (e) => {
    const precio = precioId[i].textContent.slice(1);
    const precioFormateado = e.target.value * precio;
    totalStrong[i].textContent = `$${precioFormateado.toFixed(2)}`;
  });
}

async function removeFromCart(e) {
  const nombre = e.target[0].name;
  const producto = {};
  producto[`${nombre}`] = e.target[0].value;
  await pullProduct(producto);
  return false;
}

async function pullProduct(prod) {
  return await fetch('http://localhost:3000/carrito', {
    method: 'DELETE',
    body: JSON.stringify(prod),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}
