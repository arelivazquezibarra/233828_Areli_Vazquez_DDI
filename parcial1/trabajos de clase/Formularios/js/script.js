const nombre = document.querySelector("#input_txt_nombre");
const apellido = document.querySelector("#apellido");
const boton_guardar = document.querySelector("#boton_guardar");
const Usuarios = [
    {
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
    },
    {

    },
    {

    },
    {

    },
];

boton_guardar.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log(e.target.value);
    //crea un nuevo objeto usuario
    const usuario = new Usuario(nombre.value, apellido.value);
    console.log(usuario);
    
    const nombre_info = document.createElement("h2"); //metodo de el objeto que se encarga de crear elementos
    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);

    //guardarDatos(usuario);

    usuario.MostrarDatos = guardarDatos(usuario);
    usuario.MostrarDatos();

    guardarDatos = ()=>{
        console.log("modificando funcion")
    };
    guardarDatos();

})
function cambiarNumemro(event){
    console.log(event.target.value);
    const numeroElementos = event.target.value;
    const contenido = document.querySelector("#contenedor_correos");
    contenido.innerHTML = " "; //limpia la etiqueta y su contenido antes de agregar
    for(let i = 1; i <= event.target.value; i++){
        //se agrega contenido usando la insercion de html por medio del inner HTML, que agregara todo lo que esta dentro del htmlAgregar
        //este metodo reemplaza todo lo que esta dentro de la etiqueta por lo nuevo que se quiera agregar
        const htmlAgregar = `<label for="correo-${i}">ingresa el correo ${i}</label>
                <input type="email" name="correo-${i}" id="correo-${i}">
                <br>`        
    }
    contenido.innerHTML += htmlAgregar;
    
}

class Usuario{
    constructor(nom, ape){
        this.nombre = nom;
        this.apellido = ape;
    }
    MostrarDatos(){
        console.log(`Nombre: ${this.nombre}\n Apellido: ${this.apellido}`);
    }
}
let usuario2 = {
    Nombre: "Areli",
    Apellido: "Vazquez",
    Edad: 21,
    MostrarDatos: ()=>{
        console.log(`Nombre: ${usuario2.nombre} \nApellido: ${usuario2.apelliod} \nEdad: ${usuario2.Edad}`)
    }
}
//nos permite guardar funciones dentro de una variable o 
let guardarDatos = ()=>{
    //llamamos un metodo definido en una clase
    usuario.MostrarDatos();
    usuario2.MostrarDatos();
    usuario2.Nombre = "nuevo nombre";
    usuario2.MostrarDatos(); 
}