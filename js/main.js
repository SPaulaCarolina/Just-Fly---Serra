const destinos = [];
const carrito = [];
const vuelos = [];

let storedName= sessionStorage.getItem('name');
let bienvenida=document.getElementById('welcome');
        bienvenida.innerHTML= `Bienvenido/a ${storedName}`;

$.get("../data/destinos.json", function (datos,estado) {
        if (estado == "success") {
                console.dir(datos);
                console.log(estado);
                for (const dato of datos) {
                        destinos.push(new Destino(dato.nombre, dato.region, dato.pais));
                }
        }
        for (const destino of destinos) {
                        $(".list").append(`<option>${destino.nombre}</option>`);
        }
});

let btnResults= document.getElementById("btnResults");
btnResults.onsubmit = (event) => {
        event.preventDefault(); 
        event.target;
}

let origen= sessionStorage.getItem('origen');
let destino= sessionStorage.getItem('destino');
let fechaIda= sessionStorage.getItem('fechaIda');
let fechaRegreso= sessionStorage.getItem('fechaRegreso');
let adultos= sessionStorage.getItem('adultos');
let niños= sessionStorage.getItem('niños');
let categoria= sessionStorage.getItem('categoria');

$.get("../data/vuelos.json", function (datos,estado) {
        if (estado == "success") {
                console.dir(datos);
                console.log(estado);
                for (const vuelo of datos) {
                        vuelos.push(new Vuelo(vuelo.origen,vuelo.destino,vuelo.fecha,vuelo.hora,vuelo.id,vuelo.nombre,vuelo.precio));
                }
        } else {
                console.log("Los datos no se cargaron correctamente");
        }
});

$("#misVuelos").append(`<button id="btnConfirmar" class ='btn btn-outline-light' data-toggle='modal' data-target='#confirmacionCompra'>Confirmar compra</button>`);
$("#btnConfirmar").on("click", enviarCompra);









