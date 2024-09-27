// Elementos de la interfaz
const btnbienvenida = document.getElementById("boton_bienvenida");
const caja1 = document.querySelector(".contenedor--iniciar--sesion");
const caja2 = document.querySelector(".contenedor--registro");
const btnregistro = document.getElementById("boton_sesion");
const caja3 = document.querySelector(".contenedor--registrarse");
const caja4 = document.querySelector(".contenedor--sesion");
const cajabotones = document.querySelectorAll(".button");
const cajabotones2 = document.querySelectorAll(".button_mover");
const cajabotones3 = document.querySelectorAll(".dao");

// Manejar el clic en el botón de bienvenida
btnbienvenida.addEventListener("click", () => {
    caja1.classList.toggle("contenedor--iniciar--sesion--activar");
    caja2.classList.toggle("contenedor--registro--activar");
    caja3.classList.toggle("contenedor--registrarse--activar");
    caja4.classList.toggle("contenedor--sesion--activar");
    cajabotones.forEach(cajaboton => {
        cajaboton.classList.toggle("coloreado--fondo");
    });
    cajabotones2.forEach(cajaboton => {
        cajaboton.classList.toggle("coloreado--fondo");
    });
    cajabotones3.forEach(cajaboton => {
        cajaboton.classList.toggle("coloreado--texto");
    });
});

// Manejar el clic en el botón de registro
btnregistro.addEventListener("click", () => {
    caja3.classList.toggle("contenedor--registrarse--activar");
    caja4.classList.toggle("contenedor--sesion--activar");
    caja1.classList.toggle("contenedor--iniciar--sesion--activar");
    caja2.classList.toggle("contenedor--registro--activar");
    cajabotones.forEach(cajaboton => {
        cajaboton.classList.toggle("coloreado--fondo");
    });
    cajabotones2.forEach(cajaboton => {
        cajaboton.classList.toggle("coloreado--fondo");
    });
    cajabotones3.forEach(cajaboton => {
        cajaboton.classList.toggle("coloreado--texto");
    });
});

// Manejar el inicio de sesión
const btn_logearse = document.getElementById("btn_iniciar");
const inputs_login = document.querySelectorAll(".input_bordes");

btn_logearse.addEventListener("click", () => {
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    window.location.href = "formularios/dashboard.html";
    //Codigo que jala el back
    /*
    if (usuario !== "" && contrasena !== "") {
        axios.get('php/usuarios.php', {
            params: {
                login: true,
                usuario: usuario,
                contrasena: contrasena
            }
        })
        .then(response => {
            const datos = response.data;
            if (datos.status === 'success') {
                // Limpia los campos y redirige si el inicio de sesión es exitoso
                inputs_login.forEach(input => {
                    input.classList.remove('input_error');
                });
                const formulario_login = document.getElementById("formulario_ingresar");
                formulario_login.reset();
                window.location.href = "formularios/dashboard.html";
            } else {
                // Muestra error si las credenciales son incorrectas
                inputs_login.forEach(input => {
                    input.classList.remove('input_error'); // Elimina la clase
                    void input.offsetWidth; // Forzar reflow
                    input.classList.add('input_error'); // Vuelve a agregar la clase
                });
            }
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
            alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
        });
    } else {
        // Muestra error si los campos están vacíos
        inputs_login.forEach(input => {
            input.classList.remove('input_error'); // Elimina la clase
            void input.offsetWidth; // Forzar reflow
            input.classList.add('input_error'); // Vuelve a agregar la clase
        });
    }*/
});
