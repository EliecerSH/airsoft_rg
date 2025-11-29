import React, { useState, useEffect, useContext } from "react";
import Input from "./Input";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { obtenerProductosCompletos } from "../service/productosService";

export default function PagoForm() {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito } = useContext(CarritoContext);

  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    tarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  const API_COMPRA = "https://carrito-compra-pedido-arg.onrender.com/api/v1/compra";

  // ----------------------------------------
  // 1️⃣ Cargar lista completa de productos
  // ----------------------------------------
  useEffect(() => {
    const fetchProductos = async () => {
      const res = await obtenerProductosCompletos();
      setProductos(res);
    };

    fetchProductos();
  }, []);

  // -----------------------------------------------------------
  // 2️⃣ Combinar carrito + productos reales (precio, nombre)
  // -----------------------------------------------------------
  const carritoConDatos = carrito.map((item) => {
    const prod = productos.find((p) => p.id === item.id_producto);
    return {
      ...item,
      nombre: prod?.nombre || `Producto #${item.id_producto}`,
      precio: prod?.precio || 0,
    };
  });

  // ----------------------------------------
  // 3️⃣ Cálculo total + IVA (19%)
  // ----------------------------------------
  const subtotal = carritoConDatos.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  // ----------------------------------------
  // 4️⃣ Obtener id_usuario desde localStorage
  // ----------------------------------------
  const usuarioGuardado =
    JSON.parse(localStorage.getItem("id_cliente")) || null;

  const clienteId = usuarioGuardado?.id_cliente ?? 14;

  // ----------------------------------------
  // 5️⃣ Manejar inputs
  // ----------------------------------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ----------------------------------------
  // 6️⃣ Enviar compra al backend
  // ----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(form).some((v) => v.trim() === "")) {
      alert("Debes completar todos los campos.");
      return;
    }

    try {
      const compra = {
        id_carrito: carrito[0]?.id_carrito || 0,
        id_cliente: clienteId,
        direccion_envio: form.direccion,
        id_metodo_pago: 1,
        id_metodo_envio: 2,
        fecha_compra: new Date().toISOString().split("T")[0],
        total: total,
      };

      await axios.post(API_COMPRA, compra);

      alert("Pago realizado con éxito. Gracias por tu compra.");
      vaciarCarrito();
      navigate("/");

    } catch (err) {
      console.error("Error al realizar la compra:", err);
      alert("Error al procesar la compra.");
    }
  };

  // -----------------------------------------------------
  // 7️⃣ Render del formulario
  // -----------------------------------------------------
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* DATOS DEL COMPRADOR */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-neutral-800">
          Datos del comprador
        </h2>

        <Input
          label="Nombre completo"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <Input
          label="Correo electrónico"
          name="correo"
          type="email"
          value={form.correo}
          onChange={handleChange}
        />

        <Input
          label="Dirección de envío"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
        />
      </div>

      {/* DATOS DE TARJETA */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-neutral-800">
          Datos de la tarjeta
        </h2>

        <Input
          label="Número de tarjeta"
          name="tarjeta"
          placeholder="xxxx xxxx xxxx xxxx"
          value={form.tarjeta}
          onChange={handleChange}
        />

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
      </div>

      {/* TOTAL */}
      <div className="border-t pt-4 space-y-2">
        <p className="text-lg font-semibold text-gray-800">
          Subtotal:{" "}
          <span className="text-emerald-600">
            ${subtotal.toLocaleString()} CLP
          </span>
        </p>

        <p className="text-lg font-semibold text-gray-800">
          IVA (19%):{" "}
          <span className="text-emerald-600">
            ${iva.toFixed(0).toLocaleString()} CLP
          </span>
        </p>

        <p className="text-xl font-bold text-gray-900">
          Total con IVA:{" "}
          <span className="text-emerald-700">
            ${total.toFixed(0).toLocaleString()} CLP
          </span>
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


