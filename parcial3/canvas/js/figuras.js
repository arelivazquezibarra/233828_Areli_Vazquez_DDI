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

    constructor(
        posicionesCursor = {},
        color_linea = "black",
        color_relleno = "black",
        grozor_linea = 5,
        usarRelleno = true,
        usarBorde = true
    ) {

        super(
            posicionesCursor,
            color_linea,
            color_relleno,
            grozor_linea
        );

        this.usarRelleno = usarRelleno;
        this.usarBorde = usarBorde;

        this.x = Math.min(
            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.finales.x
        );

        this.y = Math.min(
            this.posicionesCursor.iniciales.y,
            this.posicionesCursor.finales.y
        );

        this.alto = Math.abs(
            this.posicionesCursor.finales.y -
            this.posicionesCursor.iniciales.y
        );

        this.ancho = Math.abs(
            this.posicionesCursor.finales.x -
            this.posicionesCursor.iniciales.x
        );
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;

        if(this.usarRelleno){
            ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        }

        if(this.usarBorde){
            ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        }
    }
}

export class Circulo extends Figura {

    constructor(
        posicionesCursor = {},
        color_linea = "black",
        color_relleno = "transparent",
        grozor_linea = 5,
        usarRelleno = true,
        usarBorde = true
    ) {

        super(
            posicionesCursor,
            color_linea,
            color_relleno,
            grozor_linea
        );

        this.usarRelleno = usarRelleno;
        this.usarBorde = usarBorde;

        this.x = this.posicionesCursor.iniciales.x;
        this.y = this.posicionesCursor.iniciales.y;

        const dx =
            this.posicionesCursor.finales.x -
            this.posicionesCursor.iniciales.x;

        const dy =
            this.posicionesCursor.finales.y -
            this.posicionesCursor.iniciales.y;

        this.radio = Math.sqrt(dx * dx + dy * dy);
    }

    Dibujar(ctx) {

        ctx.beginPath();

        ctx.strokeStyle = this.color_linea;
        ctx.fillStyle = this.color_relleno;
        ctx.lineWidth = this.grozor_linea;

        ctx.arc(
            this.x,
            this.y,
            this.radio,
            0,
            Math.PI * 2
        );

        if(this.usarRelleno){
            ctx.fill();
        }

        if(this.usarBorde){
            ctx.stroke();
        }
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

        this.posicionesCursor = posicionesCursor;

        this.imagen = new Image();
        this.imagen.src = urlImagen;

        this.ancho = Math.abs(
            posicionesCursor.finales.x -
            posicionesCursor.iniciales.x
        );

        this.alto = Math.abs(
            posicionesCursor.finales.y -
            posicionesCursor.iniciales.y
        );
    }

    Dibujar(ctx) {

        ctx.drawImage(
            this.imagen,
            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.iniciales.y,
            this.ancho,
            this.alto
        );
    }
}
export class Estrella {

    constructor(
        posicionesCursor,
        color_linea,
        color_relleno,
        grozor_linea,
        usarRelleno,
        usarBorde
    ){

        this.posicionesCursor = posicionesCursor;
        this.color_linea = color_linea;
        this.color_relleno = color_relleno;
        this.grozor_linea = grozor_linea;

        this.usarRelleno = usarRelleno;
        this.usarBorde = usarBorde;
    }

    Dibujar(ctx){

        const x = this.posicionesCursor.iniciales.x;
        const y = this.posicionesCursor.iniciales.y;

        const dx = this.posicionesCursor.finales.x - x;
        const dy = this.posicionesCursor.finales.y - y;

        const radio = Math.sqrt(dx * dx + dy * dy);

        ctx.beginPath();

        ctx.strokeStyle = this.color_linea;
        ctx.fillStyle = this.color_relleno;
        ctx.lineWidth = this.grozor_linea;

        const puntas = 5;

        for(let i = 0; i < puntas * 2; i++){

            const angulo = (Math.PI / puntas) * i;

            const r = i % 2 === 0 ? radio : radio / 2;

            const px = x + Math.cos(angulo - Math.PI / 2) * r;
            const py = y + Math.sin(angulo - Math.PI / 2) * r;

            if(i === 0){
                ctx.moveTo(px, py);
            }
            else{
                ctx.lineTo(px, py);
            }
        }

        ctx.closePath();

        if(this.usarRelleno){
            ctx.fill();
        }

        if(this.usarBorde){
            ctx.stroke();
        }
    }
}