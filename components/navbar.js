import { pages } from "./pages.js";

export const navBar = `
<nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand" href="./index.html">
            <img src="./assets/Logo Tienda.png" alt="Logo Falalinda">
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
                            .filter(page => page.href.includes("Categorias/"))
                            .map(page => `<li><a class="dropdown-item" href="${page.href}">${page.title}</a></li>`)
                            .join("")}
                    </ul>
                </li>
            </ul>
            <div class="d-flex" id="nav-buttons">
                ${pages
                    .filter(page => {
                        const isLoggedIn = localStorage.getItem("loggedIn");
                        return page.title !== "Ropa" && page.title !== "Tecnología" && page.title !== "Hogar" &&
                            (!page.requiresLogin || (page.requiresLogin && isLoggedIn));
                    })
                    .map(page => {
                        let btnClass = "btn btn-light";
                        if (page.title === "Login") btnClass = "btn btn-success";
                        if (page.title === "Logout") btnClass = "btn btn-danger";
                        return `<a type="button" class="${btnClass} me-2" id="${page.title.toLowerCase()}-btn" href="${page.href}">${page.title}</a>`;
                    })
                    .join("")}
            </div>
        </div>
    </div>
</nav>
`;