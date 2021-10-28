vuelos.push(new Vuelo('mendoza', 1, 'AR0001 Aerolineas Argentinas 01 Oct 06:20 am.', 500, 50));
vuelos.push(new Vuelo('mendoza', 2, 'JS0001 JetSMART 01 Oct 07:45 am.', 300, 20));
vuelos.push(new Vuelo('mendoza', 3, 'AR0002 Aerolineas Argentinas 01 Oct 20:15 pm.', 450, 10));
vuelos.push(new Vuelo('cordoba', 4, 'JS0002 JetSMART 01 Oct 08:20 am.', 700, 5));
vuelos.push(new Vuelo('cordoba', 5, 'AR0003 Aerolineas Argentinas 01 Oct 21:10 pm.',350,20));
vuelos.push(new Vuelo('santa cruz', 6, 'AR0004 Aerolineas Argentinas 01 Oct 07:30 am.', 800, 8));
vuelos.push(new Vuelo('santa cruz', 7, 'FLY0001 FlyBondi 01 Oct 15:00 pm.', 600, 40));
vuelos.push(new Vuelo('salta', 8, 'FLY0002 FlyBondi 01 Oct 19:30 pm.', 850, 1));
vuelos.push(new Vuelo('salta', 9, 'JS0003 JetSMART 01 Oct 04:50 am.', 900, 2));
vuelos.push(new Vuelo('cordoba',10,'AUS0001 Austral 01 Oct 23:50 pm.',420,10));
vuelos.push(new Vuelo('jujuy', 11, 'JS0004 JetSMART 01 Oct 07:45 am.', 300, 20));
vuelos.push(new Vuelo('misiones', 12, 'AR0005 Aerolineas Argentinas 01 Oct 20:15 pm.', 450, 10));
vuelos.push(new Vuelo('rio negro', 13, 'JS0005 JetSMART 01 Oct 08:20 am.', 700, 5));
vuelos.push(new Vuelo('chubut', 14, 'AR0006 Aerolineas Argentinas 01 Oct 21:10 pm.',350,20));
vuelos.push(new Vuelo('tucuman', 15, 'AR0007 Aerolineas Argentinas 01 Oct 07:30 am.', 800, 8));
vuelos.push(new Vuelo('san luis', 16, 'FLY0003 FlyBondi 01 Oct 15:00 pm.', 600, 40));
vuelos.push(new Vuelo('jujuy', 17, 'FLY0004 FlyBondi 01 Oct 19:30 pm.', 850, 1));
vuelos.push(new Vuelo('entre rios', 18, 'JS0006 JetSMART 01 Oct 04:50 am.', 900, 2));
vuelos.push(new Vuelo('neuquen',19,'AUS0002 Austral 01 Oct 23:50 pm.',420,10));

let origen= sessionStorage.getItem('origen');
let destino= sessionStorage.getItem('destino');

let btnResults= document.getElementById('btnResults');
btnResults.addEventListener('click',resultados);

let divResultados= document.getElementById('resultados');
const filtros = vuelos.filter(vuelo => vuelo.destino == destino);

function resultados() {
        const mostrarResultado = (filtros) => {
                return filtros.test(filtro);
        }
        for (const filtro of filtros) {
                let divVuelos= document.createElement('div')
                divVuelos.innerHTML= `<div class="card border-light bg-black m-2">
                        <div class="card-body">
                                <h5>ID: ${filtro.id}. Destino: ${filtro.destino}</h5>
                                <h4>${filtro.nombre}</h4>
                                <h4>$${filtro.precio}USD.</h4>
                                <button type='button' id='${filtro.id}' class ='btn btn-outline-light btnCompra' data-toggle='modal' data-target='#seleccion'>Comprar</button>
                        </div>
                </div>`;
                divResultados.appendChild(divVuelos);
        }
        let select= document.getElementById('seleccionado');
        let buttons= document.getElementsByClassName('btnCompra');
        console.log(buttons);
        for (const button of buttons) {
                button.addEventListener('click',seleccionados);
                function seleccionados() {
                        let seleccion= filtros.find(filtro => filtro.id == this.id);
                        console.log(`Has seleccionado el vuelo ${seleccion.nombre}`);
                        let divSeleccion= document.createElement('div');
                        divSeleccion.innerHTML= `<h5>Has seleccionado el vuelo ${seleccion.nombre}</h5>
                                                <h5>¿Es correcto?</h5>
                                                <button type='button' id='${seleccion.id}' class ='btn btn-outline-light btn-seleccion' data-toggle='modal' data-target='#seleccion'>Comprar</button>`;
                        select.appendChild(divSeleccion);
                }
        }
} 
$(document).ready(function () {
                    $(".btn-seleccion").click(seleccionar);
});
function seleccionar(e) {
        e.preventDefault();
        const idVuelo = e.target.id;
        const existe = carrito.find(vuelo => vuelo.id == idVuelo);
        if (existe == undefined) {
                const seleccionado = vuelos.find(vuelo => vuelo.id == idVuelo);
                carrito.push(seleccionado);    
        }else{
                existe.agregarCantidad(1);
        }
        carritoUI(carrito);
}
function carritoUI(vuelos){
        $('#miSeleccion').html(vuelos.length);
        $('#misVuelos').empty();
        for (const vuelo of carrito) {
                $('#misVuelos').append(`<p> ${vuelo.nombre} 
                                <span class="badge badge-warning">
                                $ ${vuelo.precio}</span>
                                <span class="badge badge-warning">
                                Cantidad: ${vuelo.cantidad}</span>
                                <span class="badge badge-warning">
                                Subtotal: ${vuelo.subtotal()}</span>
                                </p>`);
        }
}
