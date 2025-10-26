// data/AdminData.js - Sistema de gestión de datos para el panel administrativo
import { productos } from './Productos';

// ============================================
// DATOS INICIALES
// ============================================

let adminData = {
  productos: [...productos], // Copia de productos originales
  
  categorias: [
    { id: 1, nombre: "Rifle", descripcion: "Rifles de asalto y tácticos", cantidad: 0 },
    { id: 2, nombre: "Pistola", descripcion: "Pistolas y armas cortas", cantidad: 0 },
    { id: 3, nombre: "Subfusil", descripcion: "Subfusiles y SMG", cantidad: 0 },
    { id: 4, nombre: "LMG", descripcion: "Ametralladoras ligeras", cantidad: 0 },
    { id: 5, nombre: "Escopeta", descripcion: "Escopetas tácticas", cantidad: 0 },
    { id: 6, nombre: "Sniper", descripcion: "Rifles de precisión", cantidad: 0 }
  ],
  
  ordenes: [
    {
      id: 1001,
      cliente: { id: 1, nombre: "Juan Pérez", email: "juan.perez@example.com", run: "12.345.678-9" },
      productos: [
        { id: 1, nombre: "M4A1 Carbine", cantidad: 1, precio: 150000 }
      ],
      total: 150000,
      estado: "Completado",
      fecha: "2024-10-20",
      direccion: "Av. Libertador Bernardo O'Higgins 1234, Santiago"
    },
    {
      id: 1002,
      cliente: { id: 2, nombre: "María González", email: "maria.gonzalez@example.com", run: "11.222.333-4" },
      productos: [
        { id: 3, nombre: "Glock 17", cantidad: 1, precio: 60000 },
        { id: 8, nombre: "MP5 Submachine Gun", cantidad: 1, precio: 100000 }
      ],
      total: 160000,
      estado: "Pendiente",
      fecha: "2024-10-25",
      direccion: "Calle San Martín 567, Providencia"
    },
    {
      id: 1003,
      cliente: { id: 3, nombre: "Carlos López", email: "carlos.lopez@example.com", run: "10.987.654-3" },
      productos: [
        { id: 11, nombre: "Rifle L96 AWS", cantidad: 1, precio: 220000 }
      ],
      total: 220000,
      estado: "Enviado",
      fecha: "2024-10-24",
      direccion: "Av. Apoquindo 789, Las Condes"
    }
  ],
  
  usuarios: [
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      run: "12.345.678-9",
      rol: "Cliente",
      fechaRegistro: "2024-01-15",
      totalOrdenes: 3,
      totalGastado: 450000,
      estado: "Activo"
    },
    {
      id: 2,
      nombre: "María González",
      email: "maria.gonzalez@example.com",
      run: "11.222.333-4",
      rol: "Cliente",
      fechaRegistro: "2024-02-20",
      totalOrdenes: 2,
      totalGastado: 320000,
      estado: "Activo"
    },
    {
      id: 3,
      nombre: "Carlos López",
      email: "carlos.lopez@example.com",
      run: "10.987.654-3",
      rol: "Cliente",
      fechaRegistro: "2024-03-10",
      totalOrdenes: 1,
      totalGastado: 220000,
      estado: "Activo"
    },
    {
      id: 4,
      nombre: "Admin User",
      email: "admin@airsoftstore.com",
      run: "9.876.543-2",
      rol: "Administrador",
      fechaRegistro: "2024-01-01",
      totalOrdenes: 0,
      totalGastado: 0,
      estado: "Activo"
    }
  ]
};

// ============================================
// FUNCIONES CRUD PARA PRODUCTOS
// ============================================

export const obtenerTodosProductos = () => {
  return [...adminData.productos];
};

export const obtenerProductoPorId = (id) => {
  return adminData.productos.find(p => p.id === parseInt(id));
};

