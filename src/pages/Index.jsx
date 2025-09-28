import CardComponent from "../components/CardComponent";
import HeaderComponent from "../components/HeaderComponent";
import { CiCalendar } from "react-icons/ci";

const Index = () =>{
    const events = [
  {
    title: "Workshop: Introducción a IA",
    category: "Programación",
    description: "Aprende fundamentos de IA...",
    date: "2025-10-03",
    time: "18:00 - 20:00",
    location: "Aula 204 • Presencial",
    students: "Alumnos",
    spots: "28/40",
    spotsLabel: "12 plazas"
  },
  {
    title: "Charla: Nuevas tendencias en Física",
    category: "Ciencia",
    description: "Exploración de avances en física cuántica...",
    date: "2025-10-03",
    time: "18:00 - 19:00",
    location: "Aula 204 • Híbrido",
    students: "Funcionarios, Alumnos",
    spots: "32/40",
    spotsLabel: "Últimas plazas"
  },
  {
    title: "Concierto Familiar",
    category: "Cultura",
    description: "Evento musical para toda la familia...",
    date: "2025-10-04",
    time: "16:00 - 18:00",
    location: "Auditorium Central • Presencial",
    students: "Público externo, Familias",
    spots: "156/200",
    spotsLabel: "44 plazas"
  }
];

const groupedEvents = events.reduce((acc, event) =>{
    if(!acc[event.date]){
        acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
}, {})
    return(
        <div className="w-full">
            <HeaderComponent/>
            <div className="overflow-x-hidden mt-4">
                {Object.keys(groupedEvents)
                    .sort((a, b) => new Date(a) - new Date(b)) // orden por fecha
                    .map((date) => (
                    <div key={date} className="mb-6 ites-center justify-center ">
                        <h2 className="flex items-center space-x-2 text-xl text-black font-medium mb-2">
                        <CiCalendar size={30} color="blue" />
                        <span>{new Date(date).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
                        <span className="text-gray-600 text-xs">({groupedEvents[date].length} evento{groupedEvents[date].length > 1 ? "s" : ""})</span>
                        </h2>

                        {groupedEvents[date].map((event, index) => (
                        <CardComponent
                            key={index}
                            title={event.title}
                            category={event.category}
                            description={event.description}
                            date={event.date} // opcional, para lógica interna
                            time={event.time}
                            location={event.location}
                            students={event.students}
                            spots={event.spots}
                            spotsLabel={event.spotsLabel}
                        />
                        ))}
                    </div>
                    ))}
                </div>
            
        </div>
    )
}

export default Index;