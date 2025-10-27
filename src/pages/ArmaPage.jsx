import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { productos } from "../data/Productos.js";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import ListaProductos from "../component/ListaProducto.jsx";

// Barra de estadísticas mejorada con gradiente suave
function StatBar({ label, value, max = 100 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm font-semibold text-gray-700">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mt-1 overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, #06b6d4 0%, #4ade80 50%, #84cc16 100%)",
          }}
        />
      </div>
    </div>
  );
}

export function ArmaPage() {
  const { id } = useParams();
  const producto = productos.find((p) => String(p.id) === String(id));
  const { agregarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  if (!producto) {
    return (
      <div className="p-6">
        <Link to="/" className="text-blue-600 underline">
          &larr; Volver
        </Link>
        <div className="mt-4 text-red-600 font-bold">Producto no encontrado.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Botón volver */}
      <Link
        to="/"
        className="inline-block mb-6 text-neutral-700 hover:text-neutral-900 font-medium"
      >
        &larr; Volver al catálogo
      </Link>

      {/* Sección principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Imagen + precio + botón compra */}
        <div className="col-span-1 bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center">
          <img
            src={producto.img}
            alt={producto.nombre}
            className="w-full h-80 object-contain mb-6 drop-shadow-md"
          />
          <div className="text-3xl font-bold text-neutral-800 mb-2">
            ${producto.precio.toLocaleString()} CLP
          </div>
          <button
            onClick={() => {agregarCarrito(producto); 
                            navigate("/pago")}
            }
            className="w-full mt-1.5 bg-neutral-800 hover:bg-neutral-900 text-white py-2.5 rounded-lg text-lg font-medium transition"
          >
            Comprar
          </button>
          <button
            onClick={() => agregarCarrito(producto)}
            className="w-full mt-1.5 bg-neutral-800 hover:bg-neutral-900 text-white py-2.5 rounded-lg text-lg font-medium transition"
          >
            Agregar al carrito
          </button>
          <div className="mt-3 text-gray-500 text-sm">
            Stock disponible:{" "}
            <span className="font-semibold text-gray-800">
              {producto.cantidad}
            </span>
          </div>
        </div>

        {/* Descripción y estadísticas */}
        <div className="col-span-2 bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold text-neutral-800 mb-4">
            {producto.nombre}
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6">{producto.desc}</p>

          {/* Sección de estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <StatBar label="Daño" value={producto.estadisticas.daño} />
              <StatBar label="Alcance" value={producto.estadisticas.alcance} />
              <StatBar label="Cadencia" value={producto.estadisticas.cadencia} />
            </div>
            <div>
              <StatBar label="Precisión" value={producto.estadisticas.precision} />
              <StatBar label="Movilidad" value={producto.estadisticas.movilidad} />
              <StatBar
                label="Capacidad"
                value={producto.estadisticas.capacidad || 0}
                max={200}
              />
            </div>
          </div>

          {/* Ventajas / Desventajas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="font-bold text-xl text-green-600 mb-3">Ventajas</h2>
              <ul className="list-disc list-inside space-y-1 text-green-700">
                {producto.ventajas.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-xl text-red-600 mb-3">Desventajas</h2>
              <ul className="list-disc list-inside space-y-1 text-red-700">
                {producto.desventajas.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Uso recomendado y notas */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="font-semibold text-xl mb-2 text-neutral-800">
              Uso recomendado
            </h2>
            <p className="text-gray-700 mb-6">{producto.uso_recomendado}</p>

            <h2 className="font-semibold text-xl mb-2 text-neutral-800">
              Notas técnicas
            </h2>
            <p className="text-gray-600">{producto.notas}</p>
          </div>
        </div>
      </div>
      <div>
        <ListaProductos filas={1} tipo={producto.tipo} />
        <ListaProductos filas={1} tipo="todos" />
      </div>
    </div>
  );
}


