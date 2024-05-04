const btnbienvenida = document.getElementById("boton_bienvenida"); 

const caja1 = document.querySelector(".contenedor--iniciar--sesion");
const caja2 = document.querySelector(".contenedor--registro");
//segunda base
const btnregistro = document.getElementById("boton_sesion"); 

const caja3 = document.querySelector(".contenedor--registrarse");
const caja4 = document.querySelector(".contenedor--sesion");

const cajabotones = document.querySelectorAll(".button");
const cajabotones2 = document.querySelectorAll(".button_mover");
const cajabotones3 = document.querySelectorAll(".dao");


btnbienvenida.addEventListener("click", ()=>{
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

btnregistro.addEventListener("click", ()=>{
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