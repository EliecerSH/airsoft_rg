import React, { useState, useContext } from "react";
import { productos } from "../Productos.js";
import { CarritoContext } from "../context/CarritoContext";

function Productos() {
  const [search, setSearch] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroPrecio, setFiltroPrecio] = useState("todos");
  const { agregarCarrito } = useContext(CarritoContext);

  const tipos = ["todos", ...new Set(productos.map((p) => p.tipo))];
  const precios = [
    { label: "Todos", value: "todos" },
    { label: "< $80.000", value: "menor80" },
    { label: "$80.000 - $150.000", value: "entre80y150" },
    { label: "> $150.000", value: "mayor150" },
  ];

  const productosFiltrados = productos.filter((prod) => {
    const coincideBusqueda = prod.nombre
      .toLowerCase()
      .includes(search.toLowerCase());
    const coincideTipo = filtroTipo === "todos" || prod.tipo === filtroTipo;
    let coincidePrecio = true;
    if (filtroPrecio === "menor80") coincidePrecio = prod.precio < 80000;
    if (filtroPrecio === "entre80y150")
      coincidePrecio = prod.precio >= 80000 && prod.precio <= 150000;
    if (filtroPrecio === "mayor150") coincidePrecio = prod.precio > 150000;
    return coincideBusqueda && coincideTipo && coincidePrecio;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        <div className="flex gap-2 flex-wrap">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 bg-white cursor-pointer"
          >
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filtroPrecio}
            onChange={(e) => setFiltroPrecio(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 bg-white cursor-pointer"
          >
            {precios.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productosFiltrados.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
          >
            <img
              src={prod.img}
              alt={prod.nombre}
              className="p-5 cursor-pointer"
            />
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

export default Productos;



