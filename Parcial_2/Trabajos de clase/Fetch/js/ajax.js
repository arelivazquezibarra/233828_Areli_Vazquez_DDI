const url = "https://pokeapi.co/api/v2/pokemon";
//crear el objeto XMLHttpRequest
//es el objeto principal que se encarga 
// de hacer las peticiones de forma asincrona

const xhr = new XMLHttpRequest();

//configuramos que tipo de peticiones que vamos a hacer
//parametro 1 es el tipo de peticion
//parametro 2 es la url a donde se hara la apeticion
//parametro 3 es si sera asincrono
xhr.open('GET', url, true);

//establecemos la cabecera content-type para indicar que esperamos un json
xhr.setRequestHeader('Content-type', 'application/json');

//es definir la funcion que ejecutara cuando el estado de la peticion cambie
xhr.onreadystatechange = ()=>{
    //verificamos el estado de la peticion
    //0 = unset, 1 = opened, 2 = header_recived, 
    // 3 = loading, 4 = done.
    //verificamos que el staus cambie a 4 y se complete
    if(xhr.readyState === 4){

        //verificamos si la respuesta fue exitosa (codigos 200 a 299)
        if(xhr.status >= 200 && xhr.status < 300){

            //hacemos una conversion de la respuesta a formato JSON poderlo 
            // convertir a un objeto de JavaScript que podamos usar
            const respuesta = JSON.parse(xhr.responseText);

            console.log(respuesta);
        }
        else{
            //manejamos el error lo mostramos en consola 
            // en caso que el estaus de la respuesta no sea 200
            console.error('Error HTTP: ', xhr.status, xhr.statusText);
        }
    }
}

//definimos el manejo de errores en caso como conexion fallida,
//tiempo exedido de la peticion, etc.
xhr.onerror = ()=>{

}

//definimos el metodo para manejar el tiempo de espera de la petcion
xhr.ontimeout = ()=>{

}

//definimos el tiempo de espera maximo de l apeticion si la peticion tarda mas
xhr.timeout = 2000;

//enviamos la peticion como es get enviamos null,
//si fuera post o null enviaremos el cuerpo de la peticion 
xhr.send(null);

//elegir una api en internet y hacer una peticion fetch a 
// esa api y se muestre una vez que el usuario haya iniciado sesion, 
// podemos hacer otra pagina para eso

/*Integrar al formulario de Inicion de seion y registro:
    -Una peticion usando Fetch a cualquier api que elijan
        (no la pokeapi).
    -Que la informacion de la peticon se muestre una vez 
        el usuario haya iniciado sesion.
*/
