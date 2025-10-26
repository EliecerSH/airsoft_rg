// component/AdminUsuarios.jsx
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <p className="text-gray-600 mt-1">Administra los usuarios de la plataforma</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 font-medium">Total</p>
          <p className="text-2xl font-bold text-gray-800">{estadisticas.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 font-medium">Clientes</p>
          <p className="text-2xl font-bold text-green-600">{estadisticas.clientes}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600 font-medium">Admins</p>
          <p className="text-2xl font-bold text-purple-600">{estadisticas.admins}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-emerald-500">
          <p className="text-sm text-gray-600 font-medium">Activos</p>
          <p className="text-2xl font-bold text-emerald-600">{estadisticas.activos}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
          <p className="text-sm text-gray-600 font-medium">Inactivos</p>
          <p className="text-2xl font-bold text-gray-600">{estadisticas.inactivos}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="🔍 Buscar por nombre, email o RUN..."
              value={busqueda}
              onChange={manejarBusqueda}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filtroRol}
            onChange={manejarFiltroRol}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Todos los roles</option>
            <option value="Cliente">Cliente</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Usuario</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">RUN</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rol</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fecha Registro</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Órdenes</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-gray-400 text-lg">
                      <p className="text-4xl mb-2">👥</p>
                      <p>No se encontraron usuarios</p>
                    </div>
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{usuario.nombre}</p>
                        <p className="text-sm text-gray-500">{usuario.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{usuario.run}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        usuario.rol === 'Administrador' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(usuario.fechaRegistro).toLocaleDateString('es-CL')}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{usuario.totalOrdenes}</p>
                        <p className="text-xs text-gray-500">
                          ${usuario.totalGastado.toLocaleString('es-CL')}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        usuario.estado === 'Activo' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {usuario.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => verDetalles(usuario)}
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
      {mostrarModal && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Detalles del Usuario
              </h2>
              <button
                onClick={cerrarModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información Personal */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  👤 Información Personal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nombre Completo</p>
                    <p className="font-semibold text-gray-800 text-lg">{usuarioSeleccionado.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">RUN</p>
                    <p className="font-semibold text-gray-800 text-lg">{usuarioSeleccionado.run}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-800 text-lg">{usuarioSeleccionado.email}</p>
                  </div>
                </div>
              </div>

              {/* Estadísticas del Usuario */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-sm text-gray-600 font-medium">Total Órdenes</p>
                  <p className="text-2xl font-bold text-green-700">{usuarioSeleccionado.totalOrdenes}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600 font-medium">Total Gastado</p>
                  <p className="text-2xl font-bold text-blue-700">
                    ${usuarioSeleccionado.totalGastado.toLocaleString('es-CL')}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-sm text-gray-600 font-medium">Miembro Desde</p>
                  <p className="text-lg font-bold text-purple-700">
                    {new Date(usuarioSeleccionado.fechaRegistro).toLocaleDateString('es-CL')}
                  </p>
                </div>
              </div>

              {/* Gestión de Rol */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">Rol del Usuario</h3>
                <select
                  value={usuarioSeleccionado.rol}
                  onChange={(e) => manejarCambioRol(usuarioSeleccionado.id, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-semibold"
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Administrador">Administrador</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  ⚠️ Los administradores tienen acceso completo al panel de administración
                </p>
              </div>

              {/* Gestión de Estado */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">Estado de la Cuenta</h3>
                <select
                  value={usuarioSeleccionado.estado}
                  onChange={(e) => manejarCambioEstado(usuarioSeleccionado.id, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none font-semibold"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Suspendido">Suspendido</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Las cuentas inactivas o suspendidas no pueden realizar compras
                </p>
              </div>

              {/* Acciones */}
              <div className="flex gap-3">
                <button
                  onClick={cerrarModal}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    alert('Funcionalidad de envío de email en desarrollo');
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  📧 Enviar Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}