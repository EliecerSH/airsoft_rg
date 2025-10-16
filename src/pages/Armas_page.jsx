import img_1 from '../assets/img_01.jpg';
import Productos from '../component/Productos.jsx';
import '../script_producto.js';

function Armas_pages(){

    return(
        <div>
            <div className="relative">
                <img src={img_1} alt="" className='w-full h-[250px] object-cover brightness-75'/>
                <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-6'>
                    <h2 className='text-4xl font-extrabold text-white drop-shadow-lg'>
                        Tu tienda online de Airsoft
                    </h2>
                    <p className='mt-3 max-w-2xl text-lg text-gray-200'>
                        Réplicas, accesorios y equipamiento para que vivas la adrenalina, estrategia y acción del airsoft. 
                        Productos de calidad para principiantes y jugadores experimentados.
                    </p>
                </div>
            </div>
            <div className='container mx-auto py-10 px-4'>
                <h2 className='text-2xl font-bold text-center mb-8 border-b-4 border-neutral-700 inline-block pb-2'>
                    Productos: Armas
                </h2>
                <Productos></Productos>
            </div>
        </div>
    )
}

export default Armas_pages;