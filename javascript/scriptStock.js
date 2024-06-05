//Función de busqueda y filtrado, es una combinación de las funciones comentadas usando una lógica AND 
document.addEventListener('DOMContentLoaded', function() {
    const searchInputID = document.querySelector('.buscar--input--ID');
    const searchInputComprobante = document.querySelector('.buscar--input--comprobante');
    const searchInputProducto = document.querySelector('.buscar--input--producto');
    const cards = document.querySelectorAll('.card--stock');

    function filterCards() {
        const searchTermID = searchInputID.value.toLowerCase();
        const searchTermComprobante = searchInputComprobante.value.toLowerCase();
        const searchTermProducto = searchInputProducto.value.toLowerCase();

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
});

/*
Estas son las funciones por separado, por si quieres que solo la filtración por ID se mantenga y quieres descartar el resto
//Función que hace la filtración por ID.
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.buscar--input--ID');
    const cards = document.querySelectorAll('.card--stock');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();

        cards.forEach(function(card) {
            const idText = card.querySelector('.card--cabecera').textContent.toLowerCase();

            if (idText.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
//Función que hace la filtración basada en el comprobante
document.addEventListener('DOMContentLoaded', () => {
    const inputComprobante = document.querySelector('.buscar--input--comprobante');

    inputComprobante.addEventListener('input', () => {
        const searchValue = inputComprobante.value.toLowerCase();
        const cards = document.querySelectorAll('.card--stock');

        cards.forEach(card => {
            const comprobanteText = card.querySelectorAll('p')[1].textContent.toLowerCase();
            if (comprobanteText.includes(searchValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
//Función que hace la filtración basada en el Producto
document.addEventListener('DOMContentLoaded', () => {
    const inputComprobante = document.querySelector('.buscar--input--producto');

    inputComprobante.addEventListener('input', () => {
        const searchValue = inputComprobante.value.toLowerCase();
        const cards = document.querySelectorAll('.card--stock');

        cards.forEach(card => {
            const comprobanteText = card.querySelectorAll('p')[0].textContent.toLowerCase();
            if (comprobanteText.includes(searchValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
*/
