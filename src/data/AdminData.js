// data/AdminData.js - SISTEMA CORREGIDO Y MEJORADO
import { productos } from './Productos.js';

// ============================================
// DATOS INICIALES CORREGIDOS
// ============================================

let adminData = {
  productos: [...productos], // Copia de productos originales
  
  categorias: [
    { id: 1, nombre: "rifle", descripcion: "Rifles de asalto y tácticos", cantidad: 0 },
    { id: 2, nombre: "pistola", descripcion: "Pistolas y armas cortas", cantidad: 0 },
    { id: 3, nombre: "subfusil", descripcion: "Subfusiles y SMG", cantidad: 0 },
    { id: 4, nombre: "lmg", descripcion: "Ametralladoras ligeras", cantidad: 0 },
    { id: 5, nombre: "escopeta", descripcion: "Escopetas tácticas", cantidad: 0 },
    { id: 6, nombre: "sniper", descripcion: "Rifles de precisión", cantidad: 0 }
  ],
  
  ordenes: [
    {
      id: 1001,
      cliente: { 
        id: 1, 
        nombre: "Juan Pérez", 
        email: "juan.perez@example.com", 
        run: "12.345.678-9" 
      },
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
      cliente: { 
        id: 2, 
        nombre: "María González", 
        email: "maria.gonzalez@example.com", 
        run: "11.222.333-4" 
      },
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
      cliente: { 
        id: 3, 
        nombre: "Carlos López", 
        email: "carlos.lopez@example.com", 
        run: "10.987.654-3" 
      },
      productos: [
        { id: 11, nombre: "Rifle L96 AWS", cantidad: 1, precio: 220000 }
      ],
      total: 220000,
      estado: "Enviado",
      fecha: "2024-10-24",
      direccion: "Av. Apoquindo 789, Las Condes"
    },
    {
      id: 1004,
      cliente: { 
        id: 4, 
        nombre: "Ana Rodríguez", 
        email: "ana.rodriguez@example.com", 
        run: "13.456.789-0" 
      },
      productos: [
        { id: 5, nombre: "FN SCAR-L", cantidad: 1, precio: 180000 },
        { id: 3, nombre: "Glock 17", cantidad: 1, precio: 60000 }
      ],
      total: 240000,
      estado: "Completado",
      fecha: "2024-10-23",
      direccion: "Av. Providencia 456, Providencia"
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
      nombre: "Ana Rodríguez",
      email: "ana.rodriguez@example.com",
      run: "13.456.789-0",
      rol: "Cliente",
      fechaRegistro: "2024-04-05",
      totalOrdenes: 2,
      totalGastado: 480000,
      estado: "Activo"
    },
    {
      id: 5,
      nombre: "Admin Principal",
      email: "admin@airsoftrg.com",
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
// FUNCIONES CRUD PARA PRODUCTOS - CORREGIDAS
// ============================================

export const obtenerTodosProductos = () => {
  console.log('🔍 Obteniendo todos los productos:', adminData.productos.length);
  return [...adminData.productos];
};

export const obtenerProductoPorId = (id) => {
  return adminData.productos.find(p => p.id === parseInt(id));
};

export const crearProducto = (productoData) => {
  console.log('➕ Creando producto:', productoData);
  const nuevoId = Math.max(...adminData.productos.map(p => p.id), 0) + 1;
  const nuevoProducto = {
    id: nuevoId,
    slug: productoData.nombre.toLowerCase().replace(/\s+/g, '-'),
    ...productoData,
    estadisticas: productoData.estadisticas || { 
      daño: 50, alcance: 50, cadencia: 50, precision: 50, movilidad: 50, capacidad: 30 
    }
  };
  adminData.productos.push(nuevoProducto);
  actualizarConteoCategoria();
  console.log('✅ Producto creado:', nuevoProducto);
  return nuevoProducto;
};

export const actualizarProducto = (id, productoData) => {
  console.log('✏️ Actualizando producto:', id, productoData);
  const index = adminData.productos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    adminData.productos[index] = { 
      ...adminData.productos[index], 
      ...productoData,
      id: parseInt(id)
    };
    actualizarConteoCategoria();
    console.log('✅ Producto actualizado:', adminData.productos[index]);
    return adminData.productos[index];
  }
  console.log('❌ Producto no encontrado:', id);
  return null;
};

export const eliminarProducto = (id) => {
  console.log('🗑️ Eliminando producto:', id);
  const index = adminData.productos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    const eliminado = adminData.productos.splice(index, 1)[0];
    actualizarConteoCategoria();
    console.log('✅ Producto eliminado:', eliminado);
    return eliminado;
  }
  console.log('❌ Producto no encontrado para eliminar:', id);
  return null;
};

// ============================================
// FUNCIONES CRUD PARA CATEGORÍAS - CORREGIDAS
// ============================================

export const obtenerTodasCategorias = () => {
  actualizarConteoCategoria();
  console.log('📂 Obteniendo categorías:', adminData.categorias);
  return [...adminData.categorias];
};

export const obtenerCategoriaPorId = (id) => {
  return adminData.categorias.find(c => c.id === parseInt(id));
};

export const crearCategoria = (categoriaData) => {
  console.log('➕ Creando categoría:', categoriaData);
  const nuevoId = Math.max(...adminData.categorias.map(c => c.id), 0) + 1;
  const nuevaCategoria = {
    id: nuevoId,
    ...categoriaData,
    cantidad: 0
  };
  adminData.categorias.push(nuevaCategoria);
  console.log('✅ Categoría creada:', nuevaCategoria);
  return nuevaCategoria;
};

export const actualizarCategoria = (id, categoriaData) => {
  console.log('✏️ Actualizando categoría:', id, categoriaData);
  const index = adminData.categorias.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    adminData.categorias[index] = { 
      ...adminData.categorias[index],
      ...categoriaData,
      id: parseInt(id)
    };
    console.log('✅ Categoría actualizada:', adminData.categorias[index]);
    return adminData.categorias[index];
  }
  console.log('❌ Categoría no encontrada:', id);
  return null;
};

