import category1 from '../assets/categorias/cat_01.png';
import category2 from '../assets/categorias/cat_02.png';
import category3 from '../assets/categorias/cat_03.png';
import category4 from '../assets/categorias/cat_04.png';
import category5 from '../assets/categorias/cat_05.png';


function Category_panel(){
    return(
        <div className='p-2'>
            <h2 className='font-bold text-center text-3xl'>
                CATEGORIAS
            </h2>
            <div className='flex flex-wrap justify-center p-2'>
                <a href="#">
                    <img src={category1} alt="" className='h-55 hover:scale-105 transition'/>
                </a>
                <a href="#">
                    <img src={category2} alt="" className='h-55 hover:scale-105 transition'/>
                </a>
                <a href="#">
                    <img src={category3} alt="" className='h-55 hover:scale-105 transition'/>
                </a>
                <a href="#">
                    <img src={category4} alt="" className='h-55 hover:scale-105 transition'/>
                </a>
                <a href="#">
                    <img src={category5} alt="" className='h-55 hover:scale-105 transition'/>
                </a>
            </div>
        </div>
    )
}

export default Category_panel;