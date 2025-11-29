import React, { useEffect, useState } from "react";
import { obtenerProductosCompletos } from "../service/productosService";
import ProductoCard from "../component/ProductoCard";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroPrecio, setFiltroPrecio] = useState("todos");

  useEffect(() => {
    obtenerProductosCompletos().then(setProductos);
  }, []);

  // Crear lista de categorías únicas, filtrando undefined o null
  const categorias = [
    "todos",
    ...Array.from(
      new Set(productos.map((p) => p.categoriaNombre).filter(Boolean))
    ),
  ];

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

    const coincideCategoria =
      filtroCategoria === "todos" || prod.categoriaNombre === filtroCategoria;

    let coincidePrecio = true;
    if (filtroPrecio === "menor80") coincidePrecio = prod.precio < 80000;
    if (filtroPrecio === "entre80y150")
      coincidePrecio = prod.precio >= 80000 && prod.precio <= 150000;
    if (filtroPrecio === "mayor150") coincidePrecio = prod.precio > 150000;

    return coincideBusqueda && coincideCategoria && coincidePrecio;
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
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 bg-white cursor-pointer"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : ""}
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
          <ProductoCard key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
}

export default Productos;






