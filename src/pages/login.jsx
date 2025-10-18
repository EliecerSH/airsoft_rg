import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import icon01 from "../assets/icon_01.png";

function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user_registrado"));
    if (!storedUser) {
      setMensaje("⚠️ No hay usuarios registrados");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      login(storedUser);
      setMensaje("✅ Inicio de sesión exitoso");
      navigate("/home");
    } else {
      setMensaje("❌ Credenciales incorrectas");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-sans">
      <img src={icon01} alt="Logo" className="w-20 h-20 mb-4" />
      <h2 className="text-3xl font-bold mb-6">Airsoft Rock Galactic</h2>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Inicio de Sesión</h3>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Correo</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-neutral-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-700 hover:bg-neutral-900 text-white py-2 rounded-lg transition"
          >
            Iniciar sesión
          </button>

          <p className="text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-blue-600 hover:underline">
              Regístrate
            </Link>
          </p>
          <p className="text-center text-red-500">{mensaje}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;

