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

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};


    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(form.nombre)) {
      nuevosErrores.nombre = "Ingresa un nombre válido (solo letras, mínimo 3 caracteres).";
    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      nuevosErrores.correo = "Correo electrónico no válido.";
    }


    if (form.direccion.trim().length < 5) {
      nuevosErrores.direccion = "La dirección debe tener al menos 5 caracteres.";
    }


    if (!/^\d{16}$/.test(form.tarjeta.replace(/\s+/g, ""))) {
      nuevosErrores.tarjeta = "El número de tarjeta debe tener 16 dígitos.";
    }


    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.vencimiento)) {
      nuevosErrores.vencimiento = "Formato inválido. Usa MM/AA.";
    } else {
      const [mes, año] = form.vencimiento.split("/").map(Number);
      const fechaActual = new Date();
      const añoActual = Number(fechaActual.getFullYear().toString().slice(-2));
      const mesActual = fechaActual.getMonth() + 1;
      if (año < añoActual || (año === añoActual && mes < mesActual)) {
        nuevosErrores.vencimiento = "La tarjeta está vencida.";
      }
    }

    // CVV: 3 o 4 dígitos
    if (!/^\d{3,4}$/.test(form.cvv)) {
      nuevosErrores.cvv = "El CVV debe tener 3 o 4 dígitos.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

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

    const comprasPrevias = JSON.parse(localStorage.getItem("compras")) || [];
    comprasPrevias.push(compra);
    localStorage.setItem("compras", JSON.stringify(comprasPrevias));

    toast.success("Pago realizado con éxito. ¡Gracias por tu compra!");

    vaciarCarrito();
    navigate("/");
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-3 text-neutral-800">Datos del comprador</h2>
        <Input
          label="Nombre completo"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}

        <Input
          label="Correo electrónico"
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
        />
        {errores.correo && <p className="text-red-500 text-sm">{errores.correo}</p>}

        <Input
          label="Dirección de envío"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
        />
        {errores.direccion && <p className="text-red-500 text-sm">{errores.direccion}</p>}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 text-neutral-800">Datos de la tarjeta</h2>
        <Input
          label="Número de tarjeta"
          name="tarjeta"
          placeholder="1111 2222 3333 4444"
          value={form.tarjeta}
          onChange={handleChange}
        />
        {errores.tarjeta && <p className="text-red-500 text-sm">{errores.tarjeta}</p>}

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Vencimiento"
            name="vencimiento"
            placeholder="MM/AA"
            value={form.vencimiento}
            onChange={handleChange}
          />
          <Input
            label="CVV"
            name="cvv"
            type="password"
            value={form.cvv}
            onChange={handleChange}
          />
        </div>
        {errores.vencimiento && <p className="text-red-500 text-sm">{errores.vencimiento}</p>}
        {errores.cvv && <p className="text-red-500 text-sm">{errores.cvv}</p>}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <p className="text-lg font-semibold text-gray-800">
          Total a pagar:{" "}
          <span className="text-emerald-600">${total.toLocaleString()} CLP</span>
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


