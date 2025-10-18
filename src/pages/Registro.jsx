import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon01 from "../assets/icon_01.png";

function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    region: "",
    comuna: "",
  });

  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMensaje("⚠️ Las contraseñas no coinciden");
      return;
    }

    const nuevoUsuario = {
      nombre: form.nombre,
      email: form.email,
      password: form.password,
      telefono: form.telefono,
      region: form.region,
      comuna: form.comuna,
    };

    localStorage.setItem("user_registrado", JSON.stringify(nuevoUsuario));
    setMensaje("✅ Registro exitoso");
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-sans">
      <img src={icon01} alt="Logo" className="w-20 h-20 mb-4" />
      <h2 className="text-3xl font-bold mb-6">Registro de Usuario</h2>

      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
          />
          <button
            type="submit"
            className="w-full bg-neutral-700 hover:bg-neutral-900 text-white py-2 rounded-lg transition"
          >
            Registrar
          </button>
          <p className="text-center text-green-600">{mensaje}</p>
        </form>
      </div>
    </div>
  );
}

export default Registro;
