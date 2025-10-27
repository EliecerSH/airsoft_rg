import React from "react";
import { Link } from "react-router-dom";
import PagoForm from "../component/PagoForm";
import BoletaCarrito from "../component/BoletaCarrito";

export default function PagoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-6 flex justify-center items-start">
      <div className="flex flex-col md:flex-row gap-10 max-w-6xl w-full">
        {/* Columna izquierda: formulario de pago */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8">
          <Link
            to="/carrito"
            className="inline-block mb-6 text-gray-600 hover:text-gray-800 font-medium"
          >
            &larr; Volver al carrito
          </Link>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            💳 Pago Seguro
          </h1>

          <PagoForm />
        </div>

        {/* Columna derecha: boleta */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-10">
            <BoletaCarrito />
          </div>
        </div>
      </div>
    </div>
  );
}
