// component/AdminOrdenes.jsx - VERSION REDISEÑADA
import React, { useState, useEffect } from 'react';
import {
  obtenerTodasOrdenes,
  actualizarEstadoOrden,
  buscarOrdenes
} from '../data/AdminData';

export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const cargarOrdenes = () => {
    setOrdenes(obtenerTodasOrdenes());
  };

  const manejarBusqueda = (e) => {
    const query = e.target.value;
    setBusqueda(query);
    const resultados = buscarOrdenes(query);
    const filtrados = filtroEstado 
      ? resultados.filter(o => o.estado === filtroEstado)
      : resultados;
    setOrdenes(filtrados);
  };

  const manejarFiltroEstado = (e) => {
    const estado = e.target.value;
    setFiltroEstado(estado);
    const resultados = buscarOrdenes(busqueda);
    const filtrados = estado 
      ? resultados.filter(o => o.estado === estado)
      : resultados;
    setOrdenes(filtrados);
  };

  const manejarCambioEstado = (idOrden, nuevoEstado) => {
    actualizarEstadoOrden(idOrden, nuevoEstado);
    cargarOrdenes();
    if (ordenSeleccionada && ordenSeleccionada.id === idOrden) {
      setOrdenSeleccionada({...ordenSeleccionada, estado: nuevoEstado});
    }
  };

  const verDetalles = (orden) => {
    setOrdenSeleccionada(orden);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setOrdenSeleccionada(null);
  };

  const obtenerColorEstado = (estado) => {
    switch(estado) {
      case 'Completado': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-200';
      case 'Enviado': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-200';
      case 'Pendiente': return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 border-yellow-200';
      case 'Cancelado': return 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-red-200';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-200';
    }
  };

  const estadosDisponibles = ['Pendiente', 'Enviado', 'Completado', 'Cancelado'];

  const conteoEstados = {
    total: ordenes.length,
    pendiente: ordenes.filter(o => o.estado === 'Pendiente').length,
    enviado: ordenes.filter(o => o.estado === 'Enviado').length,
    completado: ordenes.filter(o => o.estado === 'Completado').length,
    cancelado: ordenes.filter(o => o.estado === 'Cancelado').length
  };

  return (
    <div className="space-y-8">
      {/* Header con Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gestión de Órdenes
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Administra y rastrea todos los pedidos</p>
          </div>
          <div className="mt-6 lg:mt-0">
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-gray-700">{conteoEstados.total} órdenes totales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas Rápidas Mejoradas */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-blue-100 text-sm font-medium">Total</p>
            <h3 className="text-3xl font-bold mt-2">{conteoEstados.total}</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-yellow-100 text-sm font-medium">Pendientes</p>
            <h3 className="text-3xl font-bold mt-2">{conteoEstados.pendiente}</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-blue-100 text-sm font-medium">Enviados</p>
            <h3 className="text-3xl font-bold mt-2">{conteoEstados.enviado}</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-green-100 text-sm font-medium">Completados</p>
            <h3 className="text-3xl font-bold mt-2">{conteoEstados.completado}</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-red-100 text-sm font-medium">Cancelados</p>
            <h3 className="text-3xl font-bold mt-2">{conteoEstados.cancelado}</h3>
          </div>
        </div>
      </div>

      {/* Filtros Mejorados */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Buscar por ID, cliente o email..."
                value={busqueda}
                onChange={manejarBusqueda}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm text-lg transition-all duration-300"
              />
            </div>
          </div>
          <select
            value={filtroEstado}
            onChange={manejarFiltroEstado}
            className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm text-lg transition-all duration-300"
          >
            <option value="">Todos los estados</option>
            {estadosDisponibles.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de Órdenes Mejorada */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">ID Orden</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Cliente</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Fecha</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Total</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-8 py-6 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ordenes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="text-6xl mb-4">📦</div>
                      <p className="text-2xl font-semibold mb-2">No se encontraron órdenes</p>
                      <p className="text-lg">Intenta con otros términos de búsqueda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                ordenes.map((orden) => (
                  <tr key={orden.id} className="hover:bg-gradient-to-r from-blue-50/50 to-purple-50/50 transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <span className="font-bold text-blue-600 text-xl">#{orden.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">{orden.cliente.nombre}</p>
                        <p className="text-sm text-gray-500 truncate mt-1">{orden.cliente.email}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-gray-700 text-lg">
                        {new Date(orden.fecha).toLocaleDateString('es-CL')}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-bold text-gray-800 text-xl">
                        ${orden.total.toLocaleString('es-CL')}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <select
                        value={orden.estado}
                        onChange={(e) => manejarCambioEstado(orden.id, e.target.value)}
                        className={`px-4 py-2 text-sm font-bold rounded-full border cursor-pointer transition-all duration-300 hover:scale-105 ${obtenerColorEstado(orden.estado)}`}
                      >
                        {estadosDisponibles.map(estado => (
                          <option key={estado} value={estado}>{estado}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => verDetalles(orden)}
                        className="px-6 py-3 text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-300 flex items-center gap-2"
                      >
                        <span className="text-lg">👁️</span>
                        Detalles
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalles Mejorado */}
      {mostrarModal && ordenSeleccionada && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-3xl font-bold">
                📦 Orden #{ordenSeleccionada.id}
              </h2>
              <button
                onClick={cerrarModal}
                className="text-white hover:text-gray-200 text-3xl font-bold transition-colors duration-300"
              >
                ×
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Información del Cliente */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-bold text-2xl text-gray-800 mb-4 flex items-center gap-3">
                  <span className="text-3xl">👤</span>
                  Información del Cliente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                  <div>
                    <p className="text-gray-600 font-medium">Nombre:</p>
                    <p className="font-bold text-gray-800 mt-1">{ordenSeleccionada.cliente.nombre}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Email:</p>
                    <p className="font-bold text-gray-800 mt-1">{ordenSeleccionada.cliente.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">RUN:</p>
                    <p className="font-bold text-gray-800 mt-1 font-mono">{ordenSeleccionada.cliente.run}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Fecha:</p>
                    <p className="font-bold text-gray-800 mt-1">
                      {new Date(ordenSeleccionada.fecha).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dirección de Envío */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-2xl text-gray-800 mb-3 flex items-center gap-3">
                  <span className="text-3xl">📍</span>
                  Dirección de Envío
                </h3>
                <p className="text-gray-700 text-lg font-medium">{ordenSeleccionada.direccion}</p>
              </div>

              {/* Productos */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-2xl text-gray-800 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🛒</span>
                  Productos ({ordenSeleccionada.productos.length})
                </h3>
                <div className="space-y-4">
                  {ordenSeleccionada.productos.map((producto, index) => (
                    <div key={index} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-lg">{producto.nombre}</p>
                        <p className="text-gray-600 text-sm">Cantidad: {producto.cantidad}</p>
                      </div>
                      <p className="font-bold text-gray-800 text-xl">
                        ${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">Total:</span>
                  <span className="text-3xl font-bold">
                    ${ordenSeleccionada.total.toLocaleString('es-CL')}
                  </span>
                </div>
              </div>

              {/* Estado Actual */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-2xl text-gray-800 mb-4">📊 Estado Actual</h3>
                <select
                  value={ordenSeleccionada.estado}
                  onChange={(e) => manejarCambioEstado(ordenSeleccionada.id, e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-bold text-lg bg-white/50 backdrop-blur-sm transition-all duration-300"
                >
                  {estadosDisponibles.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  Actualiza el estado para notificar al cliente
                </p>
              </div>

              <button
                onClick={cerrarModal}
                className="w-full px-8 py-4 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 font-bold rounded-xl transition-all duration-300 text-lg"
              >
                Cerrar Detalles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}