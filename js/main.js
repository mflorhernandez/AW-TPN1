import { navBar } from "../components/navbar.js";
import { footerContent } from "../components/footer.js";
import { cardsData } from "../components/cardsData.js";
import { createCard } from "../components/cards.js";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const mainContainer = document.querySelector("main .container");

    // Renderizar navbar
    if (header) {
        header.innerHTML = navBar;

        const loginBtn = document.getElementById("login-btn");
        const logoutBtn = document.getElementById("logout-btn");

        if (loginBtn) {
            loginBtn.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = "/login.html"; // ✅ Ruta absoluta corregida
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("loggedIn");
                window.location.href = "/login.html"; // ✅ Ruta absoluta corregida
            });
        }
    }

    // Renderizar footer
    if (footer) {
        footer.innerHTML = footerContent;
    }

    // Renderizar cards según categoría
    if (mainContainer) {
        const path = window.location.pathname;
        let categoryToShow;

        if (path.includes("index.html") || path === "/") {
            categoryToShow = "Promoción";
        } else if (path.includes("Hogar.html")) {
            categoryToShow = "Hogar";
        } else if (path.includes("Tecnologia.html")) {
            categoryToShow = "Tecnología";
        } else if (path.includes("Ropa.html")) {
            categoryToShow = "Ropa";
        }

        if (categoryToShow) {
            const filteredCards = cardsData.filter(card => card.category === categoryToShow);
            if (filteredCards.length === 0) {
                console.log(`No se encontraron cards para la categoría: ${categoryToShow}`);
            }

            let row = mainContainer.querySelector(".row");
            if (!row) {
                row = document.createElement("div");
                row.className = "row";
                mainContainer.appendChild(row);
            }

            row.innerHTML = filteredCards.map(card => createCard(card)).join("");
        } else {
            console.log("No se reconoció la categoría para la página:", path);
        }
    } else {
        console.log("No se encontró el contenedor main .container");
    }
});
