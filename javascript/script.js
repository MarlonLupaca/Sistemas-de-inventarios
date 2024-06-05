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
