document.addEventListener("DOMContentLoaded", () => {
    //botones
    const btnNewProveedor = document.getElementById("btn--new--proveedor");
    const btnEscoderNewProveedor = document.getElementById("btn--esconder--new--proveedor");
    const btnEconderEditar = document.getElementById("btn--esconder--editar--proveedor");
    const btnGuardarDato = document.getElementById("guardarDdato");

    //Campos
    const Nombre = document.getElementById("inputNombre");
    const Direccion = document.getElementById("inputDireccion");
    const Correo = document.getElementById("inputCorreo");
    const Contacto = document.getElementById("inputContacto");
    const TipoDeProducto = document.getElementById("inputTipoProductos");
    const Pago = document.getElementById("inputFpago");
    const EstadoProveedor = document.getElementById("inputEstado");

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
        return Nombre.value && Direccion.value && Correo.value && Contacto.value && TipoDeProducto.value && Pago.value && EstadoProveedor.value;
    }

    function agregarDato() {
        if (validarCampos()) {
            
            const NombreAgregar = Nombre.value;
            const DireccionAgregar = Direccion.value;
            const CorreoAgregar = Correo.value;
            const ContactoAgregar = Contacto.value;
            const TipoDeProductoAgregar = TipoDeProducto.value;
            const PagoAgregar = Pago.value;
            const EstadoProveedorAgregar = EstadoProveedor.value;

            let listaProveedores = localStorage.getItem("listaProveedores") ? JSON.parse(localStorage.getItem("listaProveedores")) : [];

            listaProveedores.push({
                Nombre: NombreAgregar,
                Direccion: DireccionAgregar,
                Correo: CorreoAgregar,
                Contacto: ContactoAgregar,
                TipoDeProducto: TipoDeProductoAgregar,
                Pago: PagoAgregar,
                EstadoProveedor: EstadoProveedorAgregar
            });

            localStorage.setItem("listaProveedores", JSON.stringify(listaProveedores));
            
            cargarDatos();

            // Vaciar los campos de entrada
            Nombre.value = "";
            Direccion.value = "";
            Correo.value = "";
            Contacto.value = "";
            TipoDeProducto.value = "";
            Pago.value = "";
            EstadoProveedor.value = "";

            // Simular clic en el botón para cerrar la ventana de registro
            btnEscoderNewProveedor.click();
        } else {
            alert("Falta llenar campos")
        }
    }
    function cargarDatos() {
        let listaProveedores = localStorage.getItem("listaProveedores") ? JSON.parse(localStorage.getItem("listaProveedores")) : [];

        const tbody = document.querySelector("#data tbody");
        let html = "";
        listaProveedores.forEach((elemento, index) => {
            html += `<tr>
                        <td>${elemento.Nombre}</td>
                        <td>${elemento.Direccion}</td>
                        <td>${elemento.Correo}</td>
                        <td>${elemento.Contacto}</td>
                        <td>${elemento.TipoDeProducto}</td>
                        <td>${elemento.Pago}</td>
                        <td>${elemento.EstadoProveedor}</td>
                        <td nowrap>
                            <button class="button button--tabla btn--editar" onclick="editarDato(${index})">Editar</button>
                            <button class="button button--tabla" onclick="eliminarDato(${index})">Eliminar</button>
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
    }
    cargarDatos();

    window.eliminarDato = function(index) {
        let listaProveedores = localStorage.getItem("listaProveedores") ? JSON.parse(localStorage.getItem("listaProveedores")) : [];
        listaProveedores.splice(index, 1);
        localStorage.setItem("listaProveedores", JSON.stringify(listaProveedores));
        cargarDatos();
    }

    window.editarDato = function(index){
        
        let listaProveedores = localStorage.getItem("listaProveedores") ? JSON.parse(localStorage.getItem("listaProveedores")) : [];
        
        var objProveedor = listaProveedores[index];
        const Nombre = document.getElementById("editNombre");
        const Direccion = document.getElementById("editDireccion");
        const Correo = document.getElementById("editCorreo");
        const Contacto = document.getElementById("editContacto");
        const TipoDeProducto = document.getElementById("editTipoProductos");
        const Pago = document.getElementById("editFpago");
        const EstadoProveedor = document.getElementById("editEstado");

        Nombre.value = objProveedor.Nombre;
        Direccion.value = objProveedor.Direccion;
        Correo.value = objProveedor.Correo;
        Contacto.value = objProveedor.Contacto;
        TipoDeProducto.value = objProveedor.TipoDeProducto;
        Pago.value = objProveedor.Pago;
        EstadoProveedor.value = objProveedor.EstadoProveedor;

        indice = index;
    }
})