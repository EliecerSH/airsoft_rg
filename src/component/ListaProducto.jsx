import React, { useContext } from "react";
import { productos } from "../Productos.js";
import { CarritoContext } from "../context/CarritoContext";

function ListaProductos({ filas = 1, tipo = "todos" }) {
  const { agregarCarrito } = useContext(CarritoContext);

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

      <div className="grid gap-6 grid-cols-3">
        {productosMostrar.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
          >
            <img src={prod.img} alt={prod.nombre} className="p-5 cursor-pointer" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{prod.nombre}</h3>
              <p className="text-sm text-gray-600 mt-1 h-16">{prod.desc}</p>
              <p className="mt-5 text-center text-xl font-mono font-bold text-neutral-700">
                ${prod.precio} CLP
              </p>
              <button
                onClick={() => agregarCarrito(prod)}
                className="mt-4 w-full bg-neutral-700 hover:bg-neutral-900 text-white py-2 rounded-lg transition"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProductos;


