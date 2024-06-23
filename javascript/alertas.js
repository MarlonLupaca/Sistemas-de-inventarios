const alerta = document.querySelector(".alerta_contenedor");

let html_buena = `
    <div class="alerta_buena">
        <i class="fa-solid fa-check"></i>
        <p>Se realizó con éxito</p>
    </div>
`;

let html_mala = `
    <div class="alerta_mala">
        <i class="fa-regular fa-times"></i>
        <p>Se cancelo la acción</p>
    </div>
`;

function alertaBuena() {
    const divBuena = document.createElement('div'); // Crear un nuevo elemento div
    divBuena.innerHTML = html_buena; // Asignar el HTML de la alerta buena al nuevo div
    alerta.appendChild(divBuena); // Agregar el nuevo div al contenedor alerta_contenedor
    /*
    setTimeout(() => {
        divBuena.remove(); // Eliminar el div creado después de 3 segundos
    }, 4000);*/
}

function alertaMala() {
    const divMala = document.createElement('div'); // Crear un nuevo elemento div
    divMala.innerHTML = html_mala; // Asignar el HTML de la alerta mala al nuevo div
    alerta.appendChild(divMala); // Agregar el nuevo div al contenedor alerta_contenedor
    
    setTimeout(() => {
        divMala.remove(); // Eliminar el div creado después de 3 segundos
    }, 4000);
}
