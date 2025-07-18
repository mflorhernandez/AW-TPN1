export const createCard = ({ title, description, price, offerPrice, image }) => {
    return `
    <div class="col">
        <div class="card h-100">
            <img src="${image}" class="card-img-top" alt="${title}">
            <div class="card-body">
                ${offerPrice ? `<h6 class="card-subtitle mb-2 text-muted">Promoción</h6>` : ""}
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <p class="card-text">
                    ${offerPrice 
                      ? `<span class="text-muted text-decoration-line-through">$${price.toFixed(2)}</span> <span>$${offerPrice.toFixed(2)}</span>` 
                      : `$${price.toFixed(2)}`}
                </p>
                <div class="input-group input-group-smaller mb-3">
                    <button class="btn btn-outline-secondary" type="button" onclick="this.nextElementSibling.stepDown()">-</button>
                    <input type="number" class="form-control text-center quantity-input" value="1" min="1">
                    <button class="btn btn-outline-secondary" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
                </div>
                <button class="btn btn-primary add-to-cart-btn"
                    data-title="${title}"
                    data-description="${description}"
                    data-price="${price}"
                    data-offerprice="${offerPrice || ''}"
                    data-image="${image}"
                >${offerPrice ? "Aprovechar Oferta" : "Agregar"}</button>
            </div>
        </div>
    </div>
    `;
};
