// component/AdminUsuarios.jsx - VERSION REDISEÑADA
import React, { useState, useEffect } from 'react';
import {
  obtenerTodosUsuarios,
  actualizarUsuario,
  cambiarEstadoUsuario,
  buscarUsuarios
} from '../data/AdminData';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    setUsuarios(obtenerTodosUsuarios());
  };

  const manejarBusqueda = (e) => {
    const query = e.target.value;
    setBusqueda(query);
    const resultados = buscarUsuarios(query);
    const filtrados = filtroRol 
      ? resultados.filter(u => u.rol === filtroRol)
      : resultados;
    setUsuarios(filtrados);
  };

  const manejarFiltroRol = (e) => {
    const rol = e.target.value;
    setFiltroRol(rol);
    const resultados = buscarUsuarios(busqueda);
    const filtrados = rol 
      ? resultados.filter(u => u.rol === rol)
      : resultados;
    setUsuarios(filtrados);
  };

  const verDetalles = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioSeleccionado(null);
  };

  const manejarCambioEstado = (idUsuario, nuevoEstado) => {
    cambiarEstadoUsuario(idUsuario, nuevoEstado);
    cargarUsuarios();
    if (usuarioSeleccionado && usuarioSeleccionado.id === idUsuario) {
      setUsuarioSeleccionado({...usuarioSeleccionado, estado: nuevoEstado});
    }
  };

  const manejarCambioRol = (idUsuario, nuevoRol) => {
    actualizarUsuario(idUsuario, { rol: nuevoRol });
    cargarUsuarios();
    if (usuarioSeleccionado && usuarioSeleccionado.id === idUsuario) {
      setUsuarioSeleccionado({...usuarioSeleccionado, rol: nuevoRol});
    }
  };

  const estadisticas = {
    total: usuarios.length,
    clientes: usuarios.filter(u => u.rol === 'Cliente').length,
    admins: usuarios.filter(u => u.rol === 'Administrador').length,
    activos: usuarios.filter(u => u.estado === 'Activo').length,
    inactivos: usuarios.filter(u => u.estado === 'Inactivo').length
  };

  return (
    <div className="space-y-8">
      {/* Header con Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gestión de Usuarios
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Administra los usuarios de la plataforma</p>
          </div>
          <div className="mt-6 lg:mt-0">
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-gray-700">{estadisticas.total} usuarios registrados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas Mejoradas */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-blue-100 text-sm font-medium">Total</p>
            <h3 className="text-3xl font-bold mt-2">{estadisticas.total}</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-green-100 text-sm font-medium">Clientes</p>
            <h3 className="text-3xl font-bold mt-2">{estadisticas.clientes}</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-purple-100 text-sm font-medium">Admins</p>
            <h3 className="text-3xl font-bold mt-2">{estadisticas.admins}</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-emerald-100 text-sm font-medium">Activos</p>
            <h3 className="text-3xl font-bold mt-2">{estadisticas.activos}</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <p className="text-gray-100 text-sm font-medium">Inactivos</p>
            <h3 className="text-3xl font-bold mt-2">{estadisticas.inactivos}</h3>
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
                placeholder="🔍 Buscar por nombre, email o RUN..."
                value={busqueda}
                onChange={manejarBusqueda}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm text-lg transition-all duration-300"
              />
            </div>
          </div>
          <select
            value={filtroRol}
            onChange={manejarFiltroRol}
            className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm text-lg transition-all duration-300"
          >
            <option value="">Todos los roles</option>
            <option value="Cliente">Cliente</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>
      </div>

      {/* Tabla de Usuarios Mejorada */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Usuario</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">RUN</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Rol</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Fecha Registro</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Órdenes</th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-8 py-6 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="text-6xl mb-4">👥</div>
                      <p className="text-2xl font-semibold mb-2">No se encontraron usuarios</p>
                      <p className="text-lg">Intenta con otros términos de búsqueda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gradient-to-r from-blue-50/50 to-purple-50/50 transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <div className="min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">{usuario.nombre}</p>
                        <p className="text-sm text-gray-500 truncate mt-1">{usuario.email}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-gray-700 font-mono text-lg">{usuario.run}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 text-sm font-bold rounded-full border ${
                        usuario.rol === 'Administrador' 
                          ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-purple-200' 
                          : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-200'
                      }`}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-gray-700 text-lg">
                        {new Date(usuario.fechaRegistro).toLocaleDateString('es-CL')}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-xl font-bold text-gray-800">{usuario.totalOrdenes}</p>
                        <p className="text-sm text-gray-500">
                          ${usuario.totalGastado.toLocaleString('es-CL')}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 text-sm font-bold rounded-full border ${
                        usuario.estado === 'Activo' 
                          ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-200' 
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-200'
                      }`}>
                        {usuario.estado}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => verDetalles(usuario)}
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
      {mostrarModal && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-3xl font-bold">
                👤 Detalles del Usuario
              </h2>
              <button
                onClick={cerrarModal}
                className="text-white hover:text-gray-200 text-3xl font-bold transition-colors duration-300"
              >
                ×
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Información Personal */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-bold text-2xl text-gray-800 mb-4 flex items-center gap-3">
                  <span className="text-3xl">👤</span>
                  Información Personal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Nombre Completo</p>
                    <p className="font-bold text-gray-800 text-xl mt-1">{usuarioSeleccionado.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">RUN</p>
                    <p className="font-bold text-gray-800 text-xl mt-1 font-mono">{usuarioSeleccionado.run}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 font-medium">Email</p>
                    <p className="font-bold text-gray-800 text-xl mt-1">{usuarioSeleccionado.email}</p>
                  </div>
                </div>
              </div>

              {/* Estadísticas del Usuario */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-green-100 text-sm font-medium">Total Órdenes</p>
                  <p className="text-3xl font-bold mt-2">{usuarioSeleccionado.totalOrdenes}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-blue-100 text-sm font-medium">Total Gastado</p>
                  <p className="text-2xl font-bold mt-2">
                    ${usuarioSeleccionado.totalGastado.toLocaleString('es-CL')}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-purple-100 text-sm font-medium">Miembro Desde</p>
                  <p className="text-lg font-bold mt-2">
                    {new Date(usuarioSeleccionado.fechaRegistro).toLocaleDateString('es-CL')}
                  </p>
                </div>
              </div>

              {/* Gestión de Rol */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-2xl text-gray-800 mb-4">🎭 Rol del Usuario</h3>
                <select
                  value={usuarioSeleccionado.rol}
                  onChange={(e) => manejarCambioRol(usuarioSeleccionado.id, e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-bold text-lg bg-white/50 backdrop-blur-sm transition-all duration-300"
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Administrador">Administrador</option>
                </select>
                <p className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  Los administradores tienen acceso completo al panel de administración
                </p>
              </div>

              {/* Gestión de Estado */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-2xl text-gray-800 mb-4">🔒 Estado de la Cuenta</h3>
                <select
                  value={usuarioSeleccionado.estado}
                  onChange={(e) => manejarCambioEstado(usuarioSeleccionado.id, e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-bold text-lg bg-white/50 backdrop-blur-sm transition-all duration-300"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Suspendido">Suspendido</option>
                </select>
                <p className="text-sm text-gray-500 mt-3">
                  Las cuentas inactivas o suspendidas no pueden realizar compras
                </p>
              </div>

              {/* Acciones */}
              <div className="flex gap-4">
                <button
                  onClick={cerrarModal}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 font-bold rounded-xl transition-all duration-300"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    alert('Funcionalidad de envío de email en desarrollo');
                  }}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <span className="text-xl">📧</span>
                  Enviar Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}