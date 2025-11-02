import { Calendar, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import universityHero from '@/assets/university-hero.jpg';

interface EmptyStateProps {
  type: 'no-events' | 'no-search-results';
  onCreateEvent?: () => void;
  onClearFilters?: () => void;
}

export const EmptyState = ({ type, onCreateEvent, onClearFilters }: EmptyStateProps) => {
  if (type === 'no-search-results') {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No se encontraron eventos
          </h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
            No hay eventos que coincidan con los filtros seleccionados. 
            Intenta ajustar los criterios de búsqueda.
          </p>
          {onClearFilters && (
            <Button variant="outline" onClick={onClearFilters}>
              Limpiar filtros
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div 
          className="w-full h-48 rounded-lg mb-6 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${universityHero})` }}
        />
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          ¡Bienvenido al Tracker de Eventos!
        </h3>
        <p className="text-sm text-muted-foreground text-center max-w-lg mb-6">
          Aquí podrás gestionar y seguir todos los eventos institucionales. 
          Navega entre la vista de lista y calendario para encontrar eventos de tu interés.
        </p>
        {onCreateEvent && (
          <Button onClick={onCreateEvent} className="bg-gradient-primary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Crear primer evento
          </Button>
        )}
      </CardContent>
    </Card>
  );
};