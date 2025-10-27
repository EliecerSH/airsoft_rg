import React from "react";
import Carrito from "../component/Carrito";
import ListaProductos from "../component/ListaProducto";
function CarritoPage() {
    
  return (
    <div className="p-6">
      <Carrito></Carrito>
      <ListaProductos filas={1} tipo="rifle" />
    </div>
  );
}

export default CarritoPage;