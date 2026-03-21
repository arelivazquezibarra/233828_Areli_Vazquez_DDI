
const formularioRegistro = document.querySelector("#Registro");

// PREVIEW DE IMAGEN
document.querySelector("#fotoPerfil").addEventListener("change", function(){
    const archivo = this.files[0];

    if(archivo){
        const lector = new FileReader();
        lector.onload = function(e){
            document.querySelector("#preview").src = e.target.result;
        }
        lector.readAsDataURL(archivo);
    }
});

// REGISTRO
function Datos(tipoUsuario){

    const datosRegistro = new FormData(formularioRegistro);
    const datos = Object.fromEntries(datosRegistro.entries());

    // VALIDACIONES
    if(!datos.nombre || !datos.apellido || !datos.correo || !datos.contraseña || !datos.verificaContraseña){
        alert("Todos los campos son obligatorios");
        return;
    }

    if(datos.contraseña !== datos.verificaContraseña){
        alert("Las contraseñas no coinciden");
        return;
    }

    const archivo = document.querySelector("#fotoPerfil").files[0];

    if(!archivo){
        alert("Seleccione una foto");
        return;
    }

    const lector = new FileReader();

    lector.onload = function(e){

        const fotoBase64 = e.target.result;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const nuevoUsuario = {
            ...datos,
            tipo: tipoUsuario,
            foto: fotoBase64
        };

        usuarios.push(nuevoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Registrado correctamente");

        window.location.href = "../../index.html";
    }

    lector.readAsDataURL(archivo);
}