import { FaEye } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar,CiClock2 } from "react-icons/ci";
import { GoPeople } from "react-icons/go";






const CardComponent = ({
    title, 
    category,
    description,
    date,
    time,
    location,
    students,
    spots,
    spotsLabel
}) =>{
    return(
        <div className="w-full mt-4  flex ">
            {/*Componente Principal */}
            <div className="flex flex-col ring-1 w-2/4 h-auto border-l-6 border-blue-300 bg-gray-100 ring-gray-300 rounded-xl p-4 space-y-2">
                <div className="flex flex-row justify-between">
                    {/* Nombre y Badge */}
                    <h1 className="text-xl font-medium text-black">{title}</h1>  
                    <div className=" w-auto h-auto p-2 bg-purple-500 rounded-xl">
                        <p className="text-xs text-white">{category}</p>
                    </div> 
                </div>
                    {/* Información */}
                <div className="space-y-1">
                    <p>{description}</p>
                    <div className="flex flex-row space-x-1 items-center">
                        <CiCalendar size={20} color="blue"/>
                     <p>{date}</p>   
                    </div>
                    <div className="flex flex-row space-x-1 items-center">
                        <CiClock2 size={20} color="blue"/>
                     <p>{time}</p>  
                    </div>
                    <div className="flex flex-row space-x-1 items-center">
                        <IoLocationOutline size={20} color="blue"/>
                     <p>{location}</p>   
                    </div>
                    <div className="flex flex-row space-x-1 items-center">
                        <GoPeople size={20} color="blue"/>
                     <p>{students}</p>    
                    </div>  
                </div>
                    {/* Plazas, Ver e Inscribirse */}
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row space-x-1 items-center">
                        <p className="text-xs">{spots}</p>
                        <div className="w-auto h-auto p-2 bg-amber-400 rounded-xl">
                            <p className="text-xs">{spotsLabel}</p>
                        </div>
                    </div>
                                            {/* Botones */}
                    <div className="flex flex-row space-x-2">
                            <button className="w-auto h-auto p-2 ring-1 ring-gray-300 bg-gray-100 rounded-xl flex flex-row items-center space-x-2 cursor-pointer">
                            <FaEye color="black" size={20} />
                            <span>Ver</span>
                        </button>

                        <button className="w-auto h-auto p-2 ring-1 ring-gray-300 text-white bg-blue-700 rounded-xl flex flex-row items-center space-x-2 cursor-pointer">
                        <IoPersonAdd color="white" size={18} />
                        <span>Inscribirme</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardComponent;