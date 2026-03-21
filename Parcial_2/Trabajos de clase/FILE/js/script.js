/*function LeerArchivo(event){
    const archivo = event.target.files[0];
    if (archivo){
        if(archivo.type === "image/jpg" || archivo.type === "image/png"){

            const lectorArchivo = new FileReader();

            lectorArchivo.onload = function (elemento){
                const contenido = elemento.target.result;
                const imagen = document.querySelector("#imagen-seleccionada");
                imagen.src = url_imagen
            }

            lectorArchivo.readAsDataURL(archivo);
        }
        else{
            console.log("el tipo del archivo es invalido");
        }
         
    }
    else{
        console.log("no se leyo el archivo");
    }   
}*/

document.querySelector("#input-imagen").addEventListener('change' ,(event)=>{
    const url = leerArchivo(event.target.files[0]);
    url.then((dato)=>{
        const imagen = document.querySelector("#imagen-seleccionada");
        imagen.scr = dato;
    }).catch(
        ()=>{
            console.log("algo salio mal");
        }
    )
})

function leerArchivo(archivo){
    return new Promise((resolve, reject) => {
        if(archivo){
            if(archivo.type === "image/jpg" || archivo.type === "image/png" ||
                archivo.type === "image/webp") {
                const lectorArchivo = new FileReader();

                lectorArchivo.onload = function (elemento){

                    const contenido = elemento.target.result;
                    resolve(url_imagen);
                }

                lectorArchivo.readAsDataURL(archivo);
            }
            else{
                reject();
            } 
        }  
        else{
            reject();
        }
    });
}    
