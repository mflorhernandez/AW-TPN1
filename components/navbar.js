import { pages } from "./pages.js";

export const navBar = `
<nav class="navbar navbar-dark bg-dark navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="/index.html">
      <img src="/assets/Logo Tienda.png" alt="Logo Falalinda">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
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
              return `<a type="button" class="${btnClass} me-2" id="${page.title.toLowerCase()}-btn" href="${page.href}">${page.title}</a>`;
            }).join("");

          // Mostrar Login o Logout según el estado
          if (isLoggedIn) {
            // Logout 
            const logoutPage = filteredPages.find(p => p.title === "Logout");
            if (logoutPage) {
              buttonsHTML += `<a type="button" class="btn btn-danger me-2" id="logout-btn" href="${logoutPage.href}">Logout</a>`;
              
              const registroPage = pages.find(p => p.title === "Registro");
              if (registroPage) {
                buttonsHTML += `<a href="${registroPage.href}" id="registrar-link" style="color: #fff; text-decoration: underline;">Registrarse</a>`;
              }
            }
          } else {
            // No está logueado: mostramos Login 
            const loginPage = filteredPages.find(p => p.title === "Login");
            if (loginPage) {
              buttonsHTML += `<a type="button" class="btn btn-success me-2" id="login-btn" href="${loginPage.href}">Login</a>`;
            }
            // También mostramos Registrar 
            const registroPage = pages.find(p => p.title === "Registro");
            if (registroPage) {
              buttonsHTML += `<a href="${registroPage.href}" id="registrar-link" style="color: #fff; text-decoration: underline;">Registrarse</a>`;
            }
          }

          return buttonsHTML;
        })()}
      </div>
    </div>
  </div>
</nav>
`;
