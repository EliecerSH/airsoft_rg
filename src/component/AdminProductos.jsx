// component/AdminProductos.jsx
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
          <p className="text-gray-600 mt-1">Administra el catálogo de armas de airsoft</p>
        </div>
        <button
          onClick={abrirModal}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Nuevo Producto
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="🔍 Buscar productos por nombre, descripción o tipo..."
              value={busqueda}
              onChange={manejarBusqueda}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filtroCategoria}
            onChange={manejarFiltroCategoria}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.nombre.toLowerCase()}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-semibold">{productos.length}</span> productos
          </p>
          <button
            onClick={() => {
              setBusqueda('');
              setFiltroCategoria('');
              cargarProductos();
            }}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="text-gray-400 text-lg">
                      <p className="text-4xl mb-2">📦</p>
                      <p>No se encontraron productos</p>
                    </div>
                  </td>
                </tr>
              ) : (
                productos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={producto.img}
                          alt={producto.nombre}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{producto.nombre}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{producto.desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 capitalize">
                        {producto.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800">
                        ${producto.precio.toLocaleString('es-CL')}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        producto.cantidad < 10 ? 'bg-red-100 text-red-700' :
                        producto.cantidad < 20 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {producto.cantidad} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => manejarEditar(producto)}
                        className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors mr-2"
                        title="Editar"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => manejarEliminar(producto.id)}
                        className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Eliminar"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {productoEditando ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={cerrarModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={manejarSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambioFormulario}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría *</label>
                  <select
                    name="tipo"
                    value={formulario.tipo}
                    onChange={manejarCambioFormulario}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Seleccionar...</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.nombre.toLowerCase()}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Precio (CLP) *</label>
                  <input
                    type="number"
                    name="precio"
                    value={formulario.precio}
                    onChange={manejarCambioFormulario}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formulario.cantidad}
                    onChange={manejarCambioFormulario}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción *</label>
                <textarea
                  name="desc"
                  value={formulario.desc}
                  onChange={manejarCambioFormulario}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">URL de Imagen *</label>
                <input
                  type="text"
                  name="img"
                  value={formulario.img}
                  onChange={manejarCambioFormulario}
                  required
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ventajas (separadas por comas)
                </label>
                <input
                  type="text"
                  name="ventajas"
                  value={formulario.ventajas}
                  onChange={manejarCambioFormulario}
                  placeholder="Ligero, Preciso, Duradero"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Desventajas (separadas por comas)
                </label>
                <input
                  type="text"
                  name="desventajas"
                  value={formulario.desventajas}
                  onChange={manejarCambioFormulario}
                  placeholder="Pesado, Ruidoso"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Uso Recomendado</label>
                <input
                  type="text"
                  name="uso_recomendado"
                  value={formulario.uso_recomendado}
                  onChange={manejarCambioFormulario}
                  placeholder="CQB, Largas distancias, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notas</label>
                <textarea
                  name="notas"
                  value={formulario.notas}
                  onChange={manejarCambioFormulario}
                  rows="2"
                  placeholder="Información adicional sobre el producto..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
                >
                  {productoEditando ? 'Actualizar Producto' : 'Crear Producto'}
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