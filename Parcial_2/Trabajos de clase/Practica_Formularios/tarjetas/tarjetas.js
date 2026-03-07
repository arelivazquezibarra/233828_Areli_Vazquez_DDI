const url = "https://restcountries.com/v3.1/all?fields=name,flags,population";

const contenedor = document.querySelector("#contenedor");

fetch(url)
.then(respuesta => {

    if (!respuesta.ok) {
        throw new Error("Error al obtener los países");
    }

    return respuesta.json();

})
.then(datos => {

    for (let i = 0; i < 20; i++) {

        if (datos[i]) {
            CrearTarjeta(datos[i]);
        }

    }

})
.catch(error => {
    console.error("Error:", error.message);
});


function CrearTarjeta(pais){

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${pais.name.common}</h3>
        <img src="${pais.flags.png}" width="120">
        <p>Población: ${pais.population}</p>
    `;

    contenedor.appendChild(card);
}
function cerrarSesion(){

    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioLogeado");

    window.location.href = "../index.html";

}