import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // ICONOS

export default function Sidebar({ onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BOTÓN MÓVIL */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 
          transform transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <h2 className="text-2xl font-bold mb-8">Panel Admin</h2>

        <ul className="space-y-4">
          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
              onClick={() => {
                onSelect("productos");
                setOpen(false);
              }}
            >
              Productos
            </button>
          </li>

          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
              onClick={() => {
                onSelect("clientes");
                setOpen(false);
              }}
            >
              Clientes
            </button>
          </li>

          <li>
            <button
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
              onClick={() => {
                onSelect("compras");
                setOpen(false);
              }}
            >
              Compras
            </button>
          </li>
        </ul>
      </div>

      {/* FONDO OSCURO PARA CUANDO EL MENÚ ESTÁ ABIERTO (MÓVIL) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-30 backdrop-blur-sm"
        ></div>
      )}
    </>
  );
}


