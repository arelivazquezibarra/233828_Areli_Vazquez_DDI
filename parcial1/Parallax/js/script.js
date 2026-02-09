//document.addEventListener()
const titulo = document.querySelector("#titulo");
const team = document.querySelector("#team");
const tetsu = document.querySelector("#tetsu");

window.addEventListener("scroll", ()=>{
    //console.log(window.scrolly);
    titulo.style.right = window.scrollY * 2 + "px";
    team.style.bottom = window.scrollY *2 + "px";
    tetsu.style.left = window.scrollY *2 + "px";

})