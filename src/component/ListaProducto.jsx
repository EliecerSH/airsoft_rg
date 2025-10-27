import React from "react";
import { productos } from "../data/Productos.js";
import ProductoCard from "../component/ProductoCard.jsx";

function ListaProductos({ filas = 1, tipo = "todos" }) {
  const productosPorFila = 3;
  const cantidadMostrar = filas * productosPorFila;

  const productosFiltrados = productos.filter(
    (p) => tipo === "todos" || p.tipo === tipo
  );

  const productosMostrar = productosFiltrados.slice(0, cantidadMostrar);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-8 border-b-4 border-neutral-700 inline-block pb-2">
        {tipo === "todos" ? "Productos" : tipo}
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


