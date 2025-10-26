// component/AdminCategorias.jsx
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
    'sniper': '🎯'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Categorías</h1>
          <p className="text-gray-600 mt-1">Organiza los tipos de productos</p>
        </div>
        <button
          onClick={abrirModal}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Nueva Categoría
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Categorías</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{categorias.length}</h3>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <span className="text-3xl">📂</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Productos</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {categorias.reduce((sum, cat) => sum + cat.cantidad, 0)}
              </h3>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <span className="text-3xl">🔫</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Promedio por Categoría</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {categorias.length > 0 
                  ? Math.round(categorias.reduce((sum, cat) => sum + cat.cantidad, 0) / categorias.length)
                  : 0
                }
              </h3>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <span className="text-3xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border-t-4 border-blue-500"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">
                    {iconosCategoria[categoria.nombre.toLowerCase()] || '📁'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{categoria.nombre}</h3>
                    <p className="text-sm text-gray-500">{categoria.descripcion}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Productos en categoría</span>
                  <span className="text-lg font-bold text-blue-600">{categoria.cantidad}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((categoria.cantidad / 10) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => manejarEditar(categoria)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => manejarEliminar(categoria.id)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                  disabled={categoria.cantidad > 0}
                  title={categoria.cantidad > 0 ? 'No se puede eliminar una categoría con productos' : 'Eliminar categoría'}
                >
                  🗑️ Eliminar
                </button>
              </div>
              
              {categoria.cantidad > 0 && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  ⚠️ No se puede eliminar mientras tenga productos
                </p>
              )}
            </div>
          </div>
        ))}

        {categorias.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
            <p className="text-6xl mb-4">📂</p>
            <p className="text-xl font-semibold">No hay categorías creadas</p>
            <p className="text-sm mt-2">Crea tu primera categoría para organizar los productos</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-800">
                {categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}
              </h2>
              <button
                onClick={cerrarModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={manejarSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre de la Categoría *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={manejarCambioFormulario}
                  required
                  placeholder="Ej: Rifles, Pistolas, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="descripcion"
                  value={formulario.descripcion}
                  onChange={manejarCambioFormulario}
                  required
                  rows="4"
                  placeholder="Describe brevemente esta categoría..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                >
                  {categoriaEditando ? 'Actualizar' : 'Crear Categoría'}
                </button>
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
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