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
        let listaProductos = localStorage.getItem("listaProductos") ? JSON.parse(localStorage.getItem("listaProductos")) : [];
        const tbody = document.querySelector("#data tbody");
        let html = "";
        listaProductos.forEach((elemento, index) => {
            html += `<tr>
                        <td>${elemento.categoria}</td>
                        <td>${elemento.producto}</td>
                        <td>${elemento.proveedor}</td>
                        <td></td>
                        <td>${elemento.minAviso}</td>
                        <td>${elemento.PreCompras}</td>
                        <td>${elemento.PreVenta}</td>
                        <td nowrap>
                            <button class="btn--editar button button--tabla btn--ajustable" onclick="editarDato(${index})">Editar</button>
                            <button class="button button--tabla btn--ajustable" onclick="eliminarDato(${index})">Eliminar</button>
                        </td>
                    </tr>`;
        });
        tbody.innerHTML = html; // Reemplaza el contenido del tbody con el nuevo HTML

        // Aquí seleccionamos los botones de editar después de que se hayan cargado en el DOM
        const btnsEditarProducto = document.querySelectorAll(".btn--editar");
        btnsEditarProducto.forEach(btn => {
            btn.addEventListener("click", () => {
                modalEditar.classList.toggle("modal--view");
            });
        });
    }

    // Función para agregar un nuevo producto
    function agregarDato() {
        if (validarCampos()) {
            const categoria = inputCategoria.value;
            const producto = inputProducto.value;
            const proveedor = inputProveedor.value;
            const minAvisoValor = minAviso.value;
            const PreComprasValor = PreCompras.value;
            const PreVentaValor = PreVenta.value;

            let listaProductos = localStorage.getItem("listaProductos") ? JSON.parse(localStorage.getItem("listaProductos")) : [];

            listaProductos.push({
                categoria: categoria,
                producto: producto,
                proveedor: proveedor,
                minAviso: minAvisoValor,
                PreCompras: PreComprasValor,
                PreVenta: PreVentaValor
            });

            localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
            
            cargarDatos();

            // Vaciar los campos de entrada
            inputCategoria.value = "";
            inputProducto.value = "";
            inputProveedor.value = "";
            minAviso.value = "";
            PreCompras.value = "";
            PreVenta.value = "";

            // Simular clic en el botón para cerrar la ventana de registro
            btnCerrarModal.click();
        } else {
            alert("Falta llenar campos")
        }
    }

    // Función para eliminar un producto
    window.eliminarDato = function(index) {
        let listaProductos = localStorage.getItem("listaProductos") ? JSON.parse(localStorage.getItem("listaProductos")) : [];
        listaProductos.splice(index, 1);
        localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
        cargarDatos();
    }

    window.editarDato = function(index){
        let listaProductos = localStorage.getItem("listaProductos") ? JSON.parse(localStorage.getItem("listaProductos")) : [];
        var objProducto = listaProductos[index];

        const edinputCategoria = document.getElementById("editCate");
        const edinputProducto = document.getElementById("editProdu");
        const edinputProveedor = document.getElementById("editProvee");
        const edminAviso = document.getElementById("editMin");
        const edPreCompras = document.getElementById("editCompra");
        const edPreVenta = document.getElementById("editVenta");

        edinputCategoria.value = objProducto.categoria;
        edinputProducto.value = objProducto.producto;
        edinputProveedor.value = objProducto.proveedor;
        edminAviso.value = objProducto.minAviso;
        edPreCompras.value = objProducto.PreCompras;
        edPreVenta.value = objProducto.PreVenta;

        indice = index;
        //btnnNewProducto.click();
    }


    //funcion de actualizar
    function actulizar(){
        let listaProductos = localStorage.getItem("listaProductos") ? JSON.parse(localStorage.getItem("listaProductos")) : [];

        const edinputCategoria = document.getElementById("editCate").value;
        const edinputProducto = document.getElementById("editProdu").value;
        const edinputProveedor = document.getElementById("editProvee").value;
        const edminAviso = document.getElementById("editMin").value;
        const edPreCompras = document.getElementById("editCompra").value;
        const edPreVenta = document.getElementById("editVenta").value;

        listaProductos[indice] = {
            categoria: edinputCategoria,
            producto: edinputProducto,
            proveedor: edinputProveedor,
            minAviso: edminAviso,
            PreCompras: edPreCompras,
            PreVenta: edPreVenta
        };

        localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
        cargarDatos();
        btnOcultarModal.click();
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

    function filtradoNombre(valor, tipo) {
        let listaProductos = localStorage.getItem("listaProductos") ? JSON.parse(localStorage.getItem("listaProductos")) : [];

        let listaFiltrada = [];

        if (tipo === "nombre") {
            listaFiltrada = listaProductos.filter(elemento => elemento.producto.includes(valor));
        } else if (tipo === "categoria") {
            listaFiltrada = listaProductos.filter(elemento => elemento.categoria.includes(valor));
        } else if (tipo === "proveedor") {
            listaFiltrada = listaProductos.filter(elemento => elemento.proveedor.includes(valor));
        }

        const tbody = document.querySelector("#data tbody");
        let html = "";
        listaFiltrada.forEach((elemento, index) => {
            html += `<tr>
                        <td>${elemento.categoria}</td>
                        <td>${elemento.producto}</td>
                        <td>${elemento.proveedor}</td>
                        <td></td>
                        <td>${elemento.minAviso}</td>
                        <td>${elemento.PreCompras}</td>
                        <td>${elemento.PreVenta}</td>
                        <td nowrap>
                            <button class="btn--editar button button--tabla btn--ajustable" onclick="editarDato(${index})">Editar</button>
                            <button class="button button--tabla btn--ajustable" onclick="eliminarDato(${index})">Eliminar</button>
                        </td>
                    </tr>`;
        });
        tbody.innerHTML = html; // Reemplaza el contenido del tbody con el nuevo HTML
    }






    // Cargar los datos al inicio
    cargarDatos();
});
