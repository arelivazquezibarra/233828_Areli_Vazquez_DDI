
window.onload = function(){

    const usuario = JSON.parse(localStorage.getItem("sesion"));

    if(!usuario){
        window.location.href = "../../index.html";
        return;
    }

    document.querySelector("#imgPerfil").src = usuario.foto;
    document.querySelector("#nombreUsuario").textContent = usuario.nombre;

    mostrarDatos();
};

function mostrarDatos(){

    const datos = JSON.parse(localStorage.getItem("datosJSON")) || [];

    const contenedor = document.querySelector("#contenido");

    contenedor.innerHTML = "";

    datos.forEach(item => {
        contenedor.innerHTML += `
            <div class="card">
                <img src="${item.foto}">
                <h2>${item.nombre}</h2>
                <p>${item.equipo}</p>
                <p>${item.descripcion}</p>
            </div>
        `;
    });
}

function cerrarSesion(){
    localStorage.removeItem("sesion");
    window.location.href = "../../index.html";
}

function editarPerfil(){
    let usuario = JSON.parse(localStorage.getItem("sesion"));

    let nuevoNombre = prompt("Nuevo nombre:", usuario.nombre);

    if(nuevoNombre){
        usuario.nombre = nuevoNombre;
        localStorage.setItem("sesion", JSON.stringify(usuario));
        location.reload();
    }
}
function cambiarFoto(){

    const archivo = document.querySelector("#nuevaFoto").files[0];

    if(!archivo){
        alert("Selecciona una imagen");
        return;
    }

    const lector = new FileReader();

    lector.onload = function(e){

        const nuevaFoto = e.target.result;

        // Obtener sesión actual
        let usuario = JSON.parse(localStorage.getItem("sesion"));

        // Actualizar foto
        usuario.foto = nuevaFoto;

        // Guardar sesión actualizada
        localStorage.setItem("sesion", JSON.stringify(usuario));

        // Actualizar en lista de usuarios
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));

        let index = usuarios.findIndex(u => u.correo === usuario.correo);

        usuarios[index].foto = nuevaFoto;

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Foto actualizada");

        location.reload();
    }

    lector.readAsDataURL(archivo);
}