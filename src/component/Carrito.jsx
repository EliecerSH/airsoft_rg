import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { obtenerProductosCompletos } from "../service/productosService";

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  // Cargar productos completos del product service
  useEffect(() => {
    const fetchProductos = async () => {
      const data = await obtenerProductosCompletos();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  // Combinar carrito con datos del producto
  const carritoConDatos = carrito.map((item) => {
    const producto = productos.find((p) => p.id === item.id_producto);
    return {
      ...item,
      nombre: producto?.nombre,
      precio: producto?.precio,
      img: producto?.img,
    };
  });

  // Calcular total
  const total = carritoConDatos.reduce((acc, item) => acc + ((item.precio || 0) * item.cantidad), 0);

  return (
    <div className="mt-10 p-6 rounded-2xl shadow-xl bg-gradient-to-b from-gray-50 to-gray-100 max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">🛒 Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="space-y-4">
            {carritoConDatos.map((item) => (
              <li
                key={item.id_detalle}
                className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.nombre || `Producto #${item.id_producto}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      Img
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.nombre || `Producto #${item.id_producto}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.cantidad} x ${item.precio ? item.precio.toLocaleString() : "N/A"} CLP
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item.id_detalle)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center">
            <p className="text-2xl font-bold text-gray-900">
              Total: ${total.toLocaleString()} CLP
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={vaciarCarrito}
                className="mt-2 w-30 bg-neutral-800 hover:bg-red-900 text-white font-medium py-2 rounded-xl transition"
              >
                Vaciar
              </button>

              <button
                onClick={() => navigate("/pago")}
                className="mt-2 w-30 bg-neutral-800 hover:bg-emerald-600 text-white font-medium py-2 rounded-xl transition"
              >
                Comprar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;





