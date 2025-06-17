import { pages } from "./pages.js";

export const navBar = `
<nav class="navbar navbar-dark bg-dark navbar-expand-lg position-relative">
  <div class="container-fluid position-relative w-100">

    <!-- Logo izquierdo -->
    <a class="navbar-brand d-flex align-items-center" href="/index.html">
      <img src="../assets/Logo Tienda.png" alt="Logo Falalinda" class="logo-navbar">
    </a>

    <!-- Logo grande centrado -->
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
              .filter(page => page.href.includes("/Categorias/"))
              .map(page => `<li><a class="dropdown-item" href="${page.href}">${page.title}</a></li>`)
              .join("")}
          </ul>
        </li>
      </ul>
      <div class="d-flex align-items-center" id="nav-buttons">
        ${(() => {
          const isLoggedIn = localStorage.getItem("loggedIn");

          const filteredPages = pages.filter(page =>
            page.title !== "Ropa" && page.title !== "Tecnología" && page.title !== "Hogar" &&
            (!page.requiresLogin || (page.requiresLogin && isLoggedIn))
          );

          let buttonsHTML = filteredPages
            .filter(page => !["Login", "Logout", "Registro"].includes(page.title))
            .map(page => {
              let btnClass = "btn btn-light";
              if (page.title === "Home") {
                btnClass = "btn btn-home";
              }
              return `<a type="button" class="${btnClass} me-2" id="${page.title.toLowerCase()}-btn" href="${page.href}">${page.title}</a>`;
            }).join("");

          if (isLoggedIn) {
            const logoutPage = filteredPages.find(p => p.title === "Logout");
            if (logoutPage) {
              buttonsHTML += `<a type="button" class="btn btn-danger me-2" id="logout-btn" href="${logoutPage.href}">Logout</a>`;

              const registroPage = pages.find(p => p.title === "Registro");
              if (registroPage) {
                buttonsHTML += `<a href="${registroPage.href}" id="registrar-link" style="color: #fff; text-decoration: underline;">Regístrate</a>`;
              }
            }
          } else {
            const loginPage = filteredPages.find(p => p.title === "Login");
            if (loginPage) {
              buttonsHTML += `<a type="button" class="btn btn-success me-2" id="login-btn" href="${loginPage.href}">Login</a>`;
            }

            const registroPage = pages.find(p => p.title === "Registro");
            if (registroPage) {
              buttonsHTML += `<a href="${registroPage.href}" id="registrar-link" style="color: #fff; text-decoration: underline;">Regístrate</a>`;
            }
          }

          return buttonsHTML;
        })()}
      </div>
    </div>
  </div>
</nav>
`;