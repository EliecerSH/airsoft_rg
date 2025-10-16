import icon_1 from '../assets/icon_01.png';
import icon_car from '../assets/carrito_icon.png';
import Armas_pages from '../pages/Armas_page';
import { Routes, Route, Link } from "react-router-dom";
import Home from '../pages/Home';



function Hoober_1(){
    return(
        <div className='bg-white shadow-md'>
            <div className='container mx-auto flex justify-between items-center py-3 px-4'>
                    <Link to="/home" className='flex items-center space-x-2'>
                        <img src={icon_1} alt="" className="w-12 h-12" />
                        <h1 className="text-2xl font-bold tracking-wide">Airsoft Rock Galactic</h1>
                    </Link>
                <div className=' flex space-x-1'>
                    <button onclick="window.location.href='Carrito.html'" className="px-4 py-2"><img src={icon_car} alt="" width="30px"/></button>
                    <button onclick="window.location.href='login_usuario.html'" className="bg-neutral-700 hover:bg-neutral-900 text-white px-4 py-2 rounded-lg transition" id="bt-seccion">Iniciar sesión</button>
                    <button onclick="window.location.href='Registro_usuario.html'" className="bg-neutral-700 hover:bg-neutral-900 text-white px-4 py-2 rounded-lg transition" id="bt-seccion">Registrarse</button>
                </div>
            </div>
            <nav className="bg-gray-200">
                    <ul className="flex wrap-normal justify-center space-x-8 py-2 text-sm font-medium uppercase tracking-wide">
                        <li><Link to="/armas" className="hover:text-neutral-700">Armas</Link></li>
                        <li><a href="#" className="hover:text-neutral-700">Vestimenta</a></li>
                        <li><a href="#" className="hover:text-neutral-700">Munición</a></li>
                        <li><a href="#" className="hover:text-neutral-700">Extras</a></li>
                        <li><a href="contacto.html" className="hover:text-neutral-700">Contacto</a></li>
                        <li><a href="Nosotros.html" className="hover:text-neutral-700">Nosotros</a></li>
                    </ul>
                </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/armas" element={<Armas_pages />} />
            </Routes>
        </div>
    )
}

export default Hoober_1;