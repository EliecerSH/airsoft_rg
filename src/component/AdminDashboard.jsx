// component/AdminDashboard.jsx - VERSION REDISEÑADA
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header con Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Resumen general de Airsoft Rock Galactic</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-100">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Sistema activo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de Estadísticas Mejoradas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Ingresos Totales */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Ingresos Totales</p>
              <h3 className="text-3xl font-bold mt-2">
                ${stats.totalIngresos.toLocaleString('es-CL')}
              </h3>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-green-300">↗</span>
                <p className="text-blue-100 text-sm">+12.5% vs mes anterior</p>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        {/* Total Órdenes */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Órdenes</p>
              <h3 className="text-3xl font-bold mt-2">{stats.totalOrdenes}</h3>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-blue-300">📦</span>
                <p className="text-purple-100 text-sm">{stats.ordenesPendientes} pendientes</p>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        {/* Total Productos */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Productos</p>
              <h3 className="text-3xl font-bold mt-2">{stats.totalProductos}</h3>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-yellow-300">⚠️</span>
                <p className="text-green-100 text-sm">{productosStockBajo.length} con stock bajo</p>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-2xl">🔫</span>
            </div>
          </div>
        </div>

        {/* Total Clientes */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Clientes</p>
              <h3 className="text-3xl font-bold mt-2">{stats.totalClientes}</h3>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-green-300">↗</span>
                <p className="text-orange-100 text-sm">+5.4% este mes</p>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico de Ventas Semanales Mejorado */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Ventas de la Semana
            </h2>
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
              +15% vs semana anterior
            </span>
          </div>
          <div className="flex items-end justify-between h-64 gap-3">
            {ventasPorDia.map((dato, index) => {
              const alturaMax = Math.max(...ventasPorDia.map(d => d.ventas));
              const alturaPorcentaje = (dato.ventas / alturaMax) * 80;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="relative w-full mb-2 flex flex-col items-center">
                    <div
                      className="w-12 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-xl transition-all duration-500 hover:from-blue-600 hover:to-blue-500 cursor-pointer shadow-lg"
                      style={{ height: `${Math.max(alturaPorcentaje, 15)}%` }}
                      title={`$${dato.ventas.toLocaleString('es-CL')}`}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap shadow-lg">
                        ${dato.ventas.toLocaleString('es-CL')}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                    {dato.dia}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Productos Mejorado */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            🏆 Top Productos
          </h2>
          <div className="space-y-4">
            {topProductos.map((producto, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold rounded-xl text-lg shadow-lg">
                  {index + 1}
                </div>
                <img 
                  src={producto.img} 
                  alt={producto.nombre}
                  className="w-14 h-14 object-cover rounded-xl shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{producto.nombre}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {producto.ventas} ventas
                    </span>
                    <span className="text-xs text-gray-500">
                      ${producto.precio.toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Órdenes Recientes Mejorado */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              📦 Órdenes Recientes
            </h2>
            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {ordenesRecientes.length} órdenes
            </span>
          </div>
          <div className="space-y-4">
            {ordenesRecientes.map((orden) => (
              <div key={orden.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    #{orden.id}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{orden.cliente.nombre}</p>
                    <p className="text-sm text-gray-500">{orden.cliente.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 text-lg">
                    ${orden.total.toLocaleString('es-CL')}
                  </p>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    orden.estado === 'Completado' ? 'bg-green-100 text-green-700 border border-green-200' :
                    orden.estado === 'Enviado' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                    orden.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                    'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {orden.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas de Stock Bajo Mejorado */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              ⚠️ Alertas de Stock
            </h2>
            <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              {productosStockBajo.length} productos
            </span>
          </div>
          <div className="space-y-4">
            {productosStockBajo.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-gray-500 font-semibold">¡Todo bajo control!</p>
                <p className="text-sm text-gray-400 mt-1">No hay productos con stock bajo</p>
              </div>
            ) : (
              productosStockBajo.slice(0, 4).map((producto) => (
                <div key={producto.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-xl border border-orange-200 hover:shadow-md transition-all duration-300">
                  <img 
                    src={producto.img} 
                    alt={producto.nombre}
                    className="w-14 h-14 object-cover rounded-xl shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{producto.nombre}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                        Solo {producto.cantidad} unidades
                      </span>
                      <span className="text-xs text-gray-500">{producto.tipo}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all duration-300 shadow-md">
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