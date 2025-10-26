// component/Sidebar.jsx
import React from "react";

export default function Sidebar({ vistaActiva, cambiarVista }) {
  const menuItems = [
    { id: 'dashboard', nombre: 'Dashboard', icono: '📊' },
    { id: 'productos', nombre: 'Productos', icono: '🔫' },
    { id: 'categorias', nombre: 'Categorías', icono: '🏷️' },
    { id: 'ordenes', nombre: 'Órdenes', icono: '📦' },
    { id: 'usuarios', nombre: 'Usuarios', icono: '👥' }
  ];

  return (
    <aside className="w-64 bg-gray-800 text-gray-100 min-h-screen p-6 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🎯 Airsoft Admin</h2>
        <p className="text-xs text-gray-400">Panel de Administración</p>
      </div>

      {/* Navegación */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => cambiarVista(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
              vistaActiva === item.id
                ? 'bg-blue-600 text-white font-semibold shadow-lg'
                : 'hover:bg-gray-700 text-gray-300 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icono}</span>
            <span>{item.nombre}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={() => {
            if (window.confirm('¿Estás seguro de cerrar sesión?')) {
              window.location.href = '/';
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-white transition-all duration-200"
        >
          <span className="text-xl">🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}