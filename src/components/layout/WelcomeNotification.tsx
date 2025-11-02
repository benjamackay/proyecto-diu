import { useState, useEffect } from 'react';
import { X, Calendar, List, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const WelcomeNotification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar solo si es la primera visita (simplificado)
    const hasVisited = localStorage.getItem('events-tracker-visited');
    if (!hasVisited) {
      setIsVisible(true);
      localStorage.setItem('events-tracker-visited', 'true');
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 w-80">
      <Card className="shadow-elevation animate-slide-in border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">¡Bienvenido!</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Explora eventos institucionales con facilidad:
          </p>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <List className="h-3 w-3 text-primary" />
              <span>Alterna entre vista <strong>Lista</strong> y <strong>Calendario</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-3 w-3 text-primary" />
              <span>Usa <strong>filtros</strong> para encontrar eventos relevantes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-primary" />
              <span>Haz <strong>clic en días</strong> del calendario para ver eventos</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <Badge variant="outline" className="text-xs">
              Tip: Usa búsqueda global arriba
            </Badge>
            <Button
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-xs"
            >
              Entendido
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};