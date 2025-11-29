import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const API_URL = "https://carrito-compra-pedido-arg.onrender.com/api/v1/carrito";

  const [carrito, setCarrito] = useState([]);
  const [idCarrito, setIdCarrito] = useState(null);

  const defaultClienteId = 14; // si no hay usuario logueado

  // 1️⃣ Cargar carrito activo al iniciar
  useEffect(() => {
    cargarCarritoActivo();
  }, []);

  const cargarCarritoActivo = async () => {
    try {
      // obtener todos los carritos
      const res = await axios.get(API_URL);
      // buscar carrito activo del cliente
      let cart = res.data.find(c => c.id_cliente === defaultClienteId && c.estado === "activo");

      if (!cart) {
        // si no hay carrito activo, crear uno
        const nuevoCarrito = {
          id_cliente: defaultClienteId,
          fecha_creacion: new Date().toISOString().split("T")[0], // YYYY-MM-DD
          estado: "activo"
        };
        const crear = await axios.post(API_URL, nuevoCarrito);
        cart = crear.data;
      }

      setIdCarrito(cart.id_carrito);
      cargarCarritoDetalle(cart.id_carrito);

    } catch (err) {
      console.error("Error cargando carrito activo:", err);
    }
  };

  // 2️⃣ Cargar detalles del carrito
  const cargarCarritoDetalle = async (idCarrito) => {
    try {
      const res = await axios.get(`${API_URL}/detalle`);
      const detalle = res.data.filter(d => d.id_carrito === idCarrito);
      setCarrito(detalle);
    } catch (e) {
      console.error("Error cargando detalle:", e);
    }
  };

  // 3️⃣ Agregar producto
  const agregarAlCarrito = async (item) => {
    try {
      if (!idCarrito) {
        await cargarCarritoActivo(); // asegurarse de tener un carrito
      }

      const payload = {
        id_carrito: idCarrito,
        id_producto: item.id,
        cantidad: 1
      };

      await axios.post(`${API_URL}/detalle`, payload);
      cargarCarritoDetalle(idCarrito);

    } catch (err) {
      console.error("Error agregando producto:", err);
    }
  };

  const eliminarDelCarrito = async (idDetalle) => {
  try {
    await axios.delete(`${API_URL}/detalle/${idDetalle}`);
    cargarCarritoDetalle(idCarrito);
  } catch (err) {
    console.error("Error eliminando producto:", err.response?.data || err);
    alert(err.response?.data?.message || "Error eliminando producto");
  }
};


  // 5️⃣ Vaciar carrito completo
  const vaciarCarrito = async () => {
    try {
      const detalles = await axios.get(`${API_URL}/detalle`);
      const items = detalles.data.filter(d => d.id_carrito === idCarrito);

      for (let item of items) {
        await axios.delete(`${API_URL}/detalle/${item.id_detalle}`);
      }

      setCarrito([]);
    } catch (err) {
      console.error("Error vaciando carrito:", err);
    }
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
};

