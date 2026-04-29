class Figura {
    constructor(posicionesCursor, color_linea, color_relleno, grozor_linea
    ) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.color_linea = color_linea
        this.color_relleno = color_relleno
        this.grozor_linea = grozor_linea
    }
}

export class Cuadrado extends Figura {
    constructor(posicionesCursor = {},
        color_linea = "black",
        color_relleno = "black",
        grozor_linea = 5) {

        super(posicionesCursor, color_linea, color_relleno, grozor_linea);

        this.x = Math.min(this.posicionesCursor.iniciales.x, this.posicionesCursor.finales.x)
        this.y = Math.min(this.posicionesCursor.iniciales.y, this.posicionesCursor.finales.y);

        this.alto = Math.abs(this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y)
        this.ancho = Math.abs(this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x);

    }
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color_relleno
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea

        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
    }
}

export class Circulo extends Figura {
    constructor(
        posicionesCursor = {},
        color_linea = "black",
        color_relleno = "transparent",
        grozor_linea = 5
    ) {
        super(posicionesCursor, color_linea, color_relleno, grozor_linea);

        // Centro del círculo
        this.x = this.posicionesCursor.iniciales.x;
        this.y = this.posicionesCursor.iniciales.y;

        // Calcular radio usando distancia entre puntos
        const dx = this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x;
        const dy = this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y;

        this.radio = Math.sqrt(dx * dx + dy * dy);
    }

    Dibujar(ctx) {
        ctx.beginPath();

        ctx.strokeStyle = this.color_linea;
        ctx.fillStyle = this.color_relleno;
        ctx.lineWidth = this.grozor_linea;

        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);

        ctx.fill();
        ctx.stroke();
    }
}

export class Linea {
    constructor(posicionesCursor = {}, color_linea = "black", grozor_linea = 5) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.color_linea = color_linea
        this.grozor_linea = grozor_linea
    }
    Dibujar(ctx) {
        ctx.beginPath()
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea
        ctx.moveTo(this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y)
        ctx.lineTo(this.posicionesCursor.finales.x, this.posicionesCursor.finales.y)
        ctx.stroke();
    }
}

export class Sticker {
    constructor(posicionesCursor, urlImagen) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        },
        this.imagen = new Image();
        this.imagen.src = urlImagen;
    }
    Dibujar(ctx) {
        ctx.beginPath()
        ctx.drawImage(this.imagen, 0,0, this.imagen.width, this.imagen.height,
            this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y, this.imagen.width/2, this.imagen.height/2 
        )
    }
}
export class Triangulo {
    constructor(posicionesCursor, color_linea, color_relleno, grozor_linea) {
        this.posicionesCursor = posicionesCursor;
        this.color_linea = color_linea;
        this.color_relleno = color_relleno;
        this.grozor_linea = grozor_linea;
    }

    Dibujar(ctx) {
        const { iniciales, finales } = this.posicionesCursor;

        ctx.beginPath();
        ctx.strokeStyle = this.color_linea;
        ctx.fillStyle = this.color_relleno;
        ctx.lineWidth = this.grozor_linea;

        ctx.moveTo(iniciales.x, finales.y);
        ctx.lineTo((iniciales.x + finales.x) / 2, iniciales.y);
        ctx.lineTo(finales.x, finales.y);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
    }
}