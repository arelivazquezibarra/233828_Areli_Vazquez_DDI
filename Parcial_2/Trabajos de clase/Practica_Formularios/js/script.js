const formularioInicio = document.querySelector("#form1");

class UsuarioInicio {
    constructor(correo, contra) {
        this.correo = correo;
        this.contraseña = contra;
    }
}

class UsuarioRegistro {
    constructor(nom, ape, correo, contra, contra2) {
        this.nombre = nom;
        this.apellido = ape;
        this.correo = correo;
        this.contraseña = contra;
        this.contraseña2 = contra2;
    }
}


// LOGIN
function LeerDatosInicio() {

    const datosFormulario = new FormData(formularioInicio);
    const datos = Object.fromEntries(datosFormulario.entries());

    let usuarioNuevo = new UsuarioInicio(datos.correo, datos.contraseña);

    const correo = document.querySelector("#correo");
    const contraseña = document.querySelector("#contraseña");

    if (datos.correo === "" || datos.contraseña === "") {
        alert("Todos los campos son obligatorios");
    }

    if (datos.correo === "") {
        correo.style.border = "2px solid red";
    } else {
        correo.style.border = "1px solid rgb(61,61,77)";
    }

    if (datos.contraseña === "") {
        contraseña.style.border = "2px solid red";
    } else {
        contraseña.style.border = "1px solid rgb(61,61,77)";
    }


    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.correo === datos.correo &&
        usuario.contraseña === datos.contraseña
    );


    if (usuarioEncontrado) {

        localStorage.setItem("sesionActiva", "true");
        localStorage.setItem("usuarioLogeado", usuarioEncontrado.correo);

        window.location.href = "tarjetas/tarjetas.html";

    } else {
        alert("Correo o contraseña incorrectos");
    }

    console.log(usuarioNuevo);

}



// ABRIR REGISTRO
function AbrirRegistro() {

    formularioInicio.innerHTML = "";

    const titulo = document.createElement("h1");
    titulo.textContent = "Registrate";

    const nombre = document.createElement("label");
    nombre.textContent = "Nombre:";

    const inputNombre = document.createElement("input");
    inputNombre.name = "nombre";
    inputNombre.id = "nombre";
    inputNombre.type = "text";

    const apellido = document.createElement("label");
    apellido.textContent = "Apellido:";

    const inputApellido = document.createElement("input");
    inputApellido.name = "apellido";
    inputApellido.id = "apellido";
    inputApellido.type = "text";

    const correo = document.createElement("label");
    correo.textContent = "Correo:";

    const inputCorreo = document.createElement("input");
    inputCorreo.name = "correo";
    inputCorreo.id = "correo";
    inputCorreo.type = "email";

    const contraseña = document.createElement("label");
    contraseña.textContent = "Contraseña:";

    const inputContraseña = document.createElement("input");
    inputContraseña.name = "contraseña";
    inputContraseña.id = "contraseña";
    inputContraseña.type = "password";

    const contraseña2 = document.createElement("label");
    contraseña2.textContent = "Confirmar contraseña:";

    const inputContraseña2 = document.createElement("input");
    inputContraseña2.name = "contraseña2";
    inputContraseña2.id = "contraseña2";
    inputContraseña2.type = "password";


    const botonGuardar = document.createElement("button");
    botonGuardar.textContent = "Guardar";
    botonGuardar.type = "button";
    botonGuardar.addEventListener("click", LeerDatosRegistro);


    formularioInicio.appendChild(titulo);
    formularioInicio.appendChild(nombre);
    formularioInicio.appendChild(inputNombre);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(apellido);
    formularioInicio.appendChild(inputApellido);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(correo);
    formularioInicio.appendChild(inputCorreo);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(contraseña);
    formularioInicio.appendChild(inputContraseña);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(contraseña2);
    formularioInicio.appendChild(inputContraseña2);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(botonGuardar);

}



// LEER REGISTRO
function LeerDatosRegistro() {

    const datosFormulario = new FormData(formularioInicio);
    const datos = Object.fromEntries(datosFormulario.entries());

    let usuarioNuevo = new UsuarioRegistro(
        datos.nombre,
        datos.apellido,
        datos.correo,
        datos.contraseña,
        datos.contraseña2
    );

    const correo = document.querySelector("#correo");
    const contraseña = document.querySelector("#contraseña");
    const contraseña2 = document.querySelector("#contraseña2");
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");


    if (
        datos.nombre === "" ||
        datos.apellido === "" ||
        datos.correo === "" ||
        datos.contraseña === "" ||
        datos.contraseña2 === ""
    ) {
        alert("Todos los campos son obligatorios");
        return;
    }


    if (datos.contraseña !== datos.contraseña2) {

        contraseña.style.border = "2px solid red";
        contraseña2.style.border = "2px solid red";

        alert("Las contraseñas no coinciden");
        return;

    }


    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuarioNuevo);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");

    MostrarInicioSesion();

    console.log(usuarioNuevo);

}



// MOSTRAR LOGIN
function MostrarInicioSesion() {

    formularioInicio.innerHTML = "";

    const titulo = document.createElement("h1");
    titulo.textContent = "Iniciar Sesión";

    const labelCorreo = document.createElement("label");
    labelCorreo.textContent = "Correo";

    const inputCorreo = document.createElement("input");
    inputCorreo.name = "correo";
    inputCorreo.id = "correo";
    inputCorreo.type = "email";

    const labelContra = document.createElement("label");
    labelContra.textContent = "Contraseña";

    const inputContra = document.createElement("input");
    inputContra.name = "contraseña";
    inputContra.id = "contraseña";
    inputContra.type = "password";

    const botonLogin = document.createElement("button");
    botonLogin.textContent = "Entrar";
    botonLogin.type = "button";
    botonLogin.addEventListener("click", LeerDatosInicio);

    const botonRegistro = document.createElement("button");
    botonRegistro.textContent = "Registrarse";
    botonRegistro.type = "button";
    botonRegistro.addEventListener("click", AbrirRegistro);


    formularioInicio.appendChild(titulo);
    formularioInicio.appendChild(labelCorreo);
    formularioInicio.appendChild(inputCorreo);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(labelContra);
    formularioInicio.appendChild(inputContra);
    formularioInicio.appendChild(document.createElement("br"));

    formularioInicio.appendChild(botonLogin);
    formularioInicio.appendChild(botonRegistro);
}



// VERIFICAR SESIÓN
window.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("sesionActiva") === "true") {

        window.location.href = "tarjetas/tarjetas.html";

    }

});



// VER USUARIOS EN CONSOLA
const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
console.log(usuariosGuardados);
 