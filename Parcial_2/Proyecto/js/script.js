const formularioInicio = document.querySelector("#InicioSesion");
class UsuarioInicio{
    constructor(correo, contra){
        this.correo = correo;
        this.contraseña = contra;
    }
}

//inicia la sesion 
function LeerDatos(){
    const datosFormulario = new FormData(formularioInicio);
    const datos = Object.fromEntries(datosFormulario.entries());

    if(datos.correo === "" || datos.contraseña === ""){
        alert("Todos los campos son obligatorios");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.correo === datos.correo &&
        usuario.contraseña === datos.contraseña
    );
    if(usuarioEncontrado){
        localStorage.setItem("sesion", JSON.stringify(usuarioEncontrado));
        if(usuarioEncontrado.tipo === "admin"){
            window.location.href = "paginas/administrador/admin.html";
        } else {
            window.location.href = "paginas/visitante/visitante.html";
        }
    } else {
        alert("Correo o contraseña incorrectos");
    }
    console.log(usuarioEncontrado);
}
function EntrarRegistro(){
    window.location.href = "paginas/registro/registro.html"
}