// component/AdminOrdenes.jsx
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
      case 'Completado': return 'bg-green-100 text-green-700';
      case 'Enviado': return 'bg-blue-100 text-blue-700';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Órdenes</h1>
        <p className="text-gray-600 mt-1">Administra y rastrea todos los pedidos</p>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-medium">Total</p>
          <p className="text-2xl font-bold text-gray-800">{conteoEstados.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600 font-medium">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">{conteoEstados.pendiente}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
          <p className="text-sm text-gray-600 font-medium">Enviados</p>
          <p className="text-2xl font-bold text-blue-600">{conteoEstados.enviado}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-medium">Completados</p>
          <p className="text-2xl font-bold text-green-600">{conteoEstados.completado}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600 font-medium">Cancelados</p>
          <p className="text-2xl font-bold text-red-600">{conteoEstados.cancelado}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="🔍 Buscar por ID, cliente o email..."
              value={busqueda}
              onChange={manejarBusqueda}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filtroEstado}
            onChange={manejarFiltroEstado}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Todos los estados</option>
            {estadosDisponibles.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de Órdenes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID Orden</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ordenes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-400 text-lg">
                      <p className="text-4xl mb-2">📦</p>
                      <p>No se encontraron órdenes</p>
                    </div>
                  </td>
                </tr>
              ) : (
                ordenes.map((orden) => (
                  <tr key={orden.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-blue-600">#{orden.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{orden.cliente.nombre}</p>
                        <p className="text-sm text-gray-500">{orden.cliente.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(orden.fecha).toLocaleDateString('es-CL')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-800">
                        ${orden.total.toLocaleString('es-CL')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={orden.estado}
                        onChange={(e) => manejarCambioEstado(orden.id, e.target.value)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${obtenerColorEstado(orden.estado)} border-none outline-none cursor-pointer`}
                      >
                        {estadosDisponibles.map(estado => (
                          <option key={estado} value={estado}>{estado}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => verDetalles(orden)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        👁️ Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalles */}
      {mostrarModal && ordenSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Orden #{ordenSeleccionada.id}
              </h2>
              <button
                onClick={cerrarModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información del Cliente */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  👤 Información del Cliente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Nombre:</p>
                    <p className="font-semibold text-gray-800">{ordenSeleccionada.cliente.nombre}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-semibold text-gray-800">{ordenSeleccionada.cliente.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">RUN:</p>
                    <p className="font-semibold text-gray-800">{ordenSeleccionada.cliente.run}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fecha:</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(ordenSeleccionada.fecha).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dirección de Envío */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  📍 Dirección de Envío
                </h3>
                <p className="text-gray-700">{ordenSeleccionada.direccion}</p>
              </div>

              {/* Productos */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  🛒 Productos
                </h3>
                <div className="space-y-3">
                  {ordenSeleccionada.productos.map((producto, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{producto.nombre}</p>
                        <p className="text-sm text-gray-600">Cantidad: {producto.cantidad}</p>
                      </div>
                      <p className="font-bold text-gray-800">
                        ${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${ordenSeleccionada.total.toLocaleString('es-CL')}
                  </span>
                </div>
              </div>

              {/* Estado Actual */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">Estado Actual</h3>
                <select
                  value={ordenSeleccionada.estado}
                  onChange={(e) => manejarCambioEstado(ordenSeleccionada.id, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-semibold"
                >
                  {estadosDisponibles.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={cerrarModal}
                className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}