import { X, Calendar, Clock, MapPin, Users, Eye, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types/events';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface DayEventsPanelProps {
  date: Date;
  events: Event[];
  isOpen: boolean;
  onClose: () => void;
  onEventSelect: (event: Event) => void;
  onEventRegister: (event: Event) => void;
}

const getThemeBadgeClass = (theme: string) => {
  switch (theme) {
    case 'programming': return 'badge-tech';
    case 'culture': return 'badge-culture';
    case 'science': return 'badge-science';
    case 'admin': return 'badge-admin';
    default: return 'bg-muted';
  }
};

const getThemeLabel = (theme: string) => {
  switch (theme) {
    case 'programming': return 'Programación';
    case 'culture': return 'Cultura';
    case 'science': return 'Ciencia';
    case 'admin': return 'Administrativo';
    default: return theme;
  }
};

const getModalityLabel = (modality: string) => {
  switch (modality) {
    case 'presencial': return 'Presencial';
    case 'online': return 'Online';
    case 'hibrido': return 'Híbrido';
    default: return modality;
  }
};

export const DayEventsPanel = ({
  date,
  events,
  isOpen,
  onClose,
  onEventSelect,
  onEventRegister,
}: DayEventsPanelProps) => {
  if (!isOpen) return null;

  const sortedEvents = events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  
  const isToday = date.toDateString() === new Date().toDateString();
  const isTomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString() === date.toDateString();
  
  let dateLabel = format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
  if (isToday) dateLabel = `Hoy, ${dateLabel}`;
  else if (isTomorrow) dateLabel = `Mañana, ${dateLabel}`;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-full md:w-96 bg-background border-l shadow-elevation z-50",
        "transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <Card className="h-full rounded-none border-0">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-lg">Eventos del día</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground capitalize">
              {dateLabel}
            </p>
          </CardHeader>

          <CardContent className="p-0 h-full overflow-y-auto">
            {events.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Sin eventos
                </h3>
                <p className="text-sm text-muted-foreground">
                  No hay eventos programados para este día.
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {sortedEvents.map((event, index) => {
                  const availableSpots = event.capacity - event.registeredCount;
                  const isAlmostFull = availableSpots <= event.capacity * 0.2;
                  const isFull = availableSpots <= 0;

                  return (
                    <Card 
                      key={event.id}
                      className={cn(
                        "border-l-4 border-l-primary/30 hover:border-l-primary transition-smooth",
                        "animate-fade-in"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-base leading-tight">
                                {event.title}
                              </h3>
                              <Badge className={getThemeBadgeClass(event.theme)} variant="secondary">
                                {getThemeLabel(event.theme)}
                              </Badge>
                            </div>
                          </div>

                          {/* Información del evento */}
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              <span>
                                {format(event.startDate, "HH:mm")} - {format(event.endDate, "HH:mm")}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2 text-primary" />
                              <span>
                                {event.location.name} • {getModalityLabel(event.modality)}
                              </span>
                            </div>

                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-4 w-4 mr-2 text-primary" />
                              <span>
                                {event.registeredCount}/{event.capacity} inscritos
                              </span>
                            </div>
                          </div>

                          {/* Descripción corta */}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>

                          {/* Estado y acciones */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                              {isFull ? (
                                <Badge variant="destructive" className="text-xs">
                                  Completo
                                </Badge>
                              ) : isAlmostFull ? (
                                <Badge variant="secondary" className="text-xs bg-warning text-warning-foreground">
                                  Últimas plazas
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs text-success">
                                  {availableSpots} plazas
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEventSelect(event)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Ver ficha
                              </Button>
                              
                              {!isFull && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => onEventRegister(event)}
                                  className="bg-gradient-primary hover:opacity-90"
                                >
                                  <UserPlus className="h-3 w-3 mr-1" />
                                  Inscribirme
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};