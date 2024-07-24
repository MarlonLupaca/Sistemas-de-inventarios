document.addEventListener("DOMContentLoaded", () => {
    const btnNuevoUsuario = document.getElementById("btn--nuevo--usuario");
    const modalNuevoUsuario = document.querySelector(".modal");

    const modalEditarUsuario = document.querySelector(".modal--editar");

    const btnCancelarNuevoUsuario = document.getElementById("btn--esconder--new--usuario");
    let indice = -1;

    // Mostrar modal para nuevo usuario
    btnNuevoUsuario.addEventListener("click", () => {
        modalNuevoUsuario.classList.toggle("modal--view");
    });

    // Ocultar modal de nuevo usuario
    btnCancelarNuevoUsuario.addEventListener("click", () => {
        modalNuevoUsuario.classList.toggle("modal--view");
    });

    const btn_Esconder_Actualizar = document.getElementById("btn_usuario_esconder");

    btn_Esconder_Actualizar.addEventListener("click", () => {
        modalEditarUsuario.classList.toggle("modal--view");
    });


    

    function cargarDatos() {
        axios.get("../php/usuarios.php")
            .then(response => {
                const datos = response.data;
                if (datos.length > 0 && Array.isArray(datos)) {
                    const tbody = document.querySelector("#data tbody");
                    let html = "";
                    datos.forEach(usuario => {
                        html += `
                            <tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.nombre}</td>
                                <td>${usuario.usuario}</td>
                                <td>${usuario.contrasena}</td>
                                <td>${usuario.fecha_registro}</td>
                                <td>${usuario.cargo}</td>
                                <td nowrap>
                                    <button class="button button--tabla btn--editar" onclick="editarDato(${usuario.id})">Editar</button>
                                    <button class="button button--tabla" onclick="eliminarDato(${usuario.id})">Eliminar</button>
                                </td>
                            </tr>
                        `;
                    });

                    tbody.innerHTML = html;
                    // Aquí seleccionamos los botones de editar después de que se hayan cargado en el DOM
                    const btnsEditarEmpleado = document.querySelectorAll(".btn--editar");

                    btnsEditarEmpleado.forEach(btn => {
                        btn.addEventListener("click", () => {
                            modalEditarUsuario.classList.toggle("modal--view");
                        });
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

    const btnGuardarDato = document.getElementById("agregar_Usuario");
    btnGuardarDato.addEventListener("click", agregarDato)

    

    function validarCampos() {
        const NombreAgregar = document.getElementById("agregarNombre").value;
        const UsuarioAgregar = document.getElementById("agregarUsuario").value;
        const ContraseniaAgregar = document.getElementById("agregarContrasenia").value;
        const CargoAgregar = document.getElementById("agregarCargo").value;
    
        return NombreAgregar && UsuarioAgregar && ContraseniaAgregar && CargoAgregar;
    }

    function agregarDato() {
        
        if (validarCampos()) {
            
            const NombreAgregar = document.getElementById("agregarNombre").value;
            const UsuarioAgregar = document.getElementById("agregarUsuario").value;
            const ContraseniaAgregar = document.getElementById("agregarContrasenia").value;
            const CargoAgregar = document.getElementById("agregarCargo").value;

            
            const nuevoUsuario={
                nombre: NombreAgregar,
                usuario: UsuarioAgregar,
                contrasenia: ContraseniaAgregar,
                cargo: CargoAgregar
            };
            
            
            
            axios.post("../php/usuarios.php", nuevoUsuario)
                .then(response => {
                    console.log(response.data); // Manejar la respuesta si es necesario
                    cargarDatos(); // Volver a cargar los datos después de agregar el producto
                    
                })
                .catch(error => {
                    console.error('Error en la solicitud Axios:', error);
                    alert("Error al agregar producto. Por favor, intenta nuevamente.");
                });

                alertaBuena();
                btnCancelarNuevoUsuario.click();
        } else {
            
        }
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
                axios.delete(`../php/usuarios.php?id=${index}`)
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
        console.log(index)
        indice = index;
        axios.get(`../php/usuarios.php?id=${index}`)

        .then(response => {
            const datos = response.data;

            var objUsuario = datos[0];
            const Nombre = document.getElementById("edit_Nombre");
            const usuario = document.getElementById("edit_Usuario");
            const contrasenia = document.getElementById("edit_contrasenia");
            const cargo = document.getElementById("edit_rango");

            Nombre.value = objUsuario.nombre;
            usuario.value = objUsuario.usuario;
            contrasenia.value = objUsuario.contrasena;
            cargo.value = objUsuario.cargo;
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
            alert("Error al eliminar producto. Por favor, intenta nuevamente.");
        });
    }

    const bt_actualizar = document.getElementById("btn_Actualizar")

    bt_actualizar.addEventListener("click", actulizar)


    function actulizar(){

        const Nombre = document.getElementById("edit_Nombre").value;
        const usuario = document.getElementById("edit_Usuario").value;
        const contrasenia = document.getElementById("edit_contrasenia").value;
        const cargo = document.getElementById("edit_rango").value;

        if (Nombre.trim() !== "" && usuario.trim() !== "" && contrasenia.trim() !== "" && cargo.trim() !== ""){
            const nuevoProveedor={
                id:indice,
                nombre: Nombre,
                usuario: usuario,
                contrasena: contrasenia,
                cargo: cargo
            };
    
            axios.put("../php/usuarios.php", nuevoProveedor)
            .then(response => {
                console.log(response.data); // Manejar la respuesta si es necesario
                cargarDatos(); // Volver a cargar los datos después de agregar el producto
                
            })
            .catch(error => {
                console.error('Error en la solicitud Axios:', error);
                alert("Error al agregar producto. Por favor, intenta nuevamente.");
            });

            alertaBuena();
            btn_Esconder_Actualizar.click();
        }    
    }

    const inputNombre = document.getElementById("input_nombre");
    const inputRango = document.getElementById("input_rango");
    const inputUsuario = document.getElementById("input_usuario");

    inputNombre.addEventListener("input", () => {
        const inputNombreValor = inputNombre.value;
        filtradoNombre(inputNombreValor, "nombre");
    });

    inputRango.addEventListener("input", () => {
        const inputCategoriaValor = inputRango.value;
        filtradoNombre(inputCategoriaValor, "rango");
    });

    inputUsuario.addEventListener("input", () => {
        const inputProveedorValor = inputUsuario.value;
        filtradoNombre(inputProveedorValor, "usuario");
    });

    function eliminarAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };

    function filtradoNombre(valor, tipo) {
        axios.get("../php/usuarios.php")
        .then(response => {
            const listaUsuarios = response.data;

            if (tipo === "nombre") {
                listaFiltrada = listaUsuarios.filter(elemento => eliminarAcentos(elemento.nombre.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            } else if (tipo === "rango") {
                listaFiltrada = listaUsuarios.filter(elemento => eliminarAcentos(elemento.cargo.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            } else if (tipo === "usuario") {
                listaFiltrada = listaUsuarios.filter(elemento => eliminarAcentos(elemento.usuario.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            }
    
            const tbody = document.querySelector("#data tbody");
            let html = "";
            listaFiltrada.forEach((usuario) => {
                html += `
                            <tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.nombre}</td>
                                <td>${usuario.usuario}</td>
                                <td>${usuario.contrasena}</td>
                                <td>${usuario.fecha_registro}</td>
                                <td>${usuario.cargo}</td>
                                <td nowrap>
                                    <button class="button button--tabla btn--editar" onclick="editarDato(${usuario.id})">Editar</button>
                                    <button class="button button--tabla" onclick="eliminarDato(${usuario.id})">Eliminar</button>
                                </td>
                            </tr>
                        `;
            });
            tbody.innerHTML = html; // Reemplaza el contenido del tbody con el nuevo HTML
        

        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
        });



    }



    cargarDatos();
});
