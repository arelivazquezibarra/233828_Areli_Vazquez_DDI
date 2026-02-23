const formulario = document.querySelector("#form");
const Form = document.querySelector("#form1")

class UsuarioRegistro {
    constructor(correo, contra) {
        this.correo = correo;
        this.contraseña = contra;
    }

    MostrarDatos() {
        console.log(`Nombre: ${this.nombre}\n Apellido: ${this.apellido}`);
    }
}
function leeDatos(){
    const datosFormulario = new FormData(formulario);

    const datos = Object.fromEntries(datosFormulario.entries());

    let usuario = new UsuarioRegistro( datos.correo, datos.contraseña);
    console.log(usuario);
}
class Usuario {
    constructor(nom, ape, correo, contra) {
        this.nombre = nom;
        this.apellido = ape;
        this.correo = correo;
        this.contraseña = contra;
    }

    MostrarDatos() {
        console.log(`Nombre: ${this.nombre}\n Apellido: ${this.apellido}`);
    }
}
function leerDatos(){
    const datosFormulario = new FormData(formulario);

    const datos = Object.fromEntries(datosFormulario.entries());

    let usuarioNuevo = new Usuario(datos.nombre, datos.apellido, datos.correo, datos.contraseña);
    console.log(usuarioNuevo);
}