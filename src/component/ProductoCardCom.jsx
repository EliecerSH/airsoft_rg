import React from "react";
import { Link } from "react-router-dom";

export default function ProductoCardCom({ producto }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <Link to={`/arma/${producto.id}`} className="block">
        <img
          src={producto.img}
          alt={producto.nombre}
          className="w-full h-40 object-contain mb-3"
        />
        <h3 className="text-lg font-semibold">{producto.nombre}</h3>
        <p className="text-sm text-gray-600">{producto.tipo.toUpperCase()}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold">${producto.precio.toLocaleString()}</span>
          <span className="text-xs text-gray-500">Ver ficha →</span>
        </div>
      </Link>
    </div>
  );
}
