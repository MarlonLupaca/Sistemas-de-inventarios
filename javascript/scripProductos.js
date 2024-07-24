
document.addEventListener("DOMContentLoaded", () => {
    
    // Obtener referencias a los elementos del DOM
    const inputCategoria = document.getElementById("inputCategoria");
    const inputProducto = document.getElementById("inputProducto");
    const inputProveedor = document.getElementById("inputProveedor");
    const minAviso = document.getElementById("minAviso");
    const PreCompras = document.getElementById("PreCompras");
    const PreVenta = document.getElementById("PreVenta");
    //boton
    const modal = document.querySelector(".modal");
    const modalEditar = document.querySelector(".modal--editar");
    const btnCerrarModal = document.getElementById("btn--esconder--nuevoproducto");
    const btnModalNewProdcuto = document.getElementById("btn--new--producto");
    const btnAgregarDato = document.getElementById("btn--nuevo--producto");
    const btnOcultarModal = document.getElementById("btn--esconder--editar--producto");
    const btnActualizar = document.getElementById("btn--actualizar");


    //variables
    let indice = -1;

    btnActualizar.addEventListener("click", actulizar)

    btnModalNewProdcuto.addEventListener("click", () => {
        
        modal.classList.toggle("modal--view");
    });

    btnCerrarModal.addEventListener("click", () => {
        
        modal.classList.toggle("modal--view");


    });

    btnOcultarModal.addEventListener("click", () => {
        modalEditar.classList.toggle("modal--view");
    });

    // Agregar el evento click al botón "Agregar Producto"
    btnAgregarDato.addEventListener("click", agregarDato);

    // Función para validar campos
    function validarCampos() {
        return inputCategoria.value && inputProducto.value && inputProveedor.value && minAviso.value && PreCompras.value && PreVenta.value;
    }

    // Función para cargar los datos desde el localStorage
    function cargarDatos() {
        axios.get("../php/productos.php")
        .then(response => {
            const datos = response.data;
    
            if (datos.length > 0 && Array.isArray(datos)) {
                const tbody = document.querySelector("#data tbody");
                let html = "";
    
                datos.forEach((elemento) => {
                    html += `<tr>
                                <td>${elemento.categoria}</td>
                                <td>${elemento.producto}</td>
                                <td>${elemento.proveedor}</td>
                                <td>${elemento.stocks}</td>
                                <td>${elemento.min_aviso}</td>
                                <td>${elemento.p_compra}</td>
                                <td>${elemento.p_venta}</td>
                                <td nowrap>
                                    <button class="btn--editar button button--tabla btn--ajustable" onclick="editarDato(${elemento.id})">Editar</button>
                                    <button class="button button--tabla btn--ajustable" onclick="eliminarDato(${elemento.id})">Eliminar</button>
                                </td>
                            </tr>`;
                });
    
                tbody.innerHTML = html;
    
                // Aquí seleccionamos los botones de editar después de que se hayan cargado en el DOM
                const btnsEditarProducto = document.querySelectorAll(".btn--editar");
                btnsEditarProducto.forEach(btn => {
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
    

    
    // Función para agregar un nuevo producto usando Axios
    function agregarDato() {
        // Validar campos
        if (validarCampos()) {
            const categoria = inputCategoria.value;
            const producto = inputProducto.value;
            const proveedor = inputProveedor.value;
            const minAvisoValor = minAviso.value;
            const PreComprasValor = PreCompras.value;
            const PreVentaValor = PreVenta.value;

            // Objeto con los datos del nuevo producto
            const nuevoProducto = {
                categoria: categoria,
                producto: producto,
                proveedor: proveedor,
                stocks: 0,
                min_aviso: minAvisoValor,
                p_compra: PreComprasValor,
                p_venta: PreVentaValor
            };

            // Realizar la solicitud POST usando Axios
            axios.post("../php/productos.php", nuevoProducto)
                .then(response => {
                    console.log(response.data); // Manejar la respuesta si es necesario
                    cargarDatos(); // Volver a cargar los datos después de agregar el producto
                    
                })
                .catch(error => {
                    console.error('Error en la solicitud Axios:', error);
                    alert("Error al agregar producto. Por favor, intenta nuevamente.");
                });

            alertaBuena();
            btnCerrarModal.click();


        } else {
        }
    }




    // Función para eliminar un producto
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
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                alertaBuena();
                axios.delete(`../php/productos.php?id=${index}`)
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
        axios.get(`../php/productos.php?id=${index}`)
        .then(response => {
            const datos = response.data;

            console.log(datos)
            var objProducto = datos[0];
            const edinputCategoria = document.getElementById("editCate");
            const edinputProducto = document.getElementById("editProdu");
            const edinputProveedor = document.getElementById("editProvee");
            const edminAviso = document.getElementById("editMin");
            const edPreCompras = document.getElementById("editCompra");
            const edPreVenta = document.getElementById("editVenta");

            edinputCategoria.value = objProducto.categoria;
            edinputProducto.value = objProducto.producto;
            edinputProveedor.value = objProducto.proveedor;
            edminAviso.value = objProducto.min_aviso;
            edPreCompras.value = objProducto.p_compra;
            edPreVenta.value = objProducto.p_venta;

            
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
            alert("Error al eliminar producto. Por favor, intenta nuevamente.");
        });

        

        

    }


    //funcion de actualizar
    function actulizar(){
        const edinputCategoria = document.getElementById("editCate").value;
        const edinputProducto = document.getElementById("editProdu").value;
        const edinputProveedor = document.getElementById("editProvee").value;
        const edminAviso = document.getElementById("editMin").value;
        const edPreCompras = document.getElementById("editCompra").value;
        const edPreVenta = document.getElementById("editVenta").value;
        
        if (edinputCategoria.trim() !== "" && edinputProducto.trim() !== "" && edinputProveedor.trim() !== "" && edminAviso.trim() !== "" && edPreCompras.trim() !== "" && edPreVenta.trim() !== "") {
            const actualizarProducto = {
                id: indice,
                categoria: edinputCategoria,
                producto: edinputProducto,
                proveedor: edinputProveedor,
                stocks: 0,
                min_aviso: edminAviso,
                p_compra: edPreCompras,
                p_venta: edPreVenta
            };
            axios.put("../php/productos.php", actualizarProducto)
            .then(response => {
                console.log(response.data); // Manejar la respuesta si es necesario
                cargarDatos(); // Volver a cargar los datos después de agregar el producto
                alertaBuena();
                btnOcultarModal.click()
                
            })
            .catch(error => {
                console.error('Error en la solicitud Axios:', error);
                alert("Error al agregar producto. Por favor, intenta nuevamente.");
            });
        }
        
    }

    const inputNombreFilter = document.getElementById("InputNombre");
    const inputCategoriaFilter = document.getElementById("InputCategoria");
    const inputProveedorFilter = document.getElementById("InputProveedor");

    inputNombreFilter.addEventListener("input", () => {
        const inputNombreValor = inputNombreFilter.value;
        filtradoNombre(inputNombreValor, "nombre");
    });

    inputCategoriaFilter.addEventListener("input", () => {
        const inputCategoriaValor = inputCategoriaFilter.value;
        filtradoNombre(inputCategoriaValor, "categoria");
    });

    inputProveedorFilter.addEventListener("input", () => {
        const inputProveedorValor = inputProveedorFilter.value;
        filtradoNombre(inputProveedorValor, "proveedor");
    });


    function eliminarAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };

    function filtradoNombre(valor, tipo) {
        

        axios.get("../php/productos.php")
        .then(response => {
            const listaProductos = response.data;

            if (tipo === "nombre") {
                listaFiltrada = listaProductos.filter(elemento => eliminarAcentos(elemento.producto.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            } else if (tipo === "categoria") {
                listaFiltrada = listaProductos.filter(elemento => eliminarAcentos(elemento.categoria.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            } else if (tipo === "proveedor") {
                listaFiltrada = listaProductos.filter(elemento => eliminarAcentos(elemento.proveedor.toUpperCase()).includes(eliminarAcentos(valor.toUpperCase())));
            }
    
            const tbody = document.querySelector("#data tbody");
            let html = "";
            listaFiltrada.forEach((elemento) => {
                html += `<tr>
                                <td>${elemento.categoria}</td>
                                <td>${elemento.producto}</td>
                                <td>${elemento.proveedor}</td>
                                <td>${elemento.stocks}</td>
                                <td>${elemento.min_aviso}</td>
                                <td>${elemento.p_compra}</td>
                                <td>${elemento.p_venta}</td>
                                <td nowrap>
                                    <button class="btn--editar button button--tabla btn--ajustable" onclick="editarDato(${elemento.id})">Editar</button>
                                    <button class="button button--tabla btn--ajustable" onclick="eliminarDato(${elemento.id})">Eliminar</button>
                                </td>
                            </tr>`;
            });
            tbody.innerHTML = html; // Reemplaza el contenido del tbody con el nuevo HTML

            const btnsEditarProducto = document.querySelectorAll(".btn--editar");
                btnsEditarProducto.forEach(btn => {
                    btn.addEventListener("click", () => {
                        modalEditar.classList.toggle("modal--view");
                    });
                });
        

        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
        });



    }


    // Cargar los datos al inicio
    cargarDatos();
});
