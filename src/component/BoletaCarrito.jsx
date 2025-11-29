import React, { useContext, useEffect, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { obtenerProductosCompletos } from "../service/productosService";

function BoletaCarrito() {
  const { carrito } = useContext(CarritoContext);
  const [productos, setProductos] = useState([]);

  // Traer productos completos
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
      nombre: producto?.nombre || `Producto #${item.id_producto}`,
      precio: producto?.precio || 0,
    };
  });

  // Calcular subtotal, IVA y total
  const subtotal = carritoConDatos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  if (carrito.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
        <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-center mb-4 border-b pb-2">
        🧾 Boleta de Compra
      </h2>

      <div className="divide-y divide-dashed divide-gray-300 mb-4">
        {carritoConDatos.map((item) => (
          <div key={item.id_detalle} className="flex justify-between py-2 text-gray-700">
            <div>
              <p className="font-medium">{item.nombre}</p>
              <p className="text-sm text-gray-500">x{item.cantidad}</p>
            </div>
            <p className="font-semibold">
              ${(item.precio * item.cantidad).toLocaleString()} CLP
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-gray-400 pt-4 text-gray-800">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()} CLP</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>IVA (19%)</span>
          <span>${iva.toLocaleString()} CLP</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
          <span>Total</span>
          <span>${total.toLocaleString()} CLP</span>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-4">
        Gracias por tu compra 💚
      </p>
    </div>
  );
}

export default BoletaCarrito;
