// pages/AdminPage.jsx
import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import AdminDashboard from "../component/AdminDashboard";
import AdminProductos from "../component/AdminProductos";
import AdminCategorias from "../component/AdminCategorias";
import AdminOrdenes from "../component/AdminOrdenes";
import AdminUsuarios from "../component/AdminUsuarios";

export default function AdminPage() {
  const [vistaActiva, setVistaActiva] = useState('dashboard');

  const cambiarVista = (nombreVista) => {
    setVistaActiva(nombreVista);
  };

  const renderizarContenido = () => {
    switch(vistaActiva) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'productos':
        return <AdminProductos />;
      case 'categorias':
        return <AdminCategorias />;
      case 'ordenes':
        return <AdminOrdenes />;
      case 'usuarios':
        return <AdminUsuarios />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar vistaActiva={vistaActiva} cambiarVista={cambiarVista} />
      
      <main className="flex-1 p-6 overflow-y-auto">
        {renderizarContenido()}
      </main>
    </div>
  );
}