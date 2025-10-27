import React, { useState, useContext } from "react";
import Input from "./Input";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PagoForm() {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito } = useContext(CarritoContext);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    tarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => v.trim() === "")) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // funcin para generarla compra
    const compra = {
      id: Date.now(),
      comprador: {
        nombre: form.nombre,
        correo: form.correo,
        direccion: form.direccion,
      },
      productos: carrito,
      total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
      fecha: new Date().toLocaleString(),
    };

    // Obtener compras previas desde localStorage
    const comprasPrevias = JSON.parse(localStorage.getItem("compras")) || [];

    // Agregar la nueva compra
    comprasPrevias.push(compra);

    // Guardar en localStorage
    localStorage.setItem("compras", JSON.stringify(comprasPrevias));

    // Confirmación visual
    toast.success("Pago realizado con éxito. ¡Gracias por tu compra!");

    // Vaciar carrito y volver al inicio
    vaciarCarrito();
    navigate("/");
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-3 text-neutral-800">Datos del comprador</h2>
        <Input label="Nombre completo" name="nombre" value={form.nombre} onChange={handleChange} />
        <Input label="Correo electrónico" name="correo" type="email" value={form.correo} onChange={handleChange} />
        <Input label="Dirección de envío" name="direccion" value={form.direccion} onChange={handleChange} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 text-neutral-800">Datos de la tarjeta</h2>
        <Input label="Número de tarjeta" name="tarjeta" placeholder="xxxx xxxx xxxx xxxx" value={form.tarjeta} onChange={handleChange} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Vencimiento" name="vencimiento" placeholder="MM/AA" value={form.vencimiento} onChange={handleChange} />
          <Input label="CVV" name="cvv" type="password" value={form.cvv} onChange={handleChange} />
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <p className="text-lg font-semibold text-gray-800">
          Total a pagar: <span className="text-emerald-600">${total.toLocaleString()} CLP</span>
        </p>
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
        >
          Confirmar pago
        </button>
      </div>
    </form>
  );
}

