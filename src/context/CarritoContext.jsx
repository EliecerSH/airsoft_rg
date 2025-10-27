import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // funcuion para la carga de datos del localStorage
  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(guardado);
  }, []);

  // funcion para guardar los datos en el localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarCarrito = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    toast.success(`${producto.nombre} agregado al carrito`);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarCarrito, eliminarDelCarrito, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
