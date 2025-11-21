import { Calendar, Clock, MapPin, Users, Eye, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Event } from '@/types/events';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ImagenProgramacion from '@/assets/programacion.jpeg';
import ImagenCultura from '@/assets/orquesta.jpg';
import ImagenCiencia from '@/assets/laboratorio.jpg';
import ImagenAdministrativo from '@/assets/reunion.webp';

interface EventCardProps {
  event: Event;
  onViewDetails: (event: Event) => void;
  onRegister: (event: Event) => void;
  className?: string;
  compact?: boolean;
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

const themeImages: Record<string, string> = {
  programming: ImagenProgramacion,
  culture: ImagenCultura,
  science: ImagenCiencia,
  admin: ImagenAdministrativo,
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

export const EventCard = ({
  event,
  onViewDetails,
  onRegister,
  className,
  compact = false,
}: EventCardProps) => {
  const availableSpots = event.capacity - event.registeredCount;
  const isAlmostFull = availableSpots <= event.capacity * 0.2;
  const isFull = availableSpots <= 0;

  const imageUrl = themeImages[event.theme] || "/images/default.jpg";

  return (
    <Card className={cn(
      "group hover:shadow-elevation transition-smooth cursor-pointer",
      "border-l-4 border-l-primary/30 hover:border-l-primary",
      className
    )}>
      <CardContent className={cn("p-4", compact && "p-3")}>

        {/* Imagen según el tema */}
        {!compact && (
          <div className="w-full h-40 rounded-md overflow-hidden mb-3">
            <img 
              src={imageUrl}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        )}

        <div className="space-y-3">

          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className={cn(
                "font-semibold leading-tight group-hover:text-primary transition-colors",
                compact ? "text-sm" : "text-base"
              )}>
                {event.title}
              </h3>
              <Badge className={getThemeBadgeClass(event.theme)} variant="secondary">
                {getThemeLabel(event.theme)}
              </Badge>
            </div>

            {!compact && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>
            )}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span>
                {format(event.startDate, "EEEE, d 'de' MMMM", { locale: es })}
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span>
                {format(event.startDate, "HH:mm")} - {format(event.endDate, "HH:mm")}
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span className="flex-1">
                {event.location.name} • {getModalityLabel(event.modality)}
              </span>
            </div>

            {!compact && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span>{getAudienceLabel(event.audience)}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>
                  {event.registeredCount}/{event.capacity}
                </span>
              </div>

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
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(event);
                }}
                className="transition-quick"
              >
                <Eye className="h-3 w-3 mr-1" />
                Más Información
              </Button>

              {!isFull && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegister(event);
                  }}
                  className="bg-gradient-primary hover:opacity-90 transition-quick"
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  {compact ? "Inscr." : "Inscribirme"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
