function saveInfo() {
        let storageOrigen= document.getElementById('filtroOrigen');                
        sessionStorage.setItem('origen',storageOrigen.value);
        let storageDestino= document.getElementById('filtroDestino');
        sessionStorage.setItem('destino',storageDestino.value);
        let storageIda= document.getElementById('fechaIda'); 
        sessionStorage.setItem('fechaIda',storageIda.value);
        let storageAdultos= document.getElementById('adultos');
        sessionStorage.setItem('adultos',storageAdultos.value);
        let storageNiños= document.getElementById('niños'); 
        sessionStorage.setItem('niños',storageNiños.value);
        let storageCategoria= document.getElementById('categoria');
        sessionStorage.setItem('categoria',storageCategoria.value);     
}
function results() {
        saveInfo();
        let origen= sessionStorage.getItem('origen');
        let destino= sessionStorage.getItem('destino');
        let fechaIda= sessionStorage.getItem('fechaIda');
        let adultos= sessionStorage.getItem('adultos');
        let niños= sessionStorage.getItem('niños');
        let categoria= sessionStorage.getItem('categoria');

        const filtros= vuelos.filter(vuelo => (vuelo.origen == origen) && (vuelo.destino == destino) && (vuelo.fecha == fechaIda));
        console.log(filtros);
        let pasajeros= parseInt(adultos) + parseInt(niños);

        for (const filtro of filtros) {  
                console.log(pasajeros);
                console.log(filtro.precio);
                let subtotal= parseInt(filtro.precio) * parseInt(pasajeros);
                console.log(subtotal);
                let iva= 0.21 * parseInt(subtotal);
                let total= 1.21 * parseInt(subtotal); 
                let divResultados= document.getElementById('resultados');
                let divVuelos= document.createElement('div');
                divVuelos.innerHTML= `<div class="card border-light bg-black m-2">
                                                <div class="card-body">
                                                        <h3>${filtro.nombre}. Precio: $${filtro.precio}USD.</h3>
                                                        <h4>Origen: ${filtro.origen}. Destino: ${filtro.destino}</h4>
                                                        <h4>Fecha: ${filtro.fecha}. Hora: ${filtro.hora}</h4>
                                                        <h4>Clase: ${categoria}. Cantidad de adultos: ${adultos}. Cantidad de niños: ${niños}.</h4>
                                                        <h4>Subtotal: $${subtotal}.</h4>
                                                        <h4>IVA: $${iva}.
                                                        <h4>Total a pagar: $${total}.</h4>
                                                        <button type='button' id='${filtro.id}' class ='btn btn-outline-light btnCompra'>Comprar</button>
                                                </div>
                                        </div>`;
                divResultados.appendChild(divVuelos);
        }
        $(".btnCompra").click(seleccionar);    
}
function seleccionar(event){
        event.preventDefault();
        idVuelo= event.target.id;
        const seleccion=carrito.find(vuelo => vuelo.id == idVuelo);
        if (seleccion == undefined) {
                const seleccionado = vuelos.find(vuelo => vuelo.id == idVuelo);
                localStorage.setItem('idVuelo',JSON.stringify(seleccionado));
                carrito.push(seleccionado);    
        }   
        carritoUI(carrito);
}
function carritoUI(carrito){
        $("#miSeleccion").html(carrito.length);
        $("#misVuelos").empty();        
        for (const vuelo of carrito) {
                let cantidad= parseInt(adultos.value) + parseInt(niños.value);
                let totalProducto= 1.21 * parseInt(cantidad) * parseInt(vuelo.precio);
                
                $("#misVuelos").append(`<p> ${vuelo.nombre}.$${vuelo.precio}.</p>
                        <span class="badge badge-warning">
                        Pasajeros: ${cantidad}</span>
                        <span class="badge badge-warning">
                        Total: $${totalProducto}USD.</span> 
                        <a id="${vuelo.id}" class="close btn-delete" >x</a>
                        </p>`);
        }
        $('.btn-delete').on('click', eliminarItem);
}
function eliminarItem(event) {
        event.stopPropagation();
        carrito = carrito.filter(vuelo => vuelo.id != event.target.id);
        carritoUI(carrito);
        localStorage.setItem('carrito', JSON.stringify(carrito));
}
function enviarCompra() {
        $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carrito), function(respuesta,estado) {
        });
        let finalizarCompra= document.getElementById('confirmar');
        let divConfirmacion= document.createElement('div');
        divConfirmacion.innerHTML= `<form class="col-xs-10 col-lg-10">
                                <input type="email" id="email" class="form-control form-control-lg m-2" placeholder="Ingrese su e-mail:">
                                <button type="button" id="btnFinalizar" class="btn btn-outline-light btn-lg m-2" data-toggle='modal' data-dismiss="modal" aria-label="Close" data-target="#finDeCompra">ENVIAR</button>
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
                                <button type="button" id="btnClose" class="btn btn-outline-light btn-lg m-2" data-dismiss="modal" aria-label="Close">ACEPTAR</button>`;
        finalizar.appendChild(ok);
        $("#miSeleccion").empty();
        $("#misVuelos").empty();  
}

                        


