import { navBar } from "../components/navbar.js";
import { footerContent } from "../components/footer.js";
import { cardsData } from "../components/cardsData.js";
import { createCard } from "../components/cards.js";

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const main = document.querySelector("main .container .row");

    if (header) {
        header.innerHTML = navBar;

        const loginBtn = document.getElementById("login-btn");
        const logoutBtn = document.getElementById("logout-btn");

        if (loginBtn) {
            loginBtn.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = "./login.html";
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("loggedIn");
                window.location.href = "./login.html";
            });
        }
    }

    if (footer) {
        footer.innerHTML = footerContent;
    }

    // Renderizar cards dinámicamente
    if (main) {
        const path = window.location.pathname;
        let categoryToShow;

        if (path.includes("index.html")) {
            categoryToShow = "Promoción";
        } else if (path.includes("Hogar.html")) {
            categoryToShow = "Hogar";
        } else if (path.includes("Tecnología.html")) {
            categoryToShow = "Tecnología";
        }

        if (categoryToShow) {
            const filteredCards = cardsData.filter(card => card.category === categoryToShow);
            main.innerHTML = filteredCards.map(card => createCard(card)).join("");
        }
    }
});