import { Cuadrado, Linea, Sticker, Circulo, Triangulo } from "./figuras.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");
const elementos = [];
let rehacer = [];
const opciones = {
    pincel: true,
    linea: false,
    circulo: false,
    cuadro: false,
    triangulo: false,
    borrador: false,
    sticker: false,
}

const posicionesCursor = {
    iniciales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
}
let colorLinea = "blue";
let colorRelleno = "red";
let grosor = 5;
let imagenSticker = "../recursos/bokuto.jpg";

let presionado = false;

canvas.addEventListener("mousedown", (event) => alPresionarClick(event));
canvas.addEventListener("mousemove", (event) => mientrasPrecionaClick(event));
canvas.addEventListener("mouseup", (event) => alSoltarClick(event));

document.querySelector("#btn_pincel").addEventListener("click", () => cambiarOpcion("pincel"))
document.querySelector("#btn_linea").addEventListener("click", () => cambiarOpcion("linea"))
document.querySelector("#btn_cuadro").addEventListener("click", () => cambiarOpcion("cuadro"))
document.querySelector("#btn_circulo").addEventListener("click", () => cambiarOpcion("circulo"))
document.querySelector("#btn_triangulo").addEventListener("click", () => cambiarOpcion("triangulo"))
document.querySelector("#btn_sticker").addEventListener("click", () => cambiarOpcion("sticker"))
document.querySelector("#btn_borrador").addEventListener("click", () => cambiarOpcion("borrador"))
f_bn.onclick = () => aplicarFiltro("bn");
f_rojo.onclick = () => aplicarFiltro("rojo");
f_verde.onclick = () => aplicarFiltro("verde");
f_azul.onclick = () => aplicarFiltro("azul");
f_sepia.onclick = () => aplicarFiltro("sepia");

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
    if (opciones.pincel) {
        return new Linea(posicionesCursor, colorLinea, grosor);
    }
    else if (opciones.linea) {
        return new Linea(posicionesCursor, colorLinea, grosor);
    }
    else if (opciones.cuadro) {
        return new Cuadrado(posicionesCursor, colorLinea, colorRelleno, grosor);
    }
    else if (opciones.circulo) {
        return new Circulo(posicionesCursor, colorLinea, colorRelleno, grosor);
    }
    else if (opciones.sticker) {
        return new Sticker(posicionesCursor, imagenSticker);
    }
    else if (opciones.borrador) {
        return new Linea(posicionesCursor, "#ffffff", grosor * 2);
    }
    else if (opciones.triangulo) {
        return new Triangulo(posicionesCursor, colorLinea, colorRelleno, grosor);
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

function mientrasPrecionaClick(event) {
    console.log("Mientras el cursor esta sobre el lienzo");

    if (!presionado) return;

    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    ctx.clearRect(0, 0, canvas.width, canvas.height); //Esto limpia el canvas 

    RenderizarElementos(); //Esto dibuja lo que se habia guardado 

    if(opciones.pincel){ //Esto hace que el pincel tenga un dibujo continuo
        const copia = {
            iniciales: {...posicionesCursor.iniciales},
            finales: {...posicionesCursor.finales}
        };
        const linea = new Linea(posicionesCursor, colorLinea, grosor);
        elementos.push(linea);

        //Inidica el punto inicial para dibujar
        posicionesCursor.iniciales.x = posicionesCursor.finales.x;
        posicionesCursor.iniciales.y = posicionesCursor.finales.y;

        RenderizarElementos();
        return;
    }

    //BORRADOR
    if(opciones.borrador){
        const linea = new Linea(posicionesCursor, "#ffffff", grosor * 2); //Esto no borra como tal, mas bien pinta una linea blanca encima de todo
        elementos.push(linea);

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

    //filtros color rojo

    const imgData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        let rojo = data[i] // rojo
        let verde = data[i + 1] //verde
        let azul = data[i + 2] //azul
        let alfa = data[i + 3] //transparencia

        data[i] = rojo + 50;
        data[i + 1] = verde * .8;
        data[i + 2] = azul * .8;
        data[i + 3] = alfa;
    }

    ctx.putImageData(imgData, 0, 0)

    const elemento = obtenerElemento();
    if(elemento){
        elementos.push(elemento);
        rehacer = [];
    }

    console.log(elementos);

    RenderizarElementos();
    presionado = false;
}

function aplicarFiltro(tipo) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        if (tipo === "bn") {
            let gris = (r + g + b) / 3;
            data[i] = data[i+1] = data[i+2] = gris;
        }

        if (tipo === "rojo") data[i+1] = data[i+2] = 0;
        if (tipo === "verde") data[i] = data[i+2] = 0;
        if (tipo === "azul") data[i] = data[i+1] = 0;

        if (tipo === "sepia") {
            data[i] = 0.393*r + 0.769*g + 0.189*b;
            data[i+1] = 0.349*r + 0.686*g + 0.168*b;
            data[i+2] = 0.272*r + 0.534*g + 0.131*b;
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function RenderizarElementos() {
    console.log("renderizando", elementos);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < elementos.length; i++) {
        elementos[i].Dibujar(ctx);
    }
}

function Limpiar() {
    elementos = [];
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}