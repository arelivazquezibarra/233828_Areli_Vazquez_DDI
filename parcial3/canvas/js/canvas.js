import { Cuadrado, Linea, Sticker, Circulo, Estrella } from "./figuras.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");
const elementos = [];
let rehacer = [];
let historialCanvas = [];
const opciones = {
    pincel: true,
    linea: false,
    circulo: false,
    cuadro: false,
    estrella: false,
    borrador: false,
    sticker: false,
}

const posicionesCursor = {
    iniciales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
}
let colorLinea = "blue";
let colorRelleno = "red";
let usarRelleno = true;
let usarBorde = true;
let grosor = 5;
let imagenSticker = "../recursos/bokuto.jpg";
let filtroActivo = "normal";

let presionado = false;

canvas.addEventListener("mousedown", (event) => alPresionarClick(event));
canvas.addEventListener("mousemove", (event) => mientrasPresionaClick(event));
canvas.addEventListener("mouseup", (event) => alSoltarClick(event));

document.querySelector("#btn_pincel").addEventListener("click", () => cambiarOpcion("pincel"))
document.querySelector("#btn_linea").addEventListener("click", () => cambiarOpcion("linea"))
document.querySelector("#btn_cuadro").addEventListener("click", () => cambiarOpcion("cuadro"))
document.querySelector("#btn_circulo").addEventListener("click", () => cambiarOpcion("circulo"))
document.querySelector("#btn_estrella").addEventListener("click", () => cambiarOpcion("estrella"))
document.querySelector("#btn_sticker").addEventListener("click", () => cambiarOpcion("sticker"))
document.querySelector("#btn_borrador").addEventListener("click", () => cambiarOpcion("borrador"))

document.querySelector("#modo_relleno").onchange = (e) => {
    usarRelleno = e.target.checked;
};

document.querySelector("#modo_borde").onchange = (e) => {
    usarBorde = e.target.checked;
};

document.querySelector("#input_file").addEventListener("change", (event) => {
    const archivo = event.target.files[0];
    if(!archivo) return;
    imagenSticker = URL.createObjectURL(archivo);
})

document.querySelector("#color_linea").addEventListener("input", (event) => {

    colorLinea = event.target.value;

});
document.querySelector("#color_relleno").addEventListener("input", (event) => {

    colorRelleno = event.target.value;

});
document.querySelector("#grosor").addEventListener("input", (event) => {

    grosor = event.target.value;

});

document.querySelector("#f_bn").onclick = () => {
    filtroActivo = "bn";
    RenderizarElementos();
};

document.querySelector("#f_rojo").onclick = () => {
    filtroActivo = "rojo";
    RenderizarElementos();
};

document.querySelector("#f_verde").onclick = () => {
    filtroActivo = "verde";
    RenderizarElementos();
};

document.querySelector("#f_azul").onclick = () => {
    filtroActivo = "azul";
    RenderizarElementos();
};

document.querySelector("#f_sepia").onclick = () => {
    filtroActivo = "sepia";
    RenderizarElementos();
};
document.querySelector("#f_negativo").onclick = () => {
    filtroActivo = "negativo";
    RenderizarElementos();
};

document.querySelector("#f_positivo").onclick = () => {
    filtroActivo = "positivo";
    RenderizarElementos();
};

document.querySelector("#btn_limpiar").onclick = () => {
    elementos.length = 0;
    RenderizarElementos();
};

document.querySelector("#btn_deshacer").onclick = () => {
    if(elementos.length){
        rehacer.push(elementos.pop());
        RenderizarElementos();
    }
};

document.querySelector("#btn_rehacer").onclick = () => {
    if(rehacer.length){
        elementos.push(rehacer.pop());
        RenderizarElementos();
    }
};

document.querySelector("#btn_guardar").onclick = () => {
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = canvas.toDataURL();
    link.click();
};

function cambiarOpcion(opcion) {
    for (let clave in opciones) {
        opciones[clave] = false
    }
    opciones[opcion] = true;
    console.log(opciones);
}

function obtenerElemento(){

    const copia = {
        iniciales: {
            x: posicionesCursor.iniciales.x,
            y: posicionesCursor.iniciales.y
        },
        finales: {
            x: posicionesCursor.finales.x,
            y: posicionesCursor.finales.y
        }
    };

    if (opciones.pincel) {
        return new Linea(copia, colorLinea, grosor);
    }

    else if (opciones.linea) {
        return new Linea(copia, colorLinea, grosor);
    }

    else if (opciones.cuadro) {
        return new Cuadrado(copia, colorLinea, colorRelleno, grosor, usarRelleno, usarBorde);
    }

    else if (opciones.circulo) {
        return new Circulo(copia, colorLinea, colorRelleno, grosor, usarRelleno, usarBorde);
    }

    else if (opciones.estrella) {
        return new Estrella(copia, colorLinea, colorRelleno, grosor, usarRelleno, usarBorde);
    }

    else if (opciones.sticker) {
        return new Sticker(copia, imagenSticker);
    }

    return null;
}
/*
ctx.fillRect();
ctx.strokeRect(); 
ctx.arc()
ctx.fill()
ctx.stroke()
ctx.moveTo()
ctx.lineTo()

ctx.fillStyle
ctx.strokeStyle
ctx.lineWidth

ctx.beginPath(


ctx.font = "48px serif";
ctx.strokeText("hola", 800, 800);
ctx.fillText("hola", 800, 800)

const imagen = new Image();
imagen.src = "../recursos/bokuto.jpg";
imagen.onload = () => {
    ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height,
        0, 0, 500, 500
    );
    // imagen, sx, sy, 
}
*/

