// component/AdminProductos.jsx - VERSION REDISEÑADA
import React, { useState, useEffect } from 'react';
import {
  obtenerTodosProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerTodasCategorias,
  buscarProductos
} from '../data/AdminData';

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    tipo: '',
    precio: '',
    cantidad: '',
    desc: '',
    img: '',
    ventajas: '',
    desventajas: '',
    uso_recomendado: '',
    notas: ''
  });

  useEffect(() => {
    cargarProductos();
    setCategorias(obtenerTodasCategorias());
  }, []);

  const cargarProductos = () => {
    setProductos(obtenerTodosProductos());
  };

  const manejarBusqueda = (e) => {
    const query = e.target.value;
    setBusqueda(query);
    
    const filtros = {};
    if (filtroCategoria) filtros.tipo = filtroCategoria;
    
    const resultados = buscarProductos(query, filtros);
    setProductos(resultados);
  };

  const manejarFiltroCategoria = (e) => {
    const categoria = e.target.value;
    setFiltroCategoria(categoria);
    
    const filtros = categoria ? { tipo: categoria } : {};
    const resultados = buscarProductos(busqueda, filtros);
    setProductos(resultados);
  };

  const manejarCambioFormulario = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    
    const datosProducto = {
      ...formulario,
      precio: parseFloat(formulario.precio),
      cantidad: parseInt(formulario.cantidad),
      ventajas: formulario.ventajas.split(',').map(v => v.trim()).filter(v => v),
      desventajas: formulario.desventajas.split(',').map(d => d.trim()).filter(d => d),
      estadisticas: { daño: 0, alcance: 0, cadencia: 0, precision: 0, movilidad: 0, capacidad: 0 }
    };

    if (productoEditando) {
      actualizarProducto(productoEditando.id, datosProducto);
    } else {
      crearProducto(datosProducto);
    }

    cargarProductos();
    cerrarModal();
  };

  const manejarEditar = (producto) => {
    setProductoEditando(producto);
    setFormulario({
      nombre: producto.nombre,
      tipo: producto.tipo,
      precio: producto.precio,
      cantidad: producto.cantidad,
      desc: producto.desc,
      img: producto.img,
      ventajas: Array.isArray(producto.ventajas) ? producto.ventajas.join(', ') : '',
      desventajas: Array.isArray(producto.desventajas) ? producto.desventajas.join(', ') : '',
      uso_recomendado: producto.uso_recomendado || '',
      notas: producto.notas || ''
    });
    setMostrarModal(true);
  };

  const manejarEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      eliminarProducto(id);
      cargarProductos();
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoEditando(null);
    setFormulario({
      nombre: '',
      tipo: '',
      precio: '',
      cantidad: '',
      desc: '',
      img: '',
      ventajas: '',
      desventajas: '',
      uso_recomendado: '',
      notas: ''
    });
  };

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const obtenerColorStock = (cantidad) => {
    if (cantidad < 5) return 'bg-red-100 text-red-700 border-red-200';
    if (cantidad < 15) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  return (
    <div className="space-y-8">
      {/* Header con Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gestión de Productos
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Administra el catálogo de armas de airsoft</p>
          </div>
          <button
            onClick={abrirModal}
            className="mt-6 lg:mt-0 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
          >
            <span className="text-2xl">+</span>
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Filtros Mejorados */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Buscar productos por nombre, descripción o tipo..."
                value={busqueda}
                onChange={manejarBusqueda}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm text-lg transition-all duration-300"
              />
            </div>
          </div>
          <select
            value={filtroCategoria}
            onChange={manejarFiltroCategoria}
            className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm text-lg transition-all duration-300"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.nombre.toLowerCase()}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg text-gray-600">
            Mostrando <span className="font-bold text-blue-600">{productos.length}</span> productos
          </p>
          <button
            onClick={() => {
              setBusqueda('');
              setFiltroCategoria('');
              cargarProductos();
            }}
            className="px-6 py-3 text-blue-600 hover:text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center gap-2"
          >
            <span>🔄</span>
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Tabla de Productos Mejorada */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-8 py-6 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="text-6xl mb-4">📦</div>
                      <p className="text-2xl font-semibold mb-2">No se encontraron productos</p>
                      <p className="text-lg">Intenta con otros términos de búsqueda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                productos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gradient-to-r from-blue-50/50 to-purple-50/50 transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-6">
                        <img
                          src={producto.img}
                          alt={producto.nombre}
                          className="w-20 h-20 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-lg font-bold text-gray-800 truncate">{producto.nombre}</p>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{producto.desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-200 capitalize">
                        {producto.tipo}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xl font-bold text-gray-800">
                        ${producto.precio.toLocaleString('es-CL')}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 text-sm font-bold rounded-full border ${obtenerColorStock(producto.cantidad)}`}>
                        {producto.cantidad} unidades
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => manejarEditar(producto)}
                          className="px-6 py-3 text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-300 flex items-center gap-2"
                          title="Editar"
                        >
                          <span className="text-lg">✏️</span>
                          Editar
                        </button>
                        <button
                          onClick={() => manejarEliminar(producto.id)}
                          className="px-6 py-3 text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 border-2 border-red-200 hover:border-red-300 flex items-center gap-2"
                          title="Eliminar"
                        >
                          <span className="text-lg">🗑️</span>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Mejorado */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-3xl font-bold">
                {productoEditando ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={cerrarModal}
                className="text-white hover:text-gray-200 text-3xl font-bold transition-colors duration-300"
              >
                ×
              </button>
            </div>

            <form onSubmit={manejarSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambioFormulario}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                    placeholder="Nombre del producto"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">Categoría *</label>
                  <select
                    name="tipo"
                    value={formulario.tipo}
                    onChange={manejarCambioFormulario}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                  >
                    <option value="">Seleccionar categoría...</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.nombre.toLowerCase()}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">Precio (CLP) *</label>
                  <input
                    type="number"
                    name="precio"
                    value={formulario.precio}
                    onChange={manejarCambioFormulario}
                    required
                    min="0"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">Stock *</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formulario.cantidad}
                    onChange={manejarCambioFormulario}
                    required
                    min="0"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">Descripción *</label>
                <textarea
                  name="desc"
                  value={formulario.desc}
                  onChange={manejarCambioFormulario}
                  required
                  rows="3"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300 resize-none"
                  placeholder="Descripción detallada del producto..."
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">URL de Imagen *</label>
                <input
                  type="text"
                  name="img"
                  value={formulario.img}
                  onChange={manejarCambioFormulario}
                  required
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    Ventajas (separadas por comas)
                  </label>
                  <input
                    type="text"
                    name="ventajas"
                    value={formulario.ventajas}
                    onChange={manejarCambioFormulario}
                    placeholder="Ligero, Preciso, Duradero"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    Desventajas (separadas por comas)
                  </label>
                  <input
                    type="text"
                    name="desventajas"
                    value={formulario.desventajas}
                    onChange={manejarCambioFormulario}
                    placeholder="Pesado, Ruidoso"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">Uso Recomendado</label>
                <input
                  type="text"
                  name="uso_recomendado"
                  value={formulario.uso_recomendado}
                  onChange={manejarCambioFormulario}
                  placeholder="CQB, Largas distancias, etc."
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">Notas</label>
                <textarea
                  name="notas"
                  value={formulario.notas}
                  onChange={manejarCambioFormulario}
                  rows="2"
                  placeholder="Información adicional sobre el producto..."
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {productoEditando ? 'Actualizar Producto' : 'Crear Producto'}
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