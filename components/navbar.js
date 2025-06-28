import { pages } from "./pages.js";

export const navBar = `
<nav class="navbar navbar-dark bg-dark navbar-expand-lg position-relative">
  <div class="container-fluid position-relative w-100">
    <a class="navbar-brand d-flex align-items-center" href="../index.html">
      <img src="../assets/Logo Tienda.png" alt="Logo Falalinda" class="logo-navbar">
    </a>

    <img src="../assets/logo grande.png" alt="Logo grande Falalinda"
         class="logo-navbar-center position-absolute top-50 start-50 translate-middle">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
      aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorías
          </a>
          <ul class="dropdown-menu">
            ${pages
              .filter(page => page.isCategory)
              .map(page => {
                const pathParts = window.location.pathname.split("/").filter(p => p !== "");
                const depth = pathParts.length - 1;
                const prefix = "../".repeat(depth);
                const href = page.href.startsWith("../")
                  ? prefix + page.href.replace("../", "")
                  : page.href;
                return `<li><a class="dropdown-item" href="${href}">${page.title}</a></li>`;
              })
              .join("")}
          </ul>
        </li>
      </ul>

      <div class="d-flex align-items-center" id="nav-buttons">
        ${(() => {
          const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
          const pathParts = window.location.pathname.split("/").filter(p => p !== "");
          const depth = pathParts.length - 1;
          const prefix = "../".repeat(depth);

          const filteredPages = pages.filter(page =>
            !["Ropa", "Tecnología", "Hogar"].includes(page.title)
          );

          let buttonsHTML = filteredPages
            .filter(page => !["Login", "Logout", "Registro"].includes(page.title))
            .map(page => {
              let btnClass = "btn btn-light";
              if (page.title === "Home") btnClass = "btn btn-home";
              const href = page.href.startsWith("./")
                ? prefix + page.href.slice(2)
                : prefix + page.href.replace("../", "");
              return `<a type="button" class="${btnClass} me-2" id="${page.title.toLowerCase()}-btn" href="${href}">${page.title}</a>`;
            })
            .join("");

          if (usuario) {
            buttonsHTML += `<span class="text-white me-2" id="user-greeting">Hola, ${usuario.nombre}</span>`;

            buttonsHTML += `
              <a href="${prefix}carrito.html" id="carrito-link" title="Ver carrito">
                <img src="${prefix}assets/carrito.ico" alt="Carrito" style="width:24px; height:24px;">
              </a>
            `;

            const logoutPage = pages.find(p => p.title === "Logout");
            if (logoutPage) {
              const href = logoutPage.href.startsWith("./")
                ? prefix + logoutPage.href.slice(2)
                : prefix + logoutPage.href.replace("../", "");
              buttonsHTML += `<a type="button" class="btn btn-danger ms-3" id="logout-btn" href="${href}">Logout</a>`;
            }

          } else {
            const loginPage = pages.find(p => p.title === "Login");
            if (loginPage) {
              const href = loginPage.href.startsWith("./")
                ? prefix + loginPage.href.slice(2)
                : prefix + loginPage.href.replace("../", "");
              buttonsHTML += `<a type="button" class="btn btn-success me-2" id="login-btn" href="${href}">Login</a>`;
            }

            const registroPage = pages.find(p => p.title === "Registro");
            if (registroPage) {
              const regHref = registroPage.href.startsWith("./")
                ? prefix + registroPage.href.slice(2)
                : prefix + registroPage.href.replace("../", "");
              buttonsHTML += `<a href="${regHref}" id="registrar-link" class="text-white text-decoration-underline">Regístrate</a>`;
            }
          }

          return buttonsHTML;
        })()}
      </div>
    </div>
  </div>
</nav>
`;

