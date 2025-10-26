// component/AdminCategorias.jsx - VERSION REDISEÑADA
import React, { useState, useEffect } from 'react';
import {
  obtenerTodasCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from '../data/AdminData';

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: ''
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = () => {
    setCategorias(obtenerTodasCategorias());
  };

  const manejarCambioFormulario = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    
    try {
      if (categoriaEditando) {
        actualizarCategoria(categoriaEditando.id, formulario);
      } else {
        crearCategoria(formulario);
      }
      cargarCategorias();
      cerrarModal();
    } catch (error) {
      alert(error.message);
    }
  };

  const manejarEditar = (categoria) => {
    setCategoriaEditando(categoria);
    setFormulario({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
    setMostrarModal(true);
  };

  const manejarEliminar = (id) => {
    try {
      const categoria = categorias.find(c => c.id === id);
      if (window.confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) {
        eliminarCategoria(id);
        cargarCategorias();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCategoriaEditando(null);
    setFormulario({
      nombre: '',
      descripcion: ''
    });
  };

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const iconosCategoria = {
    'rifle': '🔫',
    'pistola': '🔫',
    'subfusil': '🔫',
    'lmg': '🔫',
    'escopeta': '🔫',
    'sniper': '🎯',
    'default': '📂'
  };

  const obtenerIconoCategoria = (nombreCategoria) => {
    const nombreLower = nombreCategoria.toLowerCase();
    return iconosCategoria[nombreLower] || iconosCategoria.default;
  };

  const obtenerColorCategoria = (index) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-indigo-500 to-indigo-600'
    ];
    return colors[index % colors.length];
  };

  const totalProductos = categorias.reduce((sum, cat) => sum + cat.cantidad, 0);
  const promedioProductos = categorias.length > 0 ? Math.round(totalProductos / categorias.length) : 0;

  return (
    <div className="space-y-8">
      {/* Header con Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gestión de Categorías
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Organiza los tipos de productos</p>
          </div>
          <button
            onClick={abrirModal}
            className="mt-6 lg:mt-0 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
          >
            <span className="text-2xl">+</span>
            <span>Nueva Categoría</span>
          </button>
        </div>
      </div>

      {/* Estadísticas Mejoradas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-lg font-medium">Total Categorías</p>
              <h3 className="text-4xl font-bold mt-3">{categorias.length}</h3>
            </div>
            <div className="bg-white/20 p-5 rounded-2xl backdrop-blur-sm">
              <span className="text-4xl">📂</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-lg font-medium">Total Productos</p>
              <h3 className="text-4xl font-bold mt-3">{totalProductos}</h3>
            </div>
            <div className="bg-white/20 p-5 rounded-2xl backdrop-blur-sm">
              <span className="text-4xl">🔫</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-lg font-medium">Promedio por Categoría</p>
              <h3 className="text-4xl font-bold mt-3">{promedioProductos}</h3>
            </div>
            <div className="bg-white/20 p-5 rounded-2xl backdrop-blur-sm">
              <span className="text-4xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Categorías Mejorado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria, index) => (
          <div
            key={categoria.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 group"
          >
            <div className={`h-3 bg-gradient-to-r ${obtenerColorCategoria(index)}`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    {obtenerIconoCategoria(categoria.nombre)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold text-gray-800 truncate">{categoria.nombre}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{categoria.descripcion}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-medium">Productos en categoría</span>
                  <span className="text-2xl font-bold text-blue-600">{categoria.cantidad}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${Math.min((categoria.cantidad / 15) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => manejarEditar(categoria)}
                  className="flex-1 px-4 py-3 text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="text-lg">✏️</span>
                  Editar
                </button>
                <button
                  onClick={() => manejarEliminar(categoria.id)}
                  className="flex-1 px-4 py-3 text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl border-2 border-red-200 hover:border-red-300 transition-all duration-300 flex items-center justify-center gap-2"
                  disabled={categoria.cantidad > 0}
                  title={categoria.cantidad > 0 ? 'No se puede eliminar una categoría con productos' : 'Eliminar categoría'}
                >
                  <span className="text-lg">🗑️</span>
                  Eliminar
                </button>
              </div>
              
              {categoria.cantidad > 0 && (
                <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-1">
                  <span className="text-lg">⚠️</span>
                  No se puede eliminar mientras tenga productos
                </p>
              )}
            </div>
          </div>
        ))}

        {categorias.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-8xl mb-6">📂</div>
            <p className="text-3xl font-semibold mb-3">No hay categorías creadas</p>
            <p className="text-lg text-gray-500 mb-6">Crea tu primera categoría para organizar los productos</p>
            <button
              onClick={abrirModal}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
            >
              <span className="text-2xl">+</span>
              <span>Crear Primera Categoría</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal Mejorado */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-white/20">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-3xl font-bold">
                {categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}
              </h2>
              <button
                onClick={cerrarModal}
                className="text-white hover:text-gray-200 text-3xl font-bold transition-colors duration-300"
              >
                ×
              </button>
            </div>

            <form onSubmit={manejarSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">
                  Nombre de la Categoría *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambioFormulario}
                  required
                  placeholder="Ej: Rifles, Pistolas, etc."
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm text-lg transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">
                  Descripción *
                </label>
                <textarea
                  name="descripcion"
                  value={formulario.descripcion}
                  onChange={manejarCambioFormulario}
                  required
                  rows="4"
                  placeholder="Describe brevemente esta categoría..."
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm text-lg transition-all duration-300 resize-none"
                />
              </div>

              {categoriaEditando && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-semibold text-gray-800">Estadísticas de la categoría</p>
                      <p className="text-sm text-gray-600">{categoriaEditando.cantidad} productos asociados</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {categoriaEditando ? 'Actualizar' : 'Crear Categoría'}
                </button>
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-8 py-4 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 font-bold rounded-xl transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}