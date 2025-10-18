import icon_1 from "../assets/icon_01.png";
import icon_car from "../assets/carrito_icon.png";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { UserContext } from "../context/UserContext";
import Armas_pages from "../pages/Armas_page";
import Home from "../pages/Home";
import CarritoPage from "../pages/CarritoPage";
import Login from "../pages/login";
import Registro from "../pages/Registro";

function Hoober_1() {
  const navigate = useNavigate();
  const { carrito } = useContext(CarritoContext);
  const { user, logout } = useContext(UserContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="bg-white shadow-md min-h-screen flex flex-col">
      {/* Header */}
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link to="/home" className="flex items-center space-x-2">
          <img src={icon_1} alt="logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold tracking-wide">
            Airsoft Rock Galactic
          </h1>
        </Link>

        <div className="flex items-center space-x-3">
          {/* Carrito */}
          <button onClick={() => navigate("/carrito")} className="relative">
            <img src={icon_car} alt="carrito" width="30px" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {totalItems}
              </span>
            )}
          </button>

          {/* Sesión */}
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-800">{user.nombre}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-neutral-700 hover:bg-neutral-900 text-white px-4 py-2 rounded-lg transition"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => navigate("/registro")}
                className="bg-neutral-700 hover:bg-neutral-900 text-white px-4 py-2 rounded-lg transition"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-gray-200">
        <ul className="flex justify-center space-x-8 py-2 text-sm font-medium uppercase tracking-wide">
          <li>
            <Link to="/armas" className="hover:text-neutral-700">
              Armas
            </Link>
          </li>
          <li><a href="#" className="hover:text-neutral-700">Vestimenta</a></li>
          <li><a href="#" className="hover:text-neutral-700">Munición</a></li>
          <li><a href="#" className="hover:text-neutral-700">Extras</a></li>
          <li><a href="#" className="hover:text-neutral-700">Contacto</a></li>
        </ul>
      </nav>

      {/* Rutas */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/armas" element={<Armas_pages />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </div>
    </div>
  );
}

export default Hoober_1;

