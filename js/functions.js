function saveInfo() {
        let storageOrigen= document.getElementById('filtroOrigen'); 
        sessionStorage.setItem('origen',storageOrigen.value);
        let storageDestino= document.getElementById('filtroDestino');
        sessionStorage.setItem('destino',storageDestino.value);
        let storageIda= document.getElementById('fechaIda'); 
        sessionStorage.setItem('fechaIda',storageIda.value);
        let storageRegreso= document.getElementById('fechaRegreso');
        sessionStorage.setItem('fechaRegreso',storageRegreso.value);
         let storageAdultos= document.getElementById('adultos');
        sessionStorage.setItem('adultos',storageAdultos.value);
        let storageNiños= document.getElementById('niños'); 
        sessionStorage.setItem('niños',storageNiños.value);
        let storageCategoria= document.getElementById('categoria');
        sessionStorage.setItem('categoria',storageCategoria.value);
}
function results() {
        const filtros= vuelos.filter(vuelo => (vuelo.origen == origen) && (vuelo.destino == destino));
        console.log(filtros);
        for (const filtro of filtros) {
                let divResultados= document.getElementById('resultados');
                let divVuelos= document.createElement('div');
                divVuelos.innerHTML= `<div class="card border-light bg-black m-2">
                                                <div class="card-body">
                                                        <h5>ID: ${filtro.id}. Destino: ${filtro.destino}</h5>
                                                        <h4>Fecha: ${filtro.fecha}.<h4>
                                                        <h4>${filtro.nombre}</h4>
                                                        <h4>$${filtro.precio}USD.</h4>
                                                        <button type='button' id='${filtro.id}' class ='btn btn-outline-light btnCompra' data-toggle='modal' data-target='#seleccion' aria-label="Close">Comprar</button>
                                                </div>
                                        </div>`;
                divResultados.appendChild(divVuelos);
        }
        let buttons= document.getElementsByClassName('btnCompra');
        console.log(buttons);
        for (const button of buttons) {
                button.addEventListener('click',seleccionados);
        }
}
function seleccionados() {
        let seleccion= vuelos.find(vuelo => vuelo.id == this.id);
        console.log(`Has seleccionado el vuelo ${seleccion.nombre}`);
        let select= document.getElementById('seleccionado');
        let divSeleccion= document.createElement('div');
        divSeleccion.innerHTML= `<h5>Has seleccionado el vuelo ${seleccion.nombre} en la categoria ${categoria}.</h5>
                                        <h5>Detalle del vuelo:</h5>
                                        <p>Fecha: ${seleccion.fecha}. Hora: ${seleccion.hora}</p>
                                        <p>Origen: ${seleccion.origen}. Destino: ${seleccion.destino}</p>
                                        <p>Clase: ${categoria}. Precio: $${seleccion.precio}USD.</p>
                                        <p>Cantidad de adultos: ${adultos}. Cantidad de niños: ${niños}.</p>
                                        <p>Subtotal: $${seleccion.subtotal()}.</p>
                                        <p>IVA: $${seleccion.calculoIva()}.
                                        <p>Total a pagar: $${seleccion.sumarIva()}.</p>
                                        <h5>¿Desea continuar?</h5>
                                        <buttton type='button' id='${seleccion.id}' class ='btn btn-outline-light btn-seleccion' data-dismiss='modal' aria-label="Close">Comprar</button>`;
        select.appendChild(divSeleccion);
         $(".btn-seleccion").click(seleccionar);
}
function seleccionar(event){
        $("#seleccionado").empty();
        event.preventDefault();
                idVuelo= event.target.id;
                const existente=carrito.find(vuelo => vuelo.id == idVuelo);
                if (existente == undefined) {
                        const seleccionado = vuelos.find(vuelo => vuelo.id == idVuelo);
                        localStorage.setItem('idVuelo',JSON.stringify(seleccionado));
                        carrito.push(seleccionado);    
                }else{
                        existente.agregarCantidad(1);
                }   
                carritoUI(carrito);
}
function carritoUI(carrito){
        $("#miSeleccion").html(carrito.length);
        for (const vuelo of carrito) {
                $("#misVuelos").prepend(`<p> ${vuelo.nombre} 
                        <span class="badge badge-warning">
                        $${vuelo.precio}</span>
                        <span class="badge badge-warning">
                        Cantidad: ${vuelo.cantidad}</span>
                        <span class="badge badge-warning">
                        Total: ${vuelo.sumarIva()}</span>
                        </p>`);
        break;
        }
}
function enviarCompra() {
        $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carrito), function(respuesta,estado) {
        });
        let finalizarCompra= document.getElementById('confirmar');
        let divConfirmacion= document.createElement('div');
        divConfirmacion.innerHTML= `<form class="col-xs-10 col-lg-10">
                                <input type="email" id="email" class="form-control form-control-lg m-2" placeholder="Ingrese su e-mail:">
                                <button type="button" id="btnFinalizar" class="btn btn-outline-light btn-lg m-2" aria-label="Close" data-toggle="modal" data-target="#finDeCompra">ENVIAR</button>
                        </form>`;
        finalizarCompra.appendChild(divConfirmacion);
         $("#btnFinalizar").on("click", enviarEmail);
}
function enviarEmail() {
        let storageEmail= document.getElementById('email'); 
        sessionStorage.setItem('email',storageEmail.value);
        $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(storageEmail), function(respuesta,estado) {
        });
        let finalizar= document.getElementById('finalizar');
        let ok= document.createElement('div');
        ok.innerHTML= `<h5>Su compra se ha enviado correctamente.</h5> 
                                <p>Recibirá en su casilla de correo el enlace para finalizar la operación.</p>
                                <p>Muchas Gracias.</p>
                                <button type="button" class="btn btn-outline-light btn-lg m-2" data-toggle='modal' aria-label="Close">ACEPTAR</button>`;
        finalizar.appendChild(ok);
}

                        


