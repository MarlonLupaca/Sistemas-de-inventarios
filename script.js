const desplegar = document.getElementById("desplegar");
const barralateral = document.querySelector(".barralateral");
const nombresBarra = document.querySelectorAll(".text");
const icono = document.querySelector(".des");

desplegar.addEventListener("click", () => {
    barralateral.classList.toggle("barralateral-mini");
    icono.classList.toggle("des2");
    nombresBarra.forEach(elemento => {
        elemento.classList.toggle("menuDes");
    });
});

