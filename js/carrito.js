import { navBar } from "../components/navbar.js";
import { footerContent } from "../components/footer.js";
import { pages } from "../components/pages.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  // Renderizar navbar
  if (header) {
    header.innerHTML = navBar;

    const isInCategorias = window.location.pathname.includes("/Categorias/");
    const prefix = isInCategorias ? "../" : "./";

    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (loginBtn) {
      const loginPage = pages.find(p => p.title === "Login");
      if (loginPage) {
        loginBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const href = loginPage.href.startsWith("./") ? prefix + loginPage.href.slice(2) : loginPage.href;
          window.location.href = href;
        });
      }
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("usuarioLogueado");
        window.location.href = "./login.html";
      });
    }
  }

  // Renderizar footer
  if (footer) {
    footer.innerHTML = footerContent;
  }

  // Carrito
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("carritoContainer");

  function renderCarrito() {
    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
      return;
    }

    contenedor.innerHTML = carrito.map((p, i) => `
      <div class="carrito-item mb-4">
        <h3>${p.title}</h3>
        <img src="${p.image}" width="100" />
        <p>Precio: $${p.price}</p>
        ${p.offerPrice ? `<p>Oferta: $${p.offerPrice}</p>` : ""}
        <button class="btn btn-danger" onclick="eliminarProducto(${i})">Eliminar</button>
      </div>
    `).join("");
  }

  window.eliminarProducto = function(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  }

  renderCarrito();
});
