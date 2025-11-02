import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types/events';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  events: Event[];
  onDayClick: (date: Date, events: Event[]) => void;
  selectedDate?: Date;
}

export const CalendarView = ({ events, onDayClick, selectedDate }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Expandir para incluir días de semanas anteriores/posteriores
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(monthStart.getDate() - monthStart.getDay());
  
  const calendarEnd = new Date(monthEnd);
  calendarEnd.setDate(monthEnd.getDate() + (6 - monthEnd.getDay()));

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return isSameDay(eventDate, date);
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Header del calendario */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">
              {format(currentDate, 'MMMM yyyy', { locale: es })}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="text-primary hover:bg-primary/10"
            >
              Hoy
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Header de días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className="h-10 flex items-center justify-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Grid del calendario */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isDayToday = isToday(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const hasEvents = dayEvents.length > 0;

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[120px] p-2 border border-border rounded-lg cursor-pointer transition-smooth",
                  "hover:bg-muted/50 hover:border-primary/50",
                  !isCurrentMonth && "opacity-40",
                  isDayToday && "bg-primary/5 border-primary/30",
                  isSelected && "bg-primary/10 border-primary",
                  hasEvents && "hover:shadow-soft"
                )}
                onClick={() => onDayClick(day, dayEvents)}
              >
                {/* Número del día */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      !isCurrentMonth && "text-muted-foreground",
                      isDayToday && "text-primary font-bold"
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  
                  {hasEvents && (
                    <Badge
                      variant="secondary"
                      className="h-5 w-5 p-0 text-xs bg-primary text-primary-foreground"
                    >
                      {dayEvents.length}
                    </Badge>
                  )}
                </div>

                {/* Eventos del día (máximo 3 mini-cards) */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => {
                    const getThemeColor = (theme: string) => {
                      switch (theme) {
                        case 'programming': return 'bg-purple-100 text-purple-700 border-purple-200';
                        case 'culture': return 'bg-pink-100 text-pink-700 border-pink-200';
                        case 'science': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
                        case 'admin': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
                        default: return 'bg-muted text-muted-foreground';
                      }
                    };

                    return (
                      <div
                        key={event.id}
                        className={cn(
                          "p-1 rounded text-xs border truncate",
                          getThemeColor(event.theme)
                        )}
                        title={`${event.title} - ${format(event.startDate, 'HH:mm')}`}
                      >
                        <div className="font-medium truncate">
                          {format(event.startDate, 'HH:mm')} {event.title}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Indicador de eventos adicionales */}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center py-1">
                      +{dayEvents.length - 3} más
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-purple-200"></div>
            <span>Programación</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-pink-200"></div>
            <span>Cultura</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-cyan-200"></div>
            <span>Ciencia</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-yellow-200"></div>
            <span>Administrativo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};