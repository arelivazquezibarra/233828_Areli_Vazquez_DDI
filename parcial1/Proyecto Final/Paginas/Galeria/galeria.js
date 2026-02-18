const elementos = document.querySelectorAll(".contenedor-grid div");

elementos.forEach((elemento, index) => {

    if(index % 2 === 0){
        elemento.style.borderRadius = "20px";
    } else {
        elemento.style.borderRadius = "8px";
    }

    elemento.addEventListener("mouseenter", () => {
        elemento.style.transform = "scale(1.1) rotate(3deg)";
        elemento.style.transition = "0.3s";
    });

    elemento.addEventListener("mouseleave", () => {
        elemento.style.transform = "scale(1)";
    });

});