function alPresionarClick(event) {
    console.log("se presino el boton click en el lienzo");
    posicionesCursor.iniciales.x = event.offsetX;
    posicionesCursor.iniciales.y = event.offsetY;
    presionado = true;
}

function mientrasPresionaClick(event) {
    console.log("Mientras el cursor esta sobre el lienzo");

    if (!presionado) return;

    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    //BORRADOR
    if(opciones.borrador){

        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.lineWidth = grosor * 2;
        ctx.lineCap = "round";
        ctx.moveTo(
            posicionesCursor.iniciales.x,
            posicionesCursor.iniciales.y
        );
        ctx.lineTo(
            posicionesCursor.finales.x,
            posicionesCursor.finales.y
        );
        ctx.stroke();
        ctx.restore();

        posicionesCursor.iniciales.x = posicionesCursor.finales.x;
        posicionesCursor.iniciales.y = posicionesCursor.finales.y;

        return;
    }
    if(!opciones.borrador){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        RenderizarElementos();
    }

    if(opciones.pincel){ //Esto hace que el pincel tenga un dibujo continuo
        const copia = {
            iniciales: {...posicionesCursor.iniciales},
            finales: {...posicionesCursor.finales}
        };
        const linea = new Linea(copia, colorLinea, grosor);
        elementos.push(linea);

        //Inidica el punto inicial para dibujar
        posicionesCursor.iniciales.x = posicionesCursor.finales.x;
        posicionesCursor.iniciales.y = posicionesCursor.finales.y;

        RenderizarElementos();
        return;
    }

    

    //Para tener las figuras que habias hecho 
    const elemento = obtenerElemento();

    if(elemento){
        elemento.Dibujar(ctx);
    }

    //posicionesCursor.iniciales.x = posicionesCursor.finales.x;
    //posicionesCursor.iniciales.y = posicionesCursor.finales.y;
    //console.log(posicionesCursor);
}

function alSoltarClick(event) {
    console.log("se solto el boton click en el lienzo");
    //let elemento;
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;



    if(!opciones.borrador){

        const elemento = obtenerElemento();

        if(elemento){
            elementos.push(elemento);
        }
    }

    console.log(elementos);

    guardarEstadoCanvas();
    presionado = false;
}

function aplicarFiltro(tipo) {

    if(tipo === "normal") return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {

        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // blanco y negro
        if (tipo === "bn") {
            let gris = (r + g + b) / 3;
            data[i] = gris;
            data[i + 1] = gris;
            data[i + 2] = gris;
        }

        // rojo
        if (tipo === "rojo") {
            data[i] = Math.min(255, data[i] * 1.3);
            data[i + 1] *= 0.3;
            data[i + 2] *= 0.3;
        }

        // verde
        if (tipo === "verde") {
            data[i] = Math.min(255, data[i] * 1.3);      // rojo
            data[i + 1] *= 1.3;  // verde
            data[i + 2] *= 0.3;  // azul
        }

        // azul
        if (tipo === "azul") {
            data[i] = Math.min(255, data[i] * 1.3);
            data[i + 1] *= 0.3;
            data[i + 2] *= 1.3;
        }

        // negativo
        if (tipo === "negativo") {
            data[i] = 255 - r;
            data[i + 1] = 255 - g;
            data[i + 2] = 255 - b;
        }

        //positivo
        if(tipo === "positivo"){
            data[i] = Math.min(255, r + 50);
            data[i + 1] = Math.min(255, g + 50);
            data[i + 2] = Math.min(255, b + 50);
        }

        // sepia
        if (tipo === "sepia") {
            data[i] = 0.393 * r + 0.769 * g + 0.189 * b;
            data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b;
            data[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b;
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function RenderizarElementos() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < elementos.length; i++) {

        elementos[i].Dibujar(ctx);

    }

    aplicarFiltro(filtroActivo);
}

function Limpiar() {
    elementos.length = 0;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}
function guardarEstadoCanvas() {
    historialCanvas.push(
        ctx.getImageData(0, 0, canvas.width, canvas.height)
    );
}