export const crearProducto = (productoData) => {
  const nuevoId = Math.max(...adminData.productos.map(p => p.id), 0) + 1;
  const nuevoProducto = {
    id: nuevoId,
    slug: productoData.nombre.toLowerCase().replace(/\s+/g, '-'),
    ...productoData,
    estadisticas: productoData.estadisticas || { 
      daño: 0, alcance: 0, cadencia: 0, precision: 0, movilidad: 0, capacidad: 0 
    }
  };
  adminData.productos.push(nuevoProducto);
  actualizarConteoCategoria();
  return nuevoProducto;
};

export const actualizarProducto = (id, productoData) => {
  const index = adminData.productos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    adminData.productos[index] = { 
      ...adminData.productos[index], 
      ...productoData,
      id: parseInt(id)
    };
    actualizarConteoCategoria();
    return adminData.productos[index];
  }
  return null;
};

export const eliminarProducto = (id) => {
  const index = adminData.productos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    const eliminado = adminData.productos.splice(index, 1)[0];
    actualizarConteoCategoria();
    return eliminado;
  }
  return null;
};

// ============================================
// FUNCIONES CRUD PARA CATEGORÍAS
// ============================================

export const obtenerTodasCategorias = () => {
  actualizarConteoCategoria();
  return [...adminData.categorias];
};

export const obtenerCategoriaPorId = (id) => {
  return adminData.categorias.find(c => c.id === parseInt(id));
};

export const crearCategoria = (categoriaData) => {
  const nuevoId = Math.max(...adminData.categorias.map(c => c.id), 0) + 1;
  const nuevaCategoria = {
    id: nuevoId,
    ...categoriaData,
    cantidad: 0
  };
  adminData.categorias.push(nuevaCategoria);
  return nuevaCategoria;
};

export const actualizarCategoria = (id, categoriaData) => {
  const index = adminData.categorias.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    adminData.categorias[index] = { 
      ...adminData.categorias[index],
      ...categoriaData,
      id: parseInt(id)
    };
    return adminData.categorias[index];
  }
  return null;
};

export const eliminarCategoria = (id) => {
  const categoria = adminData.categorias.find(c => c.id === parseInt(id));
  if (categoria && categoria.cantidad > 0) {
    throw new Error(`No se puede eliminar la categoría "${categoria.nombre}" porque tiene ${categoria.cantidad} productos asociados.`);
  }
  const index = adminData.categorias.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    return adminData.categorias.splice(index, 1)[0];
  }
  return null;
};

// ============================================
// FUNCIONES PARA ÓRDENES
// ============================================

export const obtenerTodasOrdenes = () => {
  return [...adminData.ordenes].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
};

export const obtenerOrdenPorId = (id) => {
  return adminData.ordenes.find(o => o.id === parseInt(id));
};

export const actualizarEstadoOrden = (id, nuevoEstado) => {
  const index = adminData.ordenes.findIndex(o => o.id === parseInt(id));
  if (index !== -1) {
    adminData.ordenes[index].estado = nuevoEstado;
    return adminData.ordenes[index];
  }
  return null;
};

export const crearOrden = (ordenData) => {
  const nuevoId = Math.max(...adminData.ordenes.map(o => o.id), 1000) + 1;
  const nuevaOrden = {
    id: nuevoId,
    ...ordenData,
    fecha: new Date().toISOString().split('T')[0]
  };
  adminData.ordenes.unshift(nuevaOrden);
  return nuevaOrden;
};

// ============================================
// FUNCIONES PARA USUARIOS
// ============================================

export const obtenerTodosUsuarios = () => {
  return [...adminData.usuarios];
};

export const obtenerUsuarioPorId = (id) => {
  return adminData.usuarios.find(u => u.id === parseInt(id));
};

export const actualizarUsuario = (id, usuarioData) => {
  const index = adminData.usuarios.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    adminData.usuarios[index] = { 
      ...adminData.usuarios[index], 
      ...usuarioData,
      id: parseInt(id)
    };
    return adminData.usuarios[index];
  }
  return null;
};

