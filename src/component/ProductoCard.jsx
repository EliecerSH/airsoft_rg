import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

export default function ProductoCard({ producto }) {
  const navigate = useNavigate();
  const { agregarCarrito } = useContext(CarritoContext);

  return (
    <div
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer overflow-hidden"
      onClick={() => navigate(`/arma/${producto.id}`)}
    >
      <div className="p-6 flex justify-center items-center bg-gray-50">
        <img
          src={producto.img}
          alt={producto.nombre}
          className="w-full h-56 object-contain"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold truncate">{producto.nombre}</h3>
        <p className="text-sm text-gray-500 mt-2 h-16 overflow-hidden">{producto.desc}</p>
        <p className="mt-4 text-center text-xl font-bold text-gray-800">
          ${producto.precio.toLocaleString()} CLP
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            agregarCarrito(producto);
          }}
          className="mt-5 w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-2 rounded-xl transition"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
