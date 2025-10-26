// component/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  obtenerEstadisticas, 
  obtenerVentasPorDia, 
  obtenerProductosMasVendidos,
  obtenerTodasOrdenes,
  obtenerProductosStockBajo
} from '../data/AdminData';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [ventasPorDia, setVentasPorDia] = useState([]);
  const [topProductos, setTopProductos] = useState([]);
  const [ordenesRecientes, setOrdenesRecientes] = useState([]);
  const [productosStockBajo, setProductosStockBajo] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    setStats(obtenerEstadisticas());
    setVentasPorDia(obtenerVentasPorDia());
    setTopProductos(obtenerProductosMasVendidos());
    setOrdenesRecientes(obtenerTodasOrdenes().slice(0, 5));
    setProductosStockBajo(obtenerProductosStockBajo());
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen general de la tienda</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Ingresos Totales */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Ingresos Totales</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                ${stats.totalIngresos.toLocaleString('es-CL')}
              </h3>
              <p className="text-xs text-green-600 mt-1">↑ +12.5% vs mes anterior</p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <span className="text-3xl">💰</span>
            </div>
          </div>
        </div>

        {/* Total Órdenes */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Órdenes</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{stats.totalOrdenes}</h3>
              <p className="text-xs text-blue-600 mt-1">
                {stats.ordenesPendientes} pendientes
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <span className="text-3xl">📦</span>
            </div>
          </div>
        </div>

        {/* Total Productos */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Productos</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{stats.totalProductos}</h3>
              <p className="text-xs text-orange-600 mt-1">
                {productosStockBajo.length} con stock bajo
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <span className="text-3xl">🔫</span>
            </div>
          </div>
        </div>

        {/* Total Clientes */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Clientes</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{stats.totalClientes}</h3>
              <p className="text-xs text-green-600 mt-1">↑ +5.4% este mes</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-full">
              <span className="text-3xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Ventas Semanales */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Ventas de la Semana</h2>
          <div className="flex items-end justify-between h-64 gap-4">
            {ventasPorDia.map((dato, index) => {
              const alturaMax = Math.max(...ventasPorDia.map(d => d.ventas));
              const alturaPorcentaje = (dato.ventas / alturaMax) * 100;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="relative w-full mb-2">
                    <div
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                      style={{ height: `${Math.max(alturaPorcentaje, 10)}%` }}
                      title={`$${dato.ventas.toLocaleString('es-CL')}`}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        ${dato.ventas.toLocaleString('es-CL')}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{dato.dia}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Productos */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Top Productos</h2>
          <div className="space-y-4">
            {topProductos.map((producto, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-full text-lg">
                  {index + 1}
                </div>
                <img 
                  src={producto.img} 
                  alt={producto.nombre}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{producto.nombre}</p>
                  <p className="text-xs text-gray-600">{producto.ventas} ventas</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Órdenes Recientes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Órdenes Recientes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 text-sm font-semibold text-gray-600">ID</th>
                  <th className="pb-3 text-sm font-semibold text-gray-600">Cliente</th>
                  <th className="pb-3 text-sm font-semibold text-gray-600">Total</th>
                  <th className="pb-3 text-sm font-semibold text-gray-600">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ordenesRecientes.map((orden) => (
                  <tr key={orden.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-sm font-medium text-gray-800">#{orden.id}</td>
                    <td className="py-3 text-sm text-gray-700">{orden.cliente.nombre}</td>
                    <td className="py-3 text-sm font-semibold text-gray-800">
                      ${orden.total.toLocaleString('es-CL')}
                    </td>
                    <td className="py-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        orden.estado === 'Completado' ? 'bg-green-100 text-green-700' :
                        orden.estado === 'Enviado' ? 'bg-blue-100 text-blue-700' :
                        orden.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {orden.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertas de Stock Bajo */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            ⚠️ Alertas de Stock Bajo
          </h2>
          <div className="space-y-3">
            {productosStockBajo.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay productos con stock bajo</p>
            ) : (
              productosStockBajo.slice(0, 5).map((producto) => (
                <div key={producto.id} className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <img 
                    src={producto.img} 
                    alt={producto.nombre}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{producto.nombre}</p>
                    <p className="text-xs text-orange-600 font-medium">
                      Solo {producto.cantidad} unidades disponibles
                    </p>
                  </div>
                  <button className="px-3 py-1 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                    Reponer
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}