/*function ingresarTexto(evento){
    console.log(evento);
}*/
const nombre = document.querySelector("#input_txt_nombre");
const apellido = document.querySelector("#apellido");
const boton_guardar = document.querySelector("#boton_guardar");
/*function ingresarTexto(e){
    console.log(e);
}*/
boton_guardar.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log(e.target.value);
    //crea un nuevo objeto usuario
    const usuario = new Usuario(nombre.value, apellido.value);
    console.log(usuario);
    
    const nombre_info = document.createElement("h2"); //metodo de el objeto que se encarga de crear elementos
    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);
})
/*nombre.addEventListener("change",(e)=>{
    console.log(e.target.value);
    const usuario = new Usuario(e.target.value);
    console.log(usuario);
})*/
class Usuario{
    constructor(nom, ape){
        this.nombre = nom;
        this.apellido = ape;
    }
}