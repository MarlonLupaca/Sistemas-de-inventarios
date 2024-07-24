document.addEventListener("DOMContentLoaded", () => {
    //botones
    const btnNewProveedor = document.getElementById("btn--new--proveedor");
    const btnEscoderNewProveedor = document.getElementById("btn--esconder--new--proveedor");
    const btnEconderEditar = document.getElementById("btn--esconder--editar--proveedor");
    const btnGuardarDato = document.getElementById("guardar_Proveedor");

    let indice = -1;


    //modales
    const modalNew = document.querySelector(".modal");
    const modalEditar = document.querySelector(".modal--editar");


    btnGuardarDato.addEventListener("click", agregarDato)

    btnEconderEditar.addEventListener("click", ()=>{
        modalEditar.classList.toggle("modal--view");
    })

    btnNewProveedor.addEventListener("click",()=>{
        modalNew.classList.toggle("modal--view");
    })

    btnEscoderNewProveedor.addEventListener("click", ()=>{
        modalNew.classList.toggle("modal--view");
    })

    function validarCampos() {
        const nombre = document.getElementById("input_Nombre").value;
        const direccion = document.getElementById("input_Direccion").value;
        const correo = document.getElementById("input_Correo").value;
        const contacto = document.getElementById("input_Contacto").value;
        const tipoDeProductos = document.getElementById("input_TipoProductos").value;
        const formaDePago = document.getElementById("input_Fpago").value;
        const estadoProveedor = document.getElementById("input_Estado").value;

        
        console.log("Nombre:", nombre);
        console.log("Dirección:", direccion);
        console.log("Correo:", correo);
        console.log("Contacto:", contacto);
        console.log("Tipo de Producto:", tipoDeProductos);
        console.log("Pago:", formaDePago);
        console.log("Estado Proveedor:", estadoProveedor);
        
        // Validación de los campos
        return nombre && direccion && correo.includes("@") && contacto && tipoDeProductos && formaDePago && estadoProveedor;
    }
    
    function agregarDato() {
        if (validarCampos()) {
            // Obtener los valores de los campos nuevamente para asegurarse de que estén actualizados
            const NombreAgregar = document.getElementById("input_Nombre").value;
            const DireccionAgregar = document.getElementById("input_Direccion").value;
            const CorreoAgregar = document.getElementById("input_Correo").value;
            const ContactoAgregar = document.getElementById("input_Contacto").value;
            const TipoDeProductoAgregar = document.getElementById("input_TipoProductos").value;
            const PagoAgregar = document.getElementById("input_Fpago").value;
            const EstadoProveedorAgregar = document.getElementById("input_Estado").value;
    
            // Crear el objeto con los datos a enviar
            const nuevoProveedor = {
                Nombre: NombreAgregar,
                Direccion: DireccionAgregar,
                Correo: CorreoAgregar,
                Contacto: ContactoAgregar,
                TipoDeProducto: TipoDeProductoAgregar,
                Pago: PagoAgregar,
                EstadoProveedor: EstadoProveedorAgregar
            };
    
            console.log(nuevoProveedor);
    
            // Ejemplo de uso de axios para enviar los datos a un servidor
            axios.post("../php/proveedores.php", nuevoProveedor)
                .then(response => {
                    console.log(response.data); // Manejar la respuesta si es necesario
                    cargarDatos(); // Volver a cargar los datos después de agregar el proveedor
                    alertaBuena();
                    btnEscoderNewProveedor.click();
                })
                .catch(error => {
                    console.error('Error en la solicitud Axios:', error);
                    alert("Error al agregar proveedor. Por favor, intenta nuevamente.");
                });
            
        } else {
        }
    }
    
    
    function cargarDatos() {
        axios.get("../php/proveedores.php")
        .then(response => {
            const datos = response.data;
            if (datos.length > 0 && Array.isArray(datos)) {
                const tbody = document.querySelector("#data tbody");
                let html = "";
                datos.forEach((elemento) => {
                    html += `<tr>
                                <td>${elemento.Nombre}</td>
                                <td>${elemento.Direccion}</td>
                                <td>${elemento.Email}</td>
                                <td>${elemento.ContactoPrincipal}</td>
                                <td>${elemento.TipoProductos}</td>
                                <td>${elemento.FormaPago}</td>
                                <td>${elemento.Estado}</td>
                                <td nowrap>
                                    <button class="button button--tabla btn--editar" onclick="editarDato(${elemento.id})">Editar</button>
                                    <button class="button button--tabla" onclick="eliminarDato(${elemento.id})">Eliminar</button>
                                </td>
                            </tr>`;
                });

                tbody.innerHTML = html; // Reemplaza el contenido del tbody con el nuevo HTML

                // Aquí seleccionamos los botones de editar después de que se hayan cargado en el DOM
                const btnEditarProveedor = document.querySelectorAll(".btn--editar");
                btnEditarProveedor.forEach(btn => {
                    btn.addEventListener("click", () => {
                        modalEditar.classList.toggle("modal--view");
                    })
                });

            }else {
                // Manejar el caso donde no hay datos
                const tbody = document.querySelector("#data tbody");
                tbody.innerHTML = '<tr><td colspan="7">No se encontraron productos</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
        });
    }
    

    window.eliminarDato = function(index) {

        Swal.fire({
            title: "Seguro que quieres eliminar el dato?",
            showDenyButton: true,
            heightAuto: false, 
            confirmButtonText: "Si",
            denyButtonText: "No",
            customClass: {
                confirmButton: 'color_agregado',
                denyButton: 'color_agregado',
            }
        }).then((result) => {
            

            if (result.isConfirmed) {
                alertaBuena();
                axios.delete(`../php/proveedores.php?id=${index}`)
                .then(response => {
                    console.log(response.data); // Manejar la respuesta si es necesario
                    cargarDatos(); // Volver a cargar los datos después de eliminar el producto
                })
                .catch(error => {
                    console.error('Error en la solicitud Axios:', error);
                    alert("Error al eliminar producto. Por favor, intenta nuevamente.");
                });
            } else if (result.isDenied) {
                alertaMala();
            }
        });    
    }

    window.editarDato = function(index){
        indice = index;
        axios.get(`../php/proveedores.php?id=${index}`)

        .then(response => {
            const datos = response.data;

            var objProveedor = datos[0];
            const Nombre = document.getElementById("editNombre");
            const Direccion = document.getElementById("editDireccion");
            const Correo = document.getElementById("editCorreo");
            const Contacto = document.getElementById("editContacto");
            const TipoDeProducto = document.getElementById("editTipoProductos");
            const Pago = document.getElementById("editFpago");
            const EstadoProveedor = document.getElementById("editEstado");

            Nombre.value = objProveedor.Nombre;
            Direccion.value = objProveedor.Direccion;
            Correo.value = objProveedor.Email;
            Contacto.value = objProveedor.ContactoPrincipal;
            TipoDeProducto.value = objProveedor.TipoDeProductos;
            Pago.value = objProveedor.FormaPago;
            EstadoProveedor.value = objProveedor.Estado;

            
        
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
            alert("Error al eliminar producto. Por favor, intenta nuevamente.");
        });
        
        
    }
    const btnActualizar = document.getElementById("btn--actualizar--dato");

    btnActualizar.addEventListener("click", actulizar);

    function actulizar(){

        const Nombre = document.getElementById("editNombre").value;
        const Direccion = document.getElementById("editDireccion").value;
        const Correo = document.getElementById("editCorreo").value;
        const Contacto = document.getElementById("editContacto").value;
        const TipoDeProducto = document.getElementById("editTipoProductos").value;
        const Pago = document.getElementById("editFpago").value;
        const EstadoProveedor = document.getElementById("editEstado").value;

        if (Nombre.trim() !== "" && Direccion.trim() !== "" && Correo.trim() !== "" && Contacto.trim() !== "" && TipoDeProducto.trim() !== "" && Pago.trim() !== "" && EstadoProveedor.trim() !== ""){
            const nuevoProveedor={
                id:indice,
                Nombre: Nombre,
                Direccion: Direccion,
                Correo: Correo,
                Contacto: Contacto,
                TipoDeProducto: TipoDeProducto,
                Pago: Pago,
                EstadoProveedor: EstadoProveedor
            };
    
            axios.put("../php/proveedores.php", nuevoProveedor)
            .then(response => {
                console.log(response.data); // Manejar la respuesta si es necesario
                cargarDatos(); // Volver a cargar los datos después de agregar el producto
                
            })
            .catch(error => {
                console.error('Error en la solicitud Axios:', error);
                alert("Error al agregar producto. Por favor, intenta nuevamente.");
            });
            
            alertaBuena();
    
            btnEconderEditar.click();
        }
    }
    const inputNombre = document.getElementById("inputNombrePro");
    const inputProducto = document.getElementById("inputProducto");
    const inputEstado = document.getElementById("inputEstado");

    inputNombre.addEventListener("input", () => {
        const inputNombreValor = inputNombre.value;
        filtradoNombre(inputNombreValor, "nombre");
    });

    inputProducto.addEventListener("input", () => {
        const inputCategoriaValor = inputProducto.value;
        filtradoNombre(inputCategoriaValor, "producto");
    });

    inputEstado.addEventListener("input", () => {
        const inputProveedorValor = inputEstado.value;
        filtradoNombre(inputProveedorValor, "estado");
    });

    function eliminarAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };

    function filtradoNombre(valor, tipo) {
        axios.get("../php/proveedores.php")
        .then(response => {
            const listaProveedores = response.data;

            if (tipo === "nombre") {
                listaFiltrada = listaProveedores.filter(elemento => eliminarAcentos(elemento.Nombre.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            } else if (tipo === "producto") {
                listaFiltrada = listaProveedores.filter(elemento => eliminarAcentos(elemento.TipoProductos.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            } else if (tipo === "estado") {
                listaFiltrada = listaProveedores.filter(elemento => eliminarAcentos(elemento.Estado.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            }
    
            const tbody = document.querySelector("#data tbody");
            let html = "";
            listaFiltrada.forEach((elemento) => {
                html += `<tr>
                                <td>${elemento.Nombre}</td>
                                <td>${elemento.Direccion}</td>
                                <td>${elemento.Email}</td>
                                <td>${elemento.ContactoPrincipal}</td>
                                <td>${elemento.TipoProductos}</td>
                                <td>${elemento.FormaPago}</td>
                                <td>${elemento.Estado}</td>
                                <td nowrap>
                                    <button class="button button--tabla btn--editar" onclick="editarDato(${elemento.id})">Editar</button>
                                    <button class="button button--tabla" onclick="eliminarDato(${elemento.id})">Eliminar</button>
                                </td>
                            </tr>`;
            });
            tbody.innerHTML = html; // Reemplaza el contenido del tbody con el nuevo HTML
        

        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
        });



        }


    
    cargarDatos();
})