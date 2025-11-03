import { 
  X, Calendar, Clock, MapPin, Users, Share2, Download, 
  Accessibility, Baby, Phone, Mail, CheckCircle, AlertCircle, CirclePlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Event } from '@/types/events';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (event: Event) => void;
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

const getAudienceLabel = (audience: string[]) => {
  const labels = audience.map(a => {
    switch (a) {
      case 'students': return 'Alumnos';
      case 'staff': return 'Funcionarios';
      case 'external': return 'Público externo';
      case 'families': return 'Familias';
      default: return a;
    }
  });
  return labels.join(', ');
};

export const EventDetailModal = ({
  event,
  isOpen,
  onClose,
  onRegister,
}: EventDetailModalProps) => {
  if (!event) return null;

  const availableSpots = event.capacity - event.registeredCount;
  const isAlmostFull = availableSpots <= event.capacity * 0.2;
  const isFull = availableSpots <= 0;

  const generateCalendarLink = (type: 'google' | 'ical') => {
    const startDate = event.startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = event.endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    if (type === 'google') {
      const googleUrl = new URL('https://calendar.google.com/calendar/render');
      googleUrl.searchParams.set('action', 'TEMPLATE');
      googleUrl.searchParams.set('text', event.title);
      googleUrl.searchParams.set('dates', `${startDate}/${endDate}`);
      googleUrl.searchParams.set('details', event.description);
      googleUrl.searchParams.set('location', `${event.location.name}, ${event.location.campus}`);
      return googleUrl.toString();
    }
    
    return '#'; // Placeholder para iCal
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Detalles del evento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header del evento */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold leading-tight mb-2">
                  {event.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <Badge className={getThemeBadgeClass(event.theme)}>
                    {getThemeLabel(event.theme)}
                  </Badge>
                  <Badge variant="outline">
                    {getModalityLabel(event.modality)}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Información principal */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Columna izquierda - Info básica */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información del evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {format(event.startDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(event.startDate, "HH:mm")} - {format(event.endDate, "HH:mm")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{event.location.name}</p>
                    <p className="text-sm text-muted-foreground">{event.location.campus}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">
                      {event.registeredCount} de {event.capacity} inscritos
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Dirigido a: {getAudienceLabel(event.audience)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Columna derecha - Acciones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Inscripción */}
                <div className="space-y-2">
                  {isFull ? (
                    <Badge variant="destructive" className="w-full justify-center py-2">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Evento completo
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => onRegister(event)}
                      className="w-full bg-gradient-primary hover:opacity-90"
                      size="lg"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Inscribirme al evento
                    </Button>
                  )}
                  
                  {isAlmostFull && !isFull && (
                    <p className="text-sm text-warning text-center">
                      ¡Últimas {availableSpots} plazas disponibles!
                    </p>
                  )}
                </div>

                <Separator />

                {/* Agregar a calendario */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Agregar a mi calendario:</p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(generateCalendarLink('google'), '_blank')}
                    >
                      <CirclePlus className="h-3 w-3 mr-1" />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {/* Implementar iCal */}}
                    >
                      <CirclePlus className="h-3 w-3 mr-1" />
                      iCal
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Compartir */}
                <Button
                  variant="outline"
                  onClick={shareEvent}
                  className="w-full"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir evento
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Información adicional */}
          <div className="space-y-4">
            {/* Accesibilidad */}
            {event.accessibility && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Accessibility className="h-5 w-5 mr-2 text-primary" />
                    Accesibilidad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.accessibility}</p>
                </CardContent>
              </Card>
            )}

            {/* Reglas para menores */}
            {event.rulesForMinors && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Baby className="h-5 w-5 mr-2 text-primary" />
                    Información para familias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.rulesForMinors}</p>
                </CardContent>
              </Card>
            )}

            {/* Organizador */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Organiza</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{event.organizer.name}</p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <a 
                      href={`mailto:${event.organizer.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {event.organizer.email}
                    </a>
                  </div>
                  
                  {event.organizer.phone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <a 
                        href={`tel:${event.organizer.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {event.organizer.phone}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};