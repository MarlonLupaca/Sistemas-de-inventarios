document.addEventListener("DOMContentLoaded", () => {
    const btnNewEmpleado = document.getElementById("btn--new--empleado");
    const EsconderbtnNewEmpleado = document.getElementById("btn--esconder--new--empleado");
    const modal = document.querySelector(".modal");
    const modalEditar = document.querySelector(".modal--editar")

    const btnEsconderEmpleado = document.getElementById("btn--esconder--editar--empleado");

    let indice = -1;

    btnEsconderEmpleado.addEventListener("click",() => {
        modalEditar.classList.toggle("modal--view")
    })
    

    btnNewEmpleado.addEventListener("click",() => {
        modal.classList.toggle("modal--view")
    })
    EsconderbtnNewEmpleado.addEventListener("click",() => {
        modal.classList.toggle("modal--view")
    })


    function cargarDatos() {
        axios.get("../php/empleados.php")
        .then(response => {
            const datos = response.data;
    
            if (datos.length > 0 && Array.isArray(datos)) {
                const tbody = document.querySelector("#data tbody");
                let html = "";
    
                datos.forEach((elemento) => {
                    html += `<tr>
                                <td>${elemento.nombre}</td>
                                <td>${elemento.correo_electronico}</td>
                                <td>${elemento.telefono}</td>
                                <td>${elemento.cargo}</td>
                                <td nowrap>
                                    <button class="btn--editar button button--tabla btn--ajustable" onclick="editarDato(${elemento.id})">Editar</button>
                                    <button class="button button--tabla btn--ajustable" onclick="eliminarDato(${elemento.id})">Eliminar</button>
                                </td>
                            </tr>`;
                });
    
                tbody.innerHTML = html;
    
                // Aquí seleccionamos los botones de editar después de que se hayan cargado en el DOM
                const btnsEditarEmpleado = document.querySelectorAll(".btn--editar");

                btnsEditarEmpleado.forEach(btn => {
                    btn.addEventListener("click", () => {
                        modalEditar.classList.toggle("modal--view");
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

    window.editarDato = function(index){
        indice = index;
        axios.get(`../php/empleados.php?id=${index}`)

        .then(response => {
            const datos = response.data;

            var objEmpleado = datos[0];
            const Nombre = document.getElementById("editNombreEmpleado");
            const Correo = document.getElementById("editNombreCorreo");
            const telefonos = document.getElementById("editNombreTelefono");
            const cargo = document.getElementById("editNombreCargo");

            Nombre.value = objEmpleado.nombre;
            Correo.value = objEmpleado.correo_electronico;
            console.log(objEmpleado.telefono)
            telefonos.value = objEmpleado.telefono;
            cargo.value = objEmpleado.cargo;
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
            alert("Error al eliminar producto. Por favor, intenta nuevamente.");
        });
    }

    const btnGuardarDato = document.getElementById("agregarEmpleado");
    btnGuardarDato.addEventListener("click", agregarDato)

    function validarCampos() {
        const Nombre = document.getElementById("NombreEmpleado").value;
        const Correo = document.getElementById("NombreCorreo").value;
        const Telefono = document.getElementById("NombreTelefono").value;
        const Cargo = document.getElementById("NombreCargo").value;
    
        return Nombre && Correo.includes("@") && Telefono && Cargo;
    }

    function agregarDato() {
        console.log(validarCampos())
        if (validarCampos()) {
            
            const NombreAgregar = document.getElementById("NombreEmpleado").value;
            const CorreoAgregar = document.getElementById("NombreCorreo").value;
            const TelefonoAgregar = document.getElementById("NombreTelefono").value;
            const CargoAgregar = document.getElementById("NombreCargo").value;


            const nuevoProveedor={
                nombre: NombreAgregar,
                correo_electronico: CorreoAgregar,
                telefono: TelefonoAgregar,
                cargo: CargoAgregar
            };
            
            
            axios.post("../php/empleados.php", nuevoProveedor)
                .then(response => {
                    console.log(response.data); // Manejar la respuesta si es necesario
                    cargarDatos(); // Volver a cargar los datos después de agregar el producto
                    
                })
                .catch(error => {
                    console.error('Error en la solicitud Axios:', error);
                    alert("Error al agregar producto. Por favor, intenta nuevamente.");
                });
        } else {
            
        }
    }
    window.eliminarDato = function(index) {
        axios.delete(`../php/empleados.php?id=${index}`)
        .then(response => {
            console.log(response.data); // Manejar la respuesta si es necesario
            cargarDatos(); // Volver a cargar los datos después de eliminar el producto
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
            alert("Error al eliminar producto. Por favor, intenta nuevamente.");
        });
    }
    const btnEmpleadoActualizar = document.getElementById("empleadosActualizar");

    btnEmpleadoActualizar.addEventListener("click", actulizar)
    function actulizar(){

        const NombreAgregar = document.getElementById("editNombreEmpleado").value;
        const CorreoAgregar = document.getElementById("editNombreCorreo").value;
        const TelefonoAgregar = document.getElementById("editNombreTelefono").value;
        const CargoAgregar = document.getElementById("editNombreCargo").value;
        
        const nuevoProveedor={
            id:indice,
            nombre: NombreAgregar,
            correo_electronico: CorreoAgregar,
            telefono: TelefonoAgregar,
            cargo: CargoAgregar
        };

        axios.put("../php/empleados.php", nuevoProveedor)
        .then(response => {
            console.log(response.data); // Manejar la respuesta si es necesario
            cargarDatos(); // Volver a cargar los datos después de agregar el producto
            
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
            alert("Error al agregar producto. Por favor, intenta nuevamente.");
        });
    }
    const inputNombre = document.getElementById("inputNombre");
    const inputApellido = document.getElementById("inputTelefono");
    const inputCorreo = document.getElementById("inputCorreo");

    inputNombre.addEventListener("input", () => {
        const inputNombreValor = inputNombre.value;
        filtradoNombre(inputNombreValor, "nombre");
    });

    inputApellido.addEventListener("input", () => {
        const inputCategoriaValor = inputApellido.value;
        filtradoNombre(inputCategoriaValor, "telefono");
    });

    inputCorreo.addEventListener("input", () => {
        const inputProveedorValor = inputCorreo.value;
        filtradoNombre(inputProveedorValor, "correo");
    });

    function eliminarAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };

    function filtradoNombre(valor, tipo) {
        axios.get("../php/empleados.php")
        .then(response => {
            const listaEmpleados = response.data;

            if (tipo === "nombre") {
                listaFiltrada = listaEmpleados.filter(elemento => eliminarAcentos(elemento.nombre.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            } else if (tipo === "telefono") {
                listaFiltrada = listaEmpleados.filter(elemento => eliminarAcentos(elemento.telefono.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            } else if (tipo === "correo") {
                listaFiltrada = listaEmpleados.filter(elemento => eliminarAcentos(elemento.correo_electronico.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            }
    
            const tbody = document.querySelector("#data tbody");
            let html = "";
            listaFiltrada.forEach((elemento) => {
                html += `<tr>
                                <td>${elemento.nombre}</td>
                                <td>${elemento.correo_electronico}</td>
                                <td>${elemento.telefono}</td>
                                <td>${elemento.cargo}</td>
                                <td nowrap>
                                    <button class="btn--editar button button--tabla btn--ajustable" onclick="editarDato(${elemento.id})">Editar</button>
                                    <button class="button button--tabla btn--ajustable" onclick="eliminarDato(${elemento.id})">Eliminar</button>
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