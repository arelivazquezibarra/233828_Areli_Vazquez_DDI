//url donde se hara la peticion
const url = "https://pokeapi.co/api/v2/pokemon";
const contenedor = document.querySelector("#contenedor")

//peticion fetch
fetch(url).then(
    //primer respuesta de la peticion
    respuesta => {
        if(respuesta.ok)
            return respuesta.json();
    }
).then(
    //desenvolviendo los datos obtenidos de la peticion
    datos => {
        //hacer otra peticion
        for(let i = 0; i < datos.results.length; i++){
           console.log(datos.results[i].url);
           fetch(datos.results[i].url).then(respuesta => {
            if(respuesta.ok)
                return respuesta.json();
           }).then(
                datos_pokemon=>{
                    console.log(datos_pokemon);
                    CrearTarjeta(datos_pokemon);

                    
                }
           ) 
        }
    }
).catch(error => {
        console.error(error.menssage);
    })
function CrearTarjeta(datos_pokemon) {
    const card = document.createElement("div");
 
    card.innerHTML = `
        <h3>${datos_pokemon.name}</h3>
        <img src="${datos_pokemon.sprites.front_default}" alt="${datos_pokemon.name}">
        <h4>${datos_pokemon.base_experience}</h4>
        <h4>${datos_pokemon.id}</h4>
       
    `;
    contenedor.appendChild(card);
}