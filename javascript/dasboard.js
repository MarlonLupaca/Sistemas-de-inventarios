document.addEventListener("DOMContentLoaded", () => {
    function cargarEstadistica(){
        axios.get("../php/movimientos.php?action=estadisticas")
        .then(response => {
            
            let array = response.data;
            
            const lista = document.getElementById("lista");

            let html ="";

            html = `<li>
                        <i class="fa-solid fa-truck"></i>
                        <span class="primer--texto">Movimientos</span>
                        <span class="segundo--texto">${array[3].TABLE_ROWS}</span>
                    </li>
                    `;
            lista.insertAdjacentHTML('beforeend', html);

            html = `<li>
                        <i class="fa-solid fa-id-badge"></i>
                        <span class="primer--texto">Empleados</span>
                        <span class="segundo--texto">${array[2].TABLE_ROWS}</span>
                    </li>
                    `;
            lista.insertAdjacentHTML('beforeend', html);

            html = `<li>
                        <i class="fa-solid fa-network-wired"></i>
                        <span class="primer--texto">Productos</span>
                        <span class="segundo--texto">${array[5].TABLE_ROWS}</span>
                    </li>
                    `;
            lista.insertAdjacentHTML('beforeend', html);

            html = `<li>
                        <i class="fa-solid fa-briefcase"></i>
                        <span class="primer--texto">Proveedores</span>
                        <span class="segundo--texto">${array[6].TABLE_ROWS}</span>
                    </li>
                    `;
            lista.insertAdjacentHTML('beforeend', html);

            html = `<li>
                        <i class="fa-solid fa-user"></i>
                        <span class="primer--texto">Usuarios</span>
                        <span class="segundo--texto">${array[7].TABLE_ROWS}</span>
                    </li>
                    `;
            lista.insertAdjacentHTML('beforeend', html);


        })
    }
    cargarEstadistica();

});