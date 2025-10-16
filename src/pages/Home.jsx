import img_1 from '../assets/img_01.jpg';
import Category_panel from '../component/Category_panel';


function Home(){

    return(
        <div>
            <div className='relative'>
                <img src={img_1} alt="" className='w-full h-[300px] object-cover brightness-60'/>
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
            <Category_panel></Category_panel>
    </div>
    )


}

export default Home;