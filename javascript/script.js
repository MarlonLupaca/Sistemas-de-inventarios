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

//modulo empleados
const btnNewEmpleado = document.getElementById("btn--new--empleado");
const btnNewEmpleadoOcultar = document.getElementById("btn--esconder--new--empleado");

const btnsEditarEmpleado = document.querySelectorAll(".btn--editar");
const btnsEditarEmpleadoOcultar = document.getElementById("btn--esconder--editar--empleado");

const modal = document.querySelector(".modal");
const modalEditar = document.querySelector(".modal--editar");

btnNewEmpleado.addEventListener("click", () => {
    modal.classList.toggle("modal--view");
    
});
btnNewEmpleadoOcultar.addEventListener("click", () => {
    modal.classList.toggle("modal--view");
});

btnsEditarEmpleado.forEach(btn => {
    btn.addEventListener("click", () => {
        modalEditar.classList.toggle("modal--view");
    });
});

btnsEditarEmpleadoOcultar.addEventListener("click", ()=>{
    modalEditar.classList.toggle("modal--view");
})


//movimientos
const btnNewEntrada = document.getElementById("btn--new--entrada");
const btnOcultarEntrada = document.getElementById("btn--esconder--entrada");

const modalEntrada = document.querySelector(".modal--salida");

btnNewEntrada.addEventListener("click", () => {
    modalEntrada.classList.toggle("modal--view");
});
btnOcultarEntrada.addEventListener("click", () => {
    modalEntrada.classList.toggle("modal--view");
});