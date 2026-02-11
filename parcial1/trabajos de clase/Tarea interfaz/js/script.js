let texto1 = document.querySelector("#texto1");
let bandera = false;


function cambiarColor(color) {
    texto1.style.color = color;
}

function cambiarTamaño(tamaño) {
    texto2.style.fontSize = tamaño;
}

function eventoClick() {
    if (bandera) {
        cambiarColor("black");
        bandera = false;
    } else {
        cambiarColor("red");
        bandera = true;
    }
}

texto2.addEventListener("mouseover", () => {
    cambiarTamaño("30px");
});

texto2.addEventListener("mouseout", () => {
    cambiarTamaño("20px");
    console.log("Mouse fuera del elemento");
});