export const cambiarEstadoUsuario = (id, nuevoEstado) => {
  const index = adminData.usuarios.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    adminData.usuarios[index].estado = nuevoEstado;
    return adminData.usuarios[index];
  }
  return null;
};

// ============================================
// FUNCIONES PARA ESTADÍSTICAS
// ============================================

export const obtenerEstadisticas = () => {
  const totalIngresos = adminData.ordenes
    .filter(o => o.estado === "Completado")
    .reduce((sum, orden) => sum + orden.total, 0);
  
  const totalOrdenes = adminData.ordenes.length;
  const totalProductos = adminData.productos.length;
  const totalClientes = adminData.usuarios.filter(u => u.rol === "Cliente").length;
  
  const ordenesPendientes = adminData.ordenes.filter(o => o.estado === "Pendiente").length;
  const ordenesEnviadas = adminData.ordenes.filter(o => o.estado === "Enviado").length;
  
  return {
    totalIngresos,
    totalOrdenes,
    totalProductos,
    totalClientes,
    ordenesPendientes,
    ordenesEnviadas
  };
};

export const obtenerVentasPorDia = () => {
  // Simular ventas de los últimos 7 días
  const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  return dias.map(dia => ({
    dia,
    ventas: Math.floor(Math.random() * 300000) + 100000
  }));
};

export const obtenerProductosMasVendidos = () => {
  return adminData.productos
    .sort((a, b) => (b.cantidad || 0) - (a.cantidad || 0))
    .slice(0, 5)
    .map(p => ({
      nombre: p.nombre,
      ventas: Math.floor(Math.random() * 50) + 10,
      img: p.img
    }));
};

export const obtenerProductosStockBajo = () => {
  return adminData.productos.filter(p => p.cantidad < 15);
};

// ============================================
// FUNCIONES DE BÚSQUEDA Y FILTRADO
// ============================================

export const buscarProductos = (query, filtros = {}) => {
  let resultados = [...adminData.productos];
  
  // Búsqueda por texto
  if (query) {
    const queryLower = query.toLowerCase();
    resultados = resultados.filter(p => 
      p.nombre.toLowerCase().includes(queryLower) ||
      p.desc.toLowerCase().includes(queryLower) ||
      p.tipo.toLowerCase().includes(queryLower)
    );
  }
  
  // Filtro por categoría/tipo
  if (filtros.tipo) {
    resultados = resultados.filter(p => p.tipo.toLowerCase() === filtros.tipo.toLowerCase());
  }
  
  // Filtro por stock bajo
  if (filtros.stockBajo) {
    resultados = resultados.filter(p => p.cantidad < 15);
  }
  
  // Filtro por rango de precio
  if (filtros.precioMin) {
    resultados = resultados.filter(p => p.precio >= parseFloat(filtros.precioMin));
  }
  if (filtros.precioMax) {
    resultados = resultados.filter(p => p.precio <= parseFloat(filtros.precioMax));
  }
  
  return resultados;
};

export const buscarOrdenes = (query) => {
  if (!query) return obtenerTodasOrdenes();
  
  const queryLower = query.toLowerCase();
  return adminData.ordenes.filter(o => 
    o.id.toString().includes(query) ||
    o.cliente.nombre.toLowerCase().includes(queryLower) ||
    o.cliente.email.toLowerCase().includes(queryLower) ||
    o.estado.toLowerCase().includes(queryLower)
  );
};

export const buscarUsuarios = (query) => {
  if (!query) return obtenerTodosUsuarios();
  
  const queryLower = query.toLowerCase();
  return adminData.usuarios.filter(u => 
    u.nombre.toLowerCase().includes(queryLower) ||
    u.email.toLowerCase().includes(queryLower) ||
    u.run.includes(query)
  );
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

const actualizarConteoCategoria = () => {
  adminData.categorias.forEach(categoria => {
    categoria.cantidad = adminData.productos.filter(
      p => p.tipo.toLowerCase() === categoria.nombre.toLowerCase()
    ).length;
  });
};

// Inicializar conteos
actualizarConteoCategoria();