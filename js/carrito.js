import { navBar } from "../components/navbar.js";
import { footerContent } from "../components/footer.js";

document.querySelector("header").innerHTML = navBar;
document.querySelector("footer").innerHTML = footerContent;

// Lógica del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


carrito.forEach(p => {
  if (!p.quantity) p.quantity = 1;
});

const contenedor = document.getElementById("carritoContainer");
const detalleLista = document.getElementById("detalleCompra");
const totalSpan = document.getElementById("totalCompra");

function renderCarrito() {
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
    detalleLista.innerHTML = "";
    totalSpan.textContent = "0.00";
    return;
  }

  carrito.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card mb-3";

    card.innerHTML = `
      <div class="row g-0">
        <div class="col-md-3">
          <img src="${p.image}" class="img-fluid rounded-start" alt="${p.title}">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <p class="card-text">${p.description || ""}</p>
            <div class="d-flex align-items-center mb-2">
              <button class="btn btn-outline-secondary btn-sm me-2" onclick="cambiarCantidad(${i}, -1)">-</button>
              <span class="me-2">${p.quantity}</span>
              <button class="btn btn-outline-secondary btn-sm me-3" onclick="cambiarCantidad(${i}, 1)">+</button>
              <strong>$${(p.offerPrice || p.price).toFixed(2)}</strong>
            </div>
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${i})">Eliminar</button>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  renderDetalle();
}

function cambiarCantidad(index, delta) {
  carrito[index].quantity += delta;
  if (carrito[index].quantity < 1) carrito[index].quantity = 1;
  guardarCarrito();
  renderCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  renderCarrito();
}

function renderDetalle() {
  detalleLista.innerHTML = "";
  let total = 0;

  carrito.forEach((p) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    const precioUnitario = p.offerPrice || p.price;
    li.innerHTML = `
      <span>${p.title} x${p.quantity}</span>
      <span>$${(precioUnitario * p.quantity).toFixed(2)}</span>
    `;
    detalleLista.appendChild(li);
    total += precioUnitario * p.quantity;
  });

  totalSpan.textContent = total.toFixed(2);
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.eliminarProducto = eliminarProducto;
window.cambiarCantidad = cambiarCantidad;

renderCarrito();