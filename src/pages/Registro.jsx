import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarCliente } from "../service/ClientesService";
import icon01 from "../assets/icon_01.png";

function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    const nuevoCliente = {
      nombre,
      apellido,
      correo,
      direccion: "No definido",
      clave,
      telefono: "No definido",
      fecha_registro: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };

    try {
      await registrarCliente(nuevoCliente);
      setMensaje("✅ Registro exitoso");
      navigate("/login");

    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al registrar usuario");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-sans">
      <img src={icon01} alt="Logo" className="w-20 h-20 mb-4" />
      <h2 className="text-3xl font-bold mb-6">Registro</h2>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Crear Cuenta</h3>

        <form onSubmit={handleRegistro} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Registrarse
          </button>

          <p className="text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </p>

          <p className="text-center text-green-600 font-semibold mt-2">
            {mensaje}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registro;

