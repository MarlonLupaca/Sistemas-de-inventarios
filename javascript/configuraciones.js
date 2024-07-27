document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar los datos del usuario
    function cargarDatosUsuario() {
        axios.get('../php/usuarios.php?session_user=true')
            .then(response => {
                const datos = response.data;

                if (datos && !datos.error) {
                    document.getElementById('nombre').value = datos.nombre || '';
                    document.getElementById('usuario').value = datos.usuario || '';
                    document.getElementById('contraseña').value = datos.contrasena || '';
                } else {
                    console.error('Error en los datos del usuario:', datos.error);
                }
            })
            .catch(error => {
                console.error('Error en la solicitud Axios:', error);
            });
    }

    // Llama a la función cuando la página esté lista
    cargarDatosUsuario();
});
