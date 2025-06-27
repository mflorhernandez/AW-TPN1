import { navBar } from "../components/navbar.js";
import { footerContent } from "../components/footer.js";
import { createCard } from "../components/cards.js";
import { pages } from "../components/pages.js";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const mainContainer = document.querySelector("main .container");

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
                sessionStorage.removeItem("usuarioLogueado"); // ✅ Cierra sesión
                window.location.href = "./login.html"; // ✅ Redirige a login y se actualiza navbar
            });
        }
    }

    // Renderizar footer
    if (footer) {
        footer.innerHTML = footerContent;
    }

    // Cargar productos y renderizar cards
    if (mainContainer) {
        fetch(new URL("../data/productos.json", import.meta.url))
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el archivo productos.json");
                }
                return response.json();
            })
            .then((productos) => {
                const path = window.location.pathname;
                let categoryToShow;

                if (path.includes("index.html") || path === "/" || path === "./index.html") {
                    // Mostrar productos en promoción
                    const productosPromo = productos.filter(p => p.category === "Promoción");

                    let row = mainContainer.querySelector(".row");
                    if (!row) {
                        row = document.createElement("div");
                        row.className = "row";
                        mainContainer.appendChild(row);
                    }

                    row.innerHTML = productosPromo.map(p => createCard(p)).join("");
                } else {
                    // Otras páginas por categoría
                    if (path.includes("Hogar.html")) {
                        categoryToShow = "Hogar";
                    } else if (path.includes("Tecnologia.html")) {
                        categoryToShow = "Tecnología";
                    } else if (path.includes("Ropa.html")) {
                        categoryToShow = "Ropa";
                    } else if (path.includes("Promocion.html")) {
                        categoryToShow = "Promoción";
                    }

                    if (categoryToShow) {
                        const productosCategoria = productos.filter(p => p.category === categoryToShow);

                        let row = mainContainer.querySelector(".row");
                        if (!row) {
                            row = document.createElement("div");
                            row.className = "row";
                            mainContainer.appendChild(row);
                        }

                        row.innerHTML = productosCategoria.map(p => createCard(p)).join("");
                    } else {
                        console.log("No se reconoció la categoría para la página:", path);
                    }
                }
            })
            .catch((error) => {
                console.error("Error al cargar los productos:", error);
            });
    }
});
    