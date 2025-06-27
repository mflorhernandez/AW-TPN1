const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.getElementById("carritoContainer");

function renderCarrito() {
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
    return;
  }

  contenedor.innerHTML = carrito.map((p, i) => `
    <div class="carrito-item">
      <h3>${p.title}</h3>
      <img src="${p.image}" width="100" />
      <p>Precio: $${p.price}</p>
      <p>Oferta: $${p.offerPrice}</p>
      <button onclick="eliminarProducto(${i})">Eliminar</button>
    </div>
  `).join("");
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}

renderCarrito();