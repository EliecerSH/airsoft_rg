import icon_1 from "../assets/icon_01.png";
import icon_car from "../assets/carrito_icon.png";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { UserContext } from "../context/UserContext";
import Home from "../pages/Home";
import ArmasPage from "../pages/ArmasPage";
import CarritoPage from "../pages/CarritoPage";
import Login from "../pages/login";
import Registro from "../pages/Registro";
import LoginAdmin from "../pages/LoginAdmin";
import AdminPage from "../pages/AdminPage";
import Productos from "./Productos";
import { ArmaPage } from "../pages/ArmaPage";
import PagoPage from "../pages/PagoPage";

function Hoober_1() {
  const navigate = useNavigate();
  const { carrito } = useContext(CarritoContext);
  const { user, logout } = useContext(UserContext);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="bg-white shadow-md min-h-screen flex flex-col">
      {/* HEADER RESPONSIVE */}
      <header className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-3 px-4 gap-4">
        
        {/* Logo */}
        <Link to="/home" className="flex items-center space-x-2">
          <img src={icon_1} alt="logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold tracking-wide text-center sm:text-left">
            Airsoft Rock Galactic
          </h1>
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          
          {/* Carrito */}
          <button onClick={() => navigate("/carrito")} className="relative">
            <img src={icon_car} alt="carrito" width="30px" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {totalItems}
              </span>
            )}
          </button>

          {/* Usuario */}
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-800 hidden sm:block">
                {user.nombre}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Salir
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-neutral-700 hover:bg-neutral-900 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                Iniciar
              </button>
              <button
                onClick={() => navigate("/registro")}
                className="bg-neutral-700 hover:bg-neutral-900 text-white px-4 py-2 rounded-lg transition text-sm sm:block"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </header>

      {/* NAV RESPONSIVE (scroll en mobile) */}
      <nav className="bg-gray-200 w-full overflow-x-auto">
        <ul className="flex justify-start sm:justify-center space-x-6 py-2 px-4 text-sm font-medium uppercase tracking-wide whitespace-nowrap">
          <li>
            <Link to="/armas" className="hover:text-neutral-700">
              Armas
            </Link>
          </li>
          <li><a href="#" className="hover:text-neutral-700">Vestimenta</a></li>
          <li><a href="#" className="hover:text-neutral-700">Munición</a></li>
          <li><a href="#" className="hover:text-neutral-700">Extras</a></li>
          <li>
            <Link to="/" className="hover:text-neutral-700">
              Contacto
            </Link>
          </li>
        </ul>
      </nav>

      {/* Rutas */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/armas" element={<ArmasPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/homeAdmin" element={<AdminPage />} />
          <Route path="/" element={<Productos />} />
          <Route path="/arma/:id" element={<ArmaPage />} />
          <Route path="/pago" element={<PagoPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default Hoober_1;


