import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Admin</h2>
      <nav className="space-y-4">
        <a className="flex items-center gap-3 hover:text-white" href="#">📊 Dashboard</a>
        <a className="flex items-center gap-3 hover:text-white" href="#productos">🛒 Productos</a>
        <a className="flex items-center gap-3 hover:text-white" href="#categorias">🏷️ Categorías</a>
        <a className="flex items-center gap-3 hover:text-white" href="#pedidos">📦 Pedidos</a>
        <a className="flex items-center gap-3 hover:text-white" href="#usuarios">👥 Usuarios</a>
        <a className="flex items-center gap-3 hover:text-white" href="#config">⚙️ Configuración</a>
      </nav>
    </aside>
  );
}
