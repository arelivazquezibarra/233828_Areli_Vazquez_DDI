const promesa = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout(function () {
        if(exito){
             resolve("la tarea finalizo")
             return("la tarea se logro")
        }
        else {
             reject("la tarea fallo")
        }
    }, 10000)
});

async function funcionPrincipal() {
  const resultado = await promesa.then((resultado) => {
    console.log(resultado)
}).catch((error) => {
    console.log(error);
});
console.log("se puede pasar a la siguiente tarea");  
}


/*let peticionFetch = new Promise((resolve, reject) => {
    const url = "https://pokeapi.co/api/v2/pokemon";
    fetch(url).then(resultado =>{
        if(resultado.ok)
            return resultado.json()
    }).then(datos => {
        console.log(datos);
    }).catch(error => {
        reject(error);
    })
});

peticionFetch.then(resultadoPeticion => {
    console.log(resultadoPeticion);
}).catch(error=>{
    console.log(error);
})*/

//hacer una promesa para mostrar una pantalla de carga
/*const cargando = document.querySelector("#cargando");
const promesa = new Promise((resolve, reject) => {
    let exito = true;
    setTimeout(function () {
        if(exito){
            resolve("la tarea finalizo")
        }
        else {
            reject("la tarea fallo")
        }
    }, 3000);
});

promesa.then((resultado) => {
    cargando.style.display = "none";
    console.log(resultado)
}).catch((error) => {
    console.log(error);
})*/