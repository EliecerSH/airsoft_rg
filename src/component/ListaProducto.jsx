import React, { useEffect, useState } from "react";
import { obtenerProductosCompletos } from "../service/productosService.jsx";
import ProductoCard from "../component/ProductoCard.jsx";

function ListaProductos({ filas = 1, categoria = "todos" }) {
  const [productos, setProductos] = useState([]);

  const productosPorFila = 3;
  const cantidadMostrar = filas * productosPorFila;

  useEffect(() => {
    obtenerProductosCompletos().then(setProductos);
  }, []);

  // ⬇ Cambiamos tipo → categoria
  const productosFiltrados = productos.filter(
    (p) => categoria === "todos" || p.categoria === categoria
  );

  const productosMostrar = productosFiltrados.slice(0, cantidadMostrar);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-8 border-b-4 border-neutral-700 inline-block pb-2">
        {categoria === "todos" ? "Productos" : categoria}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productosMostrar.map((prod) => (
          <ProductoCard key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
}

export default ListaProductos;




