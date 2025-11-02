import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { EventListView } from '@/components/events/EventListView';
import { CalendarView } from '@/components/calendar/CalendarView';
import { DayEventsPanel } from '@/components/calendar/DayEventsPanel';
import { EventDetailModal } from '@/components/events/EventDetailModal';
import { RegistrationModal } from '@/components/events/RegistrationModal';
import { AdminButton } from '@/components/admin/AdminButton';
import { EmptyState } from '@/components/events/EmptyState';
import { WelcomeNotification } from '@/components/layout/WelcomeNotification';
import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/types/events';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const {
    publishedEvents,
    filters,
    updateFilters,
    clearFilters,
    getEventsByDate,
    getActiveFiltersCount,
  } = useEvents();
  
  const { toast } = useToast();

  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [searchValue, setSearchValue] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrationEvent, setRegistrationEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dayEvents, setDayEvents] = useState<Event[]>([]);
  const [isDayPanelOpen, setIsDayPanelOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Actualizar filtros cuando cambia la búsqueda
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateFilters({ search: value });
  };

  // Manejar click en día del calendario
  const handleDayClick = (date: Date, events: Event[]) => {
    setSelectedDate(date);
    setDayEvents(events);
    setIsDayPanelOpen(true);
  };

  // Manejar selección de evento
  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
  };

  // Manejar registro de evento
  const handleEventRegister = (event: Event) => {
    setRegistrationEvent(event);
  };

  // Manejar completar registro
  const handleRegistrationComplete = (event: Event) => {
    // Aquí se actualizaría el estado global de eventos
    // Por ahora solo cerramos el modal
    setRegistrationEvent(null);
  };

  // Handlers para funciones admin
  const handleCreateEvent = () => {
    toast({
      title: "Crear evento",
      description: "La funcionalidad de crear eventos estará disponible próximamente.",
    });
  };

  const handleTechnicalPanel = () => {
    toast({
      title: "Panel técnico",
      description: "El panel técnico estará disponible próximamente.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <Header
        view={view}
        onViewChange={setView}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        activeFiltersCount={getActiveFiltersCount()}
        onFiltersClick={() => setIsFilterPanelOpen(true)}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Panel de filtros - Desktop */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Panel de filtros - Mobile (Sheet) */}
          <Sheet open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" className="fixed bottom-4 right-4 z-40 h-12 w-12 rounded-full p-0 shadow-elevation">
                <Filter className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="p-6">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={updateFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
            {view === 'list' ? (
              <EventListView
                events={publishedEvents}
                onEventSelect={handleEventSelect}
                onEventRegister={handleEventRegister}
              />
            ) : (
              <CalendarView
                events={publishedEvents}
                onDayClick={handleDayClick}
                selectedDate={selectedDate}
              />
            )}
          </div>
        </div>
      </div>

      {/* Panel de eventos del día */}
      <DayEventsPanel
        date={selectedDate || new Date()}
        events={dayEvents}
        isOpen={isDayPanelOpen}
        onClose={() => setIsDayPanelOpen(false)}
        onEventSelect={handleEventSelect}
        onEventRegister={handleEventRegister}
      />

      {/* Modal de detalles del evento */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegister={handleEventRegister}
      />

      {/* Modal de registro */}
      <RegistrationModal
        event={registrationEvent}
        isOpen={!!registrationEvent}
        onClose={() => setRegistrationEvent(null)}
        onRegistrationComplete={handleRegistrationComplete}
      />

      {/* Botón de administración */}
      <AdminButton
        onCreateEvent={handleCreateEvent}
        onTechnicalPanel={handleTechnicalPanel}
      />

      {/* Notificación de bienvenida */}
      <WelcomeNotification />
    </div>
  );
};

export default Index;
