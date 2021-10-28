class Destino {
        constructor(nombre,region,pais) {
                this.nombre= nombre;
                this.region= region;
                this.pais = pais;
        }
}

class Vuelo {
        //CONSTRUCTOR DE CLASE PRODUCTO
        constructor(origen,destino,fecha,hora,id,nombre,precio) {
                this.origen = origen;
                this.destino = destino;
                this.fecha = fecha;
                this.hora = hora;
                this.id = id;
                this.nombre = nombre;
                this.precio = precio;
                this.cantidad = 1 * (parseInt(adultos) + parseInt(niños));
        }
        subtotal(){
                return this.cantidad * this.precio;
        }
        calculoIva() {
                return 0.21 * this.precio * this.cantidad;
        }
        //MÉTODO PARA SUMAR IVA
        sumarIva() {
                return 1.21 * this.precio * this.cantidad;
        }
}