export const eliminarCategoria = (id) => {
  console.log('🗑️ Eliminando categoría:', id);
  const categoria = adminData.categorias.find(c => c.id === parseInt(id));
  if (categoria && categoria.cantidad > 0) {
    const error = `No se puede eliminar la categoría "${categoria.nombre}" porque tiene ${categoria.cantidad} productos asociados.`;
    console.log('❌ Error:', error);
    throw new Error(error);
  }
  const index = adminData.categorias.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    const eliminada = adminData.categorias.splice(index, 1)[0];
    console.log('✅ Categoría eliminada:', eliminada);
    return eliminada;
  }
  console.log('❌ Categoría no encontrada para eliminar:', id);
  return null;
};

// ============================================
// FUNCIONES PARA ÓRDENES - CORREGIDAS
// ============================================

export const obtenerTodasOrdenes = () => {
  console.log('📦 Obteniendo todas las órdenes:', adminData.ordenes.length);
  return [...adminData.ordenes].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
};

export const obtenerOrdenPorId = (id) => {
  return adminData.ordenes.find(o => o.id === parseInt(id));
};

export const actualizarEstadoOrden = (id, nuevoEstado) => {
  console.log('🔄 Actualizando estado orden:', id, '→', nuevoEstado);
  const index = adminData.ordenes.findIndex(o => o.id === parseInt(id));
  if (index !== -1) {
    adminData.ordenes[index].estado = nuevoEstado;
    console.log('✅ Estado actualizado:', adminData.ordenes[index]);
    return adminData.ordenes[index];
  }
  console.log('❌ Orden no encontrada:', id);
  return null;
};

export const crearOrden = (ordenData) => {
  console.log('➕ Creando orden:', ordenData);
  const nuevoId = Math.max(...adminData.ordenes.map(o => o.id), 1000) + 1;
  const nuevaOrden = {
    id: nuevoId,
    ...ordenData,
    fecha: new Date().toISOString().split('T')[0]
  };
  adminData.ordenes.unshift(nuevaOrden);
  console.log('✅ Orden creada:', nuevaOrden);
  return nuevaOrden;
};

// ============================================
// FUNCIONES PARA USUARIOS - CORREGIDAS
// ============================================

export const obtenerTodosUsuarios = () => {
  console.log('👥 Obteniendo todos los usuarios:', adminData.usuarios.length);
  return [...adminData.usuarios];
};

export const obtenerUsuarioPorId = (id) => {
  return adminData.usuarios.find(u => u.id === parseInt(id));
};

export const actualizarUsuario = (id, usuarioData) => {
  console.log('✏️ Actualizando usuario:', id, usuarioData);
  const index = adminData.usuarios.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    adminData.usuarios[index] = { 
      ...adminData.usuarios[index], 
      ...usuarioData,
      id: parseInt(id)
    };
    console.log('✅ Usuario actualizado:', adminData.usuarios[index]);
    return adminData.usuarios[index];
  }
  console.log('❌ Usuario no encontrado:', id);
  return null;
};

export const cambiarEstadoUsuario = (id, nuevoEstado) => {
  console.log('🔒 Cambiando estado usuario:', id, '→', nuevoEstado);
  const index = adminData.usuarios.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    adminData.usuarios[index].estado = nuevoEstado;
    console.log('✅ Estado actualizado:', adminData.usuarios[index]);
    return adminData.usuarios[index];
  }
  console.log('❌ Usuario no encontrado:', id);
  return null;
};

