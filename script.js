const desplegar = document.getElementById("desplegar");
const barralateral = document.querySelector(".barralateral")
const icono = document.querySelector(".des")

desplegar.addEventListener("click",()=>{
    barralateral.classList.toggle("barralateral2")
});
desplegar.addEventListener("click",()=>{
    icono.classList.toggle("des2")
});