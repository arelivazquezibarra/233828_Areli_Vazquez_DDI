const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

const posicionesCursor = {
    iniciales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
}

let presionado = false;

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
imagen.src = "../recursos/pikachu.png";
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
    //dibujarLinea();
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;
    if(presionado){
        
        dibujarLinea();
    }
    //console.log(posicionesCursor);
}

function alSoltarClick(event) {
    console.log("se solto el boton click en el lienzo");
    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;
    dibujarLinea();
    presionado = false;
}

function dibujarLinea() {
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    ctx.beginPath();
    ctx.moveTo(posicionesCursor.iniciales.x, posicionesCursor.iniciales.y);
    ctx.lineTo(posicionesCursor.finales.x, posicionesCursor.finales.y);
    ctx.stroke();
}