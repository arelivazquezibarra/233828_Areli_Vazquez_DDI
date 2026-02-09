let contenido = document.querySelector("#contenedor_contenido");
const boton = document.querySelector("#boton");
let bandera = false;

function cambiarColor(color) {
    contenido.style.background = color;   
}

function cambiarTamaño(ancho, alto){
    contenido.style.width = ancho;
    contenido.style.height = alto;
}

function cambiarTamañoIntervalo(){
    if(bandera){
        cambiarColor("white");
        cambiarTamaño("1000px", "1000px");
        bandera = false;
    } else {
        cambiarColor("blue"); 
        cambiarTamaño("500px", "500px");
        bandera = true;
    }
    console.log("cambiar tamaño");
    contenido.style.width = "800px";
    contenido.style.height = "800px";
}

boton.addEventListener('click', () => {

    
});

setInterval(cambiarTamañoIntervalo, 1000)
