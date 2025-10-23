import React from "react";
import Sidebar from "../component/Sidebar";
import StatCard from "../component/StatCard";
import RecentOrders from "../component/RecentOrders";
import UsersTable from "../component/UsersTable";
import { productos } from "../data/Productos.js";
import IngresarProducto from "../component/IngresarProducto.jsx";

const usuarios = [
  { id: 1, nombre: "Juan Pérez", correo: "juan.perez@example.com", run: "12.345.678-9" },
  { id: 2, nombre: "María González", correo: "maria.gonzalez@example.com", run: "11.222.333-4" },
  { id: 3, nombre: "Carlos López", correo: "carlos.lopez@example.com", run: "10.987.654-3" },
];

const pedidosRecientes = [
  { id: "#ORD-1256", cliente: "Juan Pérez", total: 150000, estado: "Completado" },
  { id: "#ORD-1255", cliente: "María González", total: 230000, estado: "Pendiente" },
  { id: "#ORD-1254", cliente: "Carlos López", total: 80000, estado: "Enviado" },
];

export default function AdminPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Usuarios" value={usuarios.length} icon="👥" />
          <StatCard title="Productos" value={productos.length} icon="🛒" />
          <StatCard title="Pedidos" value={pedidosRecientes.length} icon="📦" />
          <StatCard title="Ingresos" value="$460.000" icon="💰" />
        </div>

        {/* Pedidos recientes */}
        <RecentOrders pedidos={pedidosRecientes} />

        {/* Tabla de usuarios */}
        <UsersTable usuarios={usuarios} />
        <IngresarProducto></IngresarProducto>
      </main>
    </div>
  );
}