// ============================================
// FUNCIONES PARA ESTADÍSTICAS - CORREGIDAS
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
  
  const stats = {
    totalIngresos,
    totalOrdenes,
    totalProductos,
    totalClientes,
    ordenesPendientes,
    ordenesEnviadas
  };
  
  console.log('📊 Estadísticas obtenidas:', stats);
  return stats;
};
export const obtenerVentasPorDia = () => {
  const ventasReales = {
    'Lun': 0,
    'Mar': 0, 
    'Mié': 0,
    'Jue': 0,
    'Vie': 0,
    'Sáb': 0,
    'Dom': 0
  };
  adminData.ordenes.forEach(orden => {
    const fecha = new Date(orden.fecha);
    const diaSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][fecha.getDay()];
    
    if (ventasReales.hasOwnProperty(diaSemana)) {
      ventasReales[diaSemana] += orden.total;
    }
  });

  const tieneDatosReales = Object.values(ventasReales).some(valor => valor > 0);
  
  if (!tieneDatosReales) {
    return [
      { dia: 'Lun', ventas: 280000 },
      { dia: 'Mar', ventas: 420000 },
      { dia: 'Mié', ventas: 350000 },
      { dia: 'Jue', ventas: 510000 },
      { dia: 'Vie', ventas: 480000 },
      { dia: 'Sáb', ventas: 320000 },
      { dia: 'Dom', ventas: 190000 }
    ];
  }

  const ventas = Object.entries(ventasReales).map(([dia, ventas]) => ({
    dia,
    ventas
  }));

  console.log('📈 Ventas por día (REALES):', ventas);
  return ventas;
};

export const obtenerProductosMasVendidos = () => {
  const topProductos = adminData.productos
    .sort((a, b) => (b.cantidad || 0) - (a.cantidad || 0))
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      nombre: p.nombre,
      ventas: Math.floor(Math.random() * 50) + 10,
      img: p.img,
      precio: p.precio
    }));
  console.log('🏆 Productos más vendidos:', topProductos);
  return topProductos;
};

export const obtenerProductosStockBajo = () => {
  const stockBajo = adminData.productos.filter(p => p.cantidad < 10);
  console.log('⚠️ Productos con stock bajo:', stockBajo.length);
  return stockBajo;
};

// ============================================
// FUNCIONES DE BÚSQUEDA Y FILTRADO - CORREGIDAS
// ============================================

export const buscarProductos = (query, filtros = {}) => {
  console.log('🔍 Buscando productos:', query, filtros);
  let resultados = [...adminData.productos];
  
  // Búsqueda por texto
  if (query && query.trim() !== '') {
    const queryLower = query.toLowerCase();
    resultados = resultados.filter(p => 
      p.nombre.toLowerCase().includes(queryLower) ||
      p.desc.toLowerCase().includes(queryLower) ||
      p.tipo.toLowerCase().includes(queryLower)
    );
  }
  
  // Filtro por categoría/tipo
  if (filtros.tipo && filtros.tipo.trim() !== '') {
    resultados = resultados.filter(p => p.tipo.toLowerCase() === filtros.tipo.toLowerCase());
  }
  
  console.log('✅ Resultados búsqueda productos:', resultados.length);
  return resultados;
};

export const buscarOrdenes = (query) => {
  console.log('🔍 Buscando órdenes:', query);
  if (!query || query.trim() === '') {
    return obtenerTodasOrdenes();
  }
  
  const queryLower = query.toLowerCase();
  const resultados = adminData.ordenes.filter(o => 
    o.id.toString().includes(query) ||
    o.cliente.nombre.toLowerCase().includes(queryLower) ||
    o.cliente.email.toLowerCase().includes(queryLower) ||
    o.estado.toLowerCase().includes(queryLower)
  );
  
  console.log('✅ Resultados búsqueda órdenes:', resultados.length);
  return resultados;
};

export const buscarUsuarios = (query) => {
  console.log('🔍 Buscando usuarios:', query);
  if (!query || query.trim() === '') {
    return obtenerTodosUsuarios();
  }
  
  const queryLower = query.toLowerCase();
  const resultados = adminData.usuarios.filter(u => 
    u.nombre.toLowerCase().includes(queryLower) ||
    u.email.toLowerCase().includes(queryLower) ||
    u.run.includes(query)
  );
  
  console.log('✅ Resultados búsqueda usuarios:', resultados.length);
  return resultados;
};

// ============================================
// FUNCIONES AUXILIARES - CORREGIDAS
// ============================================

const actualizarConteoCategoria = () => {
  adminData.categorias.forEach(categoria => {
    const cantidad = adminData.productos.filter(
      p => p.tipo.toLowerCase() === categoria.nombre.toLowerCase()
    ).length;
    categoria.cantidad = cantidad;
  });
  console.log('🔄 Conteo categorías actualizado');
};

// Inicializar conteos al cargar
console.log('🚀 Inicializando AdminData...');
actualizarConteoCategoria();
console.log('✅ AdminData inicializado correctamente');

// Exportar todo para debugging
export const getAdminData = () => adminData;