import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="mt-10 bg-gray-100 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🛒 Carrito</h2>
      {carrito.length === 0 ? (
        <p className="text-center text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="divide-y">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-gray-500">
                    {item.cantidad} x ${item.precio}
                  </p>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-center">
            <p className="text-lg font-bold">Total: ${total.toLocaleString()} CLP</p>
            <button
              onClick={vaciarCarrito}
              className="mt-2 bg-neutral-700 hover:bg-neutral-900 text-white px-4 py-2 rounded-lg"
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;

