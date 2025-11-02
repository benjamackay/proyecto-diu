import { Event } from '@/types/events';
import { EventCard } from './EventCard';
import { EmptyState } from './EmptyState';
import { Calendar } from 'lucide-react';

interface EventListViewProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
  onEventRegister: (event: Event) => void;
}

export const EventListView = ({
  events,
  onEventSelect,
  onEventRegister,
}: EventListViewProps) => {
  if (events.length === 0) {
    return (
      <EmptyState 
        type="no-search-results"
        onClearFilters={() => {
          // Esta función se pasará desde el componente padre si es necesario
          console.log('Clear filters');
        }}
      />
    );
  }

  // Agrupar eventos por fecha
  const groupedEvents = events.reduce((groups, event) => {
    const dateKey = event.startDate.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {} as Record<string, Event[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents).map(([dateKey, dayEvents]) => {
        const date = new Date(dateKey);
        const isToday = date.toDateString() === new Date().toDateString();
        const isTomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString() === dateKey;
        
        let dateLabel = date.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        
        if (isToday) dateLabel = `Hoy, ${dateLabel}`;
        else if (isTomorrow) dateLabel = `Mañana, ${dateLabel}`;

        return (
          <div key={dateKey} className="space-y-3">
            {/* Header de fecha */}
            <div className="flex items-center space-x-2 pb-2 border-b">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold capitalize">
                {dateLabel}
              </h2>
              <span className="text-sm text-muted-foreground">
                ({dayEvents.length} evento{dayEvents.length !== 1 ? 's' : ''})
              </span>
            </div>

            {/* Lista de eventos del día */}
            <div className="grid gap-3">
              {dayEvents
                .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                .map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onViewDetails={onEventSelect}
                    onRegister={onEventRegister}
                    className="animate-fade-in"
                  />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};