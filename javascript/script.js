const desplegar = document.getElementById("desplegar");
const barralateral = document.querySelector(".barralateral");
const nombresBarra = document.querySelectorAll(".text");
//const icono = document.querySelector(".des");
const main = document.querySelector(".contenido--principal")
const header = document.querySelector(".contenedor--cabecera")

desplegar.addEventListener("click", () => {
    //alert("hola");
    barralateral.classList.toggle("barralateral-mini");
    main.classList.toggle("contenido--flexible")
    header.classList.toggle("contenedor--cabecera--movimiento")
    //icono.classList.toggle("des2");
    nombresBarra.forEach(elemento => {
        elemento.classList.toggle("menuDes");
    });
});

nombres();

function nombres() {
    axios.get('../php/usuarios.php?session_user=true')
        .then(response => {
            const datos = response.data;

            let nombre = datos.nombre;

            if (datos && !datos.error) {
                document.getElementById('nombre_sesion').textContent = nombre;

            } else {
                console.error('Error en los datos del usuario:', datos.error);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud Axios:', error);
        });
}
