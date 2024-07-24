document.addEventListener("DOMContentLoaded", () => {

    function cargarDatosMovimientos(){
        axios.get("../php/movimientos.php?action=seleccion")
        .then(response => {
            const datos = response.data;
    
            if (datos.length > 0 && Array.isArray(datos)) {
                const tbody = document.querySelector("#data tbody");
                let html = "";
                
                datos.forEach((elemento) => {
                    html += `<tr id_movimiento = "${elemento.idMovimiento}">
                                    <td>${elemento.idMovimiento}</td>
                                    <td>${elemento.fecha}</td>
                                    <td nowrap>${elemento.hora}</td>
                                    <td>${elemento.tipoMovimiento}</td>
                                    <td>${elemento.cantidadProductos}</td>
                                    <td>${elemento.totalVenta}</td>
                                    <td nowrap>
                                        <button class="button button--tabla btn_view">View</button>
                                        <button class="button button--tabla btn_eliminar">Eliminar</button>
                                    </td>
                                </tr>`;
                });
                tbody.innerHTML = html;
    
                // Aquí seleccionamos los botones de editar después de que se hayan cargado en el DOM

                const btnsView = document.querySelectorAll(".btn_view");
                btnsView.forEach(btn => {
                    btn.addEventListener("click", (event) => {
                        const fila = event.target.closest("tr");
                        const idMovimiento = fila.getAttribute("id_movimiento");
                        console.log("View id_movimiento:", idMovimiento);
                        viewModal(idMovimiento);
                    });
                });

                const btnsEliminar = document.querySelectorAll(".btn_eliminar");
                btnsEliminar.forEach(btn => {
                    btn.addEventListener("click", (event) => {
                        const fila = event.target.closest("tr");
                        const idMovimiento = fila.getAttribute("id_movimiento");
                        console.log("View id_movimiento:", idMovimiento);
                        deleteMovimiento(idMovimiento);
                    });
                });


            } else {
                // Manejar el caso donde no hay datos
                const tbody = document.querySelector("#data tbody");
                tbody.innerHTML = '<tr><td colspan="7">No se encontraron productos</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
        });
    }
    function deleteMovimiento(id_movimiento){
        axios.delete(`../php/movimientos.php?id=${id_movimiento}`)
        .then(response => {
            console.log(response.data);
            cargarDatosMovimientos(); 
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
            alert("Error al eliminar producto. Por favor, intenta nuevamente.");
        });

    }

    function viewModal(idMovimiento) {

        const modal = document.querySelector(".modal_view_movimiento");
        

        modal.classList.add("modal--view")
        axios.get(`../php/movimientos.php?action=unico&id=${idMovimiento}`)
        .then(response => {
            
            let objeto_movimiento = response.data[0];
            
            document.getElementById("id_movimiento").textContent = objeto_movimiento.idMovimiento;
            document.getElementById("jc_tipo").value = objeto_movimiento.tipoMovimiento;
            document.getElementById("fecha").textContent = objeto_movimiento.fecha;
            document.getElementById("hora").textContent = objeto_movimiento.hora;

            axios.get(`../php/movimientos.php?action=detallesMovimiento&id=${idMovimiento}`)
            .then(response => {
                const tbody = document.querySelector("#tabla_detalle_view tbody");
                let array = response.data;
                let html = "";
                tbody.innerHTML = html;
                if (Array.isArray(array)) {
                    array.forEach(fila => {
                        html += `<tr id_producto = "${fila.codigoProducto}">
                                <td>${fila.producto}</td>
                                <td>${fila.cantidad}</td>
                                <td>${fila.precioUnitario}</td>
                                <td>${fila.subtotal}</td>
                                <td>elemento5</td>
                            </tr>`;
    
                    })
                    tbody.innerHTML = html;
                } else
                {
                    console.log("Vacios")
                }
                


            })
            .catch(error => {
                console.error('Error en la solicitud Axios:', error);
            });
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
        });
        
    }


    const cerrar_modal_view = document.getElementById("btn_cancelar_view");

    cerrar_modal_view.addEventListener("click", () => {
        const modal = document.querySelector(".modal_view_movimiento");

        modal.classList.remove("modal--view")
    })

    //boton que abre modal
    const btn_nuevo_movimiento = document.getElementById("btn_nuevo_movimiento");
    const btn_cancelar_movimiento = document.getElementById("cancelar_nuevo_movimiento")
    const modal_nuevo_movimiento = document.querySelector(".modal_nuevo_movimiento");


    btn_nuevo_movimiento.addEventListener("click",()=>{
        modal_nuevo_movimiento.classList.add("modal--view")
    })
    btn_cancelar_movimiento.addEventListener("click",()=>{
        modal_nuevo_movimiento.classList.remove("modal--view")

    })
    
    const btn_carrito = document.getElementById("btn_carrito");

    btn_carrito.addEventListener("click", () => {
        if (ObjetoGlobalAgregar != null) {
            console.log(ObjetoGlobalAgregar);
            const tbody = document.querySelector("#detalle tbody");
        
            const cantidad = document.getElementById("cantidad_productos").value;
            const precioVenta = parseFloat(ObjetoGlobalAgregar.p_venta);  
            const subtotal = precioVenta * cantidad;
            
            
            const precioVentaFormatted = precioVenta.toFixed(2);
            const subtotalFormatted = subtotal.toFixed(2);
        
            let html = `<tr id_producto = "${ObjetoGlobalAgregar.id}">
                            <td>${ObjetoGlobalAgregar.producto}</td>
                            <td>${cantidad}</td>
                            <td>${precioVentaFormatted}</td>
                            <td>${subtotalFormatted}</td>
                            <td>elemento5</td>
                        </tr>`;
            tbody.insertAdjacentHTML('beforeend', html);
        
            document.getElementById("cantidad_productos").value = "";
            document.getElementById("buscador").value = "";
            ObjetoGlobalAgregar = null;
        }else{
            Swal.fire("Escoge un producto");
        }
        
    });

    function updateDateTime() {
        const now = new Date();
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); 
        const day = String(now.getDate()).padStart(2, '0'); 
        const formattedDate = `${year}-${month}-${day}`;

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        document.getElementById('currentDate').textContent = formattedDate;
        document.getElementById('currentTime').textContent = formattedTime;
    }

    // Actualizar la fecha y hora actual al cargar la página
    updateDateTime();

    // Actualizar cada segundo (1000 milisegundos)
    setInterval(updateDateTime, 1000);

    const input_buscador = document.getElementById("buscador");

    input_buscador.addEventListener("input", () =>{
        let input_buscador_valor = input_buscador.value.trim();
        filtradoNombre(input_buscador_valor);
    });

    function eliminarAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };


    function filtradoNombre(valor) {
        
        const contenedor_sugerencias = document.querySelector(".contenedor_sugerencias");
        if(valor == ""){
            contenedor_sugerencias.classList.remove("activar_contenedor_sugerencias");
        } else {
            contenedor_sugerencias.classList.add("activar_contenedor_sugerencias");

            axios.get("../php/productos.php")
            .then(response => {
                const listaProductos = response.data;
                listaFiltrada = listaProductos.filter(elemento => eliminarAcentos(elemento.producto.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
        
                const lista = document.querySelector("#lista_sugerencias");
                let html = "";
                listaFiltrada.forEach((elemento) => {
                    html += `<li onclick ="agregar('${elemento.id}')" >${elemento.producto}</li>`;
                });
                lista.innerHTML = html; // Reemplaza el contenido del tbody con el nuevo HTM
            })
            .catch(error => {
                console.error('Error en la solicitud Axios:', error);
            });
        }
    }
    let ObjetoGlobalAgregar = null;
    // Define la función como una propiedad del objeto window
    window.agregar = function(index) {
        axios.get(`../php/productos.php?id=${index}`)
        .then(response => {
            const datos = response.data;
            var objProducto = datos[0];

            const input_buscador = document.getElementById("buscador");
            input_buscador.value = objProducto.producto;
            const contenedor_sugerencias = document.querySelector(".contenedor_sugerencias");
            contenedor_sugerencias.classList.remove("activar_contenedor_sugerencias");

            ObjetoGlobalAgregar = objProducto;

        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
            alert("error 2");
        });
    };



    cargarDatosMovimientos();

    

    const btn_movimiento = document.getElementById("btn_guardar_movimiento");

    btn_movimiento.addEventListener("click", () => {
        Swal.fire({
            title: "¿Seguro que quieres realizar este movimiento?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Llama a obtenerID() y usa la promesa devuelta para continuar el proceso
                obtenerID()
                .then(idMovimiento => {
                    const fecha = document.getElementById("currentDate").textContent;
                    const hora = document.getElementById("currentTime").textContent;
                    const tipoDeMovimiento = document.getElementById("tipo_movimiento").value;
                    let filas = document.querySelectorAll("#detalle tbody tr");

                    let cantidad = 0;
                    let total = 0;
                    let detalle = [];

                    filas.forEach(fila => {
                        let codigoProducto = fila.getAttribute("id_producto");
                        let celda_cantidad = parseInt(fila.cells[1].innerText);
                        let precioUnitario = parseInt(fila.cells[2].innerText);
                        cantidad += celda_cantidad;
                        let celda_subtotal = parseFloat(fila.cells[3].innerText);
                        total += celda_subtotal;

                        let objetoFila = {
                            idMovimiento: idMovimiento,
                            codigoProducto: codigoProducto,
                            cantidad: celda_cantidad,
                            precioUnitario: precioUnitario,
                            subtotal: celda_subtotal
                        }
                        detalle.push(objetoFila);
                    });

                    let objetoCabera = {
                        fecha: fecha,
                        hora: hora,
                        tipo: tipoDeMovimiento,
                        cantidad: cantidad,
                        total: total,
                    };

                    // Primero hacer el POST para la cabecera
                    return axios.post("../php/movimientos.php?action=cabecera", objetoCabera)
                        .then(response => {
                            // Después de que la cabecera se haya insertado, hacer los POST para los detalles
                            let detallePromises = detalle.map(dato => {
                                return axios.post(`../php/movimientos.php?action=detalle&tipo=${encodeURIComponent(objetoCabera.tipo)}`, dato);

                            });
                            
                            return Promise.all(detallePromises);
                        });
                })
                .then(() => {
                    // Se ejecuta después de que todos los detalles se hayan insertado
                    detalle = [];
                    const tbody = document.querySelector("#detalle tbody");
                    tbody.innerHTML = "";
                    cargarDatosMovimientos();
                })
                .catch(error => {
                    console.error('Error en la solicitud Axios:', error);
                });

            }
        });

    });
    
    function obtenerID() {
        // Devuelve una promesa que se resuelve con el nuevo ID
        return axios.get("../php/movimientos.php?action=lastID")
            .then(response => {
                let datos = response.data;
                let objetoMovimiento = datos;
                return parseInt(objetoMovimiento.valor) + 1; // Devuelve el nuevo ID
            })
            .catch(error => {
                console.error('Error en la solicitud Axios:', error);
                throw error; // Re-lanza el error para que la cadena de promesas lo maneje
            });
    }
    


});