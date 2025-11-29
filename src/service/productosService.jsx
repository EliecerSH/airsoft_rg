import axios from "axios";

const API_PRODUCTOS = "https://produc-service-arg.onrender.com/api/producto";
const API_DESCRIPCIONES = "https://produc-service-arg.onrender.com/api/producto/descripciones";
const API_CATEGORIAS = "https://produc-service-arg.onrender.com/api/producto/categoria";
const API_STACK = "https://produc-service-arg.onrender.com/api/producto/stack";


// productosService.jsx

const API = "https://produc-service-arg.onrender.com/api/producto";

export async function obtenerProductos() {
  const res = await fetch(API);
  return await res.json();
}

export async function crearProducto(producto) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return await res.json();
}

export async function actualizarProducto(id, producto) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return await res.json();
}

export async function eliminarProducto(id) {
  return await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
}

export async function obtenerProductosCompletos() {
  try {
    const [productosRes, descripcionesRes, categoriasRes, stackRes] = await Promise.all([
      axios.get(API_PRODUCTOS),
      axios.get(API_DESCRIPCIONES),
      axios.get(API_CATEGORIAS),
      axios.get(API_STACK),
    ]);

    const productos = productosRes.data;
    const descripciones = descripcionesRes.data;
    const categorias = categoriasRes.data;
    const stacks = stackRes.data;

    const productosCompletos = productos.map((p) => {
      const desc = descripciones.find((d) => d.id === p.id_descripcion);
      const cat = categorias.find((c) => c.id_categoria === p.id_categoria);
      const stack = stacks.find((s) => s.id_stack === p.id_tack_prod);

      return {
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
        stock: p.stock,
        categoriaNombre: cat?.nombre_categoria || "Sin categoría",
        descripcion: desc?.descripcion || "Sin descripción",
        img: desc?.imagen1 || "",
        estadisticas: {
          dano: stack?.dano || 0,
          alcance: stack?.alcance || 0,
          cadencia: stack?.cadencia || 0,
          presicion: stack?.presicion || 0,
          movilidad: stack?.movilidad || 0,
          capacidad: stack?.capacidad || 0,
        },
        ventajas: desc?.ventaja ? [desc.ventaja] : [],
        desventajas: desc?.desventaja ? [desc.desventaja] : [],
        uso_recomendado: desc?.uso_recomendado || "",
        notas: desc?.nota || "",
      };
    });

    return productosCompletos;
  } catch (err) {
    console.error("Error cargando productos completos:", err);
    return [];
  }
}



