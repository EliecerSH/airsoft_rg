import React, { useState } from "react";

export default function ProductoModal({ onClose, onSave, producto }) {
  const [form, setForm] = useState(
    producto || {
      nombre: "",
      precio: 0,
      stock: 0,
      id_categoria: 0,
      id_descuento: 0,
      id_tack_prod: 0,
      id_descripcion: 0,
    }
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function guardar() {
    onSave(form);
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/50 backdrop-blur-sm
        flex justify-center items-center
        p-4
      "
    >
      <div
        className="
          bg-white w-full max-w-md rounded-2xl shadow-xl
          p-6 animate-fadeIn scale-95
        "
        style={{ animation: "fadeIn .2s ease-out forwards" }}
      >
        <h2 className="text-2xl font-semibold mb-5 text-neutral-800">
          {producto ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <div className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            name="precio"
            type="number"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            name="id_categoria"
            type="number"
            placeholder="ID Categoría"
            value={form.id_categoria}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={guardar}
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Animación Tailwind personalizada */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        `}
      </style>
    </div>
  );
}

