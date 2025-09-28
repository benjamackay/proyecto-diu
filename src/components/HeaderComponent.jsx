import { FaSearch, FaCog, FaCalendar, FaUser} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";


const HeaderComponent = () =>{
    return(
        <div className="w-full h-auto sticky top-0 bg-white flex-col">

            {/* Contenedor principal*/}
            <div className="flex flex-row justify-center items-center p-3 space-x-16">

                {/* Titulo y logo */}
                <div className="flex flex-row">
                    <p className="font-bold">EvenT</p>
                </div>

                {/* Filtro */}
                <div className="flex flex-row items-center w-1/6 space-x-4 p-2 ring-1 ring-gray-300 focus-within:ring-0 bg-gray-100 border-2 border-transparent rounded-xl focus-within:border-blue-500 focus:ring-2">
                    <FaSearch size={20} color=""/>
                    <input 
                    type="text" 
                    name="" 
                    id="" 
                    placeholder="Buscar eventos..."
                    className=" bg-transparent focus:outline-none" />
                </div>

                {/* Filtros (solo para moviles/ipad)*/}
                <div className="flex flex-row space-x-4 items-center ring-1 ring-gray-300 p-2 rounded-xl bg-gray-100 ">
                    <FaCog color="" size={20}/>
                    <p className="">Filtros</p>
                </div>

                {/* Opción lista o calendario */}
                <div className="flex flex-row items-center space-x-4 ring-1 ring-gray-300 p-2 rounded-xl bg-gray-100">
                    <div className="flex flex-row items-center space-x-2 px-2">
                        <GiHamburgerMenu color="" size={20}/>
                        <p className="">Lista</p>
                    </div>
                        <div className="flex flex-row items-center space-x-2">
                        <FaCalendar color="" size={20}/>
                        <p className="">Calendario</p>
                    </div>
                </div>
                {/* Notificaciones (crear logica de notificaciones) */}
                <div className="flex flex-row ">
                    <IoIosNotifications color="" size={26} />
                </div>

                {/* Usuario */}
                <div className=" flex flex-row space-x-4">
                    <FaUser color="" size={20} />
                    <p className=""> Usuario</p>
                </div> 
            </div>
        <hr className="border-t border-gray-300" />
        </div>
    )
}

export default HeaderComponent;