document.addEventListener('DOMContentLoaded', function() {
    const searchInputID = document.querySelector('.buscar--input--ID');
    const searchInputComprobante = document.querySelector('.buscar--input--comprobante');
    const searchInputProducto = document.querySelector('.buscar--input--producto');
    const cardsContainer = document.querySelector('.cards-container');

    function createCard(data) {
        const card = document.createElement('div');
        card.classList.add('card--stock');

        card.innerHTML = `
            <div class="card--cabecera">ID: ${data.id}</div>
            <p>Producto: <span>${data.producto}</span></p>
            <p>Proveedor: <span>${data.proveedor}</span></p>
            <p>Stock: <span>${data.stocks}</span></p>
            <p>Fecha: <span>${new Date().toLocaleDateString()}</span></p> <!-- Placeholder for date -->
        `;

        return card;
    }

    function loadCards() {
        axios.get("../php/productos.php?alertas")
            .then(response => {
                const datos = response.data;

                // Clear existing cards
                cardsContainer.innerHTML = '';

                // Create and append new cards
                datos.forEach(data => {
                    const card = createCard(data);
                    cardsContainer.appendChild(card);
                });

                filterCards(); // Apply filters to newly created cards
            })
            .catch(error => {
                console.error('Error en la solicitud Axios:', error);
            });
    }

    function filterCards() {
        const searchTermID = searchInputID.value.toLowerCase();
        const searchTermComprobante = searchInputComprobante.value.toLowerCase();
        const searchTermProducto = searchInputProducto.value.toLowerCase();

        const cards = document.querySelectorAll('.card--stock');

        cards.forEach(function(card) {
            const idText = card.querySelector('.card--cabecera').textContent.toLowerCase();
            const comprobanteText = card.querySelectorAll('p')[1].textContent.toLowerCase();
            const productoText = card.querySelectorAll('p')[0].textContent.toLowerCase();

            const matchesID = idText.includes(searchTermID);
            const matchesComprobante = comprobanteText.includes(searchTermComprobante);
            const matchesProducto = productoText.includes(searchTermProducto);

            if (matchesID && matchesComprobante && matchesProducto) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInputID.addEventListener('input', filterCards);
    searchInputComprobante.addEventListener('input', filterCards);
    searchInputProducto.addEventListener('input', filterCards);

    // Initial load of cards
    loadCards();
});
