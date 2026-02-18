const titulo = document.querySelector("#titulo");
const tetsu = document.querySelector("#tetsuya");

window.addEventListener("scroll", ()=>{
    titulo.style.right = window.scrollY * 2 + "px";
    tetsu.style.left = window.scrollY *2 + "px";

})