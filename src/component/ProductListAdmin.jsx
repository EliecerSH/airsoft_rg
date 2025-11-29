import React, { useState } from "react";

export default function ProductListAdmin({ productos, onEditar, onEliminar }) {
  const [busqueda, setBusqueda] = useState("");

  if (!productos) return null;

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="w-full px-4 md:px-8 py-6">
      
      {/* 🔍 Barra de búsqueda */}
      <div className="mb-6 flex justify-center md:justify-end ">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="
            border border-gray-700 bg-neutral-200 text-black 
            rounded-xl px-4 py-2 w-full sm:w-72 
            shadow-md focus:outline-none focus:ring-2 
            focus:ring-green-600 transition
          "
        />
      </div>

      {productosFiltrados.length === 0 ? (
        
        <p className="text-center text-gray-400 text-lg">
          No se encontraron productos.
        </p>

      ) : (

        <div className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">
          {productosFiltrados.map((p) => (
            <div
              key={p.id}
              className="
                bg-gray-900 border border-gray-800 
                p-5 rounded-2xl shadow-lg
                hover:shadow-2xl hover:border-gray-700
                hover:-translate-y-1 transition transform
              "
            >
              {/* Nombre */}
              <h2 className="text-xl font-bold text-white mb-1">
                {p.nombre}
              </h2>

              {/* Categoría */}
              <p className="text-gray-400 mb-2 text-sm">
                Categoría:{" "}
                <span className="font-semibold text-gray-200">
                  {p.id_categoria}
                </span>
              </p>

              {/* Precio */}
              <div className="text-2xl font-bold text-green-400 mb-3">
                ${p.precio.toLocaleString()}
              </div>

              {/* Stock */}
              <p className="text-gray-300 mb-4">
                Stock:{" "}
                <span className="font-semibold">{p.stock}</span>
              </p>

              {/* Botones */}
              <div className="flex gap-3">
                <button
                  onClick={() => onEditar(p)}
                  className="
                    flex-1 px-3 py-2 rounded-xl 
                    bg-neutral-700 text-white font-semibold
                    hover:bg-green-600 transition
                  "
                >
                  Editar
                </button>

                <button
                  onClick={() => onEliminar(p.id)}
                  className="
                    flex-1 px-3 py-2 rounded-xl 
                    bg-neutral-700 text-white font-semibold
                    hover:bg-red-500 transition
                  "
                >
                  Eliminar
                </button>
              </div>

            </div>
          ))}
        </div>

      )}
    </section>
  );
}




