document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar los datos del usuario
    function cargarDatosUsuario() {
        axios.get('../php/usuarios.php?session_user=true')
            .then(response => {
                const datos = response.data;

                if (datos && !datos.error) {
                    document.getElementById('nombre').value = datos.nombre || '';
                    document.getElementById('apellido').value = datos.apellido || '';
                    document.getElementById('usuario').value = datos.usuario || '';
                    // Para la contraseña, considera que no se debe mostrar directamente
                    document.getElementById('contraseña').value = datos.contrasena || '';
                    // Aquí podrías agregar lógica para mostrar la foto del usuario si la tienes disponible
                    // Ejemplo: document.querySelector('.imagens img').src = datos.foto || '../imagenes/default.jpg';
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
