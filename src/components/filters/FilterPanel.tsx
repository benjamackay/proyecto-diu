import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventFilter } from '@/types/events';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: EventFilter;
  onFiltersChange: (filters: Partial<EventFilter>) => void;
  onClearFilters: () => void;
  className?: string;
}

const themeOptions = [
  { value: 'programming', label: 'Programación', color: 'badge-tech' },
  { value: 'culture', label: 'Cultura', color: 'badge-culture' },
  { value: 'science', label: 'Ciencia', color: 'badge-science' },
  { value: 'admin', label: 'Administrativo', color: 'badge-admin' },
] as const;

const audienceOptions = [
  { value: 'students', label: 'Alumnos' },
  { value: 'staff', label: 'Funcionarios' },
  { value: 'external', label: 'Público externo' },
  { value: 'families', label: 'Familias' },
] as const;

const modalityOptions = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'online', label: 'Online' },
  { value: 'hibrido', label: 'Híbrido' },
] as const;

const campusOptions = [
  { value: 'Campus Central', label: 'Campus Central' },
  { value: 'Campus Tecnológico', label: 'Campus Tecnológico' },
] as const;

export const FilterPanel = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className,
}: FilterPanelProps) => {
  const hasActiveFilters = Object.values(filters).some(filter => {
    if (Array.isArray(filter)) return filter.length > 0;
    if (typeof filter === 'object' && filter !== null) {
      return Object.values(filter).some(v => v !== undefined);
    }
    return filter !== undefined && filter !== '';
  });

  const handleThemeChange = (theme: string, checked: boolean) => {
    const currentThemes = filters.theme || [];
    const newThemes = checked
      ? [...currentThemes, theme as any]
      : currentThemes.filter(t => t !== theme);
    onFiltersChange({ theme: newThemes });
  };

  const handleAudienceChange = (audience: string, checked: boolean) => {
    const currentAudiences = filters.audience || [];
    const newAudiences = checked
      ? [...currentAudiences, audience as any]
      : currentAudiences.filter(a => a !== audience);
    onFiltersChange({ audience: newAudiences });
  };

  const handleModalityChange = (modality: string, checked: boolean) => {
    const currentModalities = filters.modality || [];
    const newModalities = checked
      ? [...currentModalities, modality as any]
      : currentModalities.filter(m => m !== modality);
    onFiltersChange({ modality: newModalities });
  };

  const handleCampusChange = (campus: string, checked: boolean) => {
    const currentCampuses = filters.campus || [];
    const newCampuses = checked
      ? [...currentCampuses, campus]
      : currentCampuses.filter(c => c !== campus);
    onFiltersChange({ campus: newCampuses });
  };

  const setQuickDateFilter = (type: 'today' | 'week' | 'month') => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let end = new Date();
    
    switch (type) {
      case 'today':
        end = new Date(today);
        break;
      case 'week':
        end = new Date(today);
        end.setDate(today.getDate() + 7);
        break;
      case 'month':
        end = new Date(today);
        end.setMonth(today.getMonth() + 1);
        break;
    }
    
    onFiltersChange({
      dateRange: { start: today, end },
    });
  };

  const isDateFilterActive = (type: 'today' | 'week' | 'month') => {
    if (!filters.dateRange?.start || !filters.dateRange?.end) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startMatches = filters.dateRange.start.getTime() === today.getTime();
    if (!startMatches) return false;
    
    const daysDiff = Math.floor(
      (filters.dateRange.end.getTime() - filters.dateRange.start.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    switch (type) {
      case 'today':
        return daysDiff === 0;
      case 'week':
        return daysDiff === 7;
      case 'month':
        return daysDiff >= 28 && daysDiff <= 31;
      default:
        return false;
    }
  };

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Filtros rápidos por fecha */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Fecha</Label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={isDateFilterActive('today') ? "default" : "outline"}
              size="sm"
              onClick={() => setQuickDateFilter('today')}
              className={cn(
                "text-xs transition-all",
                isDateFilterActive('today') && "shadow-md"
              )}
            >
              Hoy
            </Button>
            <Button
              variant={isDateFilterActive('week') ? "default" : "outline"}
              size="sm"
              onClick={() => setQuickDateFilter('week')}
              className={cn(
                "text-xs transition-all",
                isDateFilterActive('week') && "shadow-md"
              )}
            >
              Esta semana
            </Button>
            <Button
              variant={isDateFilterActive('month') ? "default" : "outline"}
              size="sm"
              onClick={() => setQuickDateFilter('month')}
              className={cn(
                "text-xs transition-all",
                isDateFilterActive('month') && "shadow-md"
              )}
            >
              Este mes
            </Button>
          </div>
        </div>

        {/* Filtro por tema */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Tema</Label>
          <div className="space-y-2">
            {themeOptions.map((option) => (
              <div 
                key={option.value} 
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md transition-colors",
                  "hover:bg-accent/50",
                  filters.theme?.includes(option.value) && "bg-accent border border-primary/20"
                )}
              >
                <Checkbox
                  id={`theme-${option.value}`}
                  checked={filters.theme?.includes(option.value) || false}
                  onCheckedChange={(checked) =>
                    handleThemeChange(option.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`theme-${option.value}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
                <Badge className={cn("text-xs", option.color)}>
                  {option.label}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Filtro por audiencia */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Audiencia</Label>
          <div className="space-y-2">
            {audienceOptions.map((option) => (
              <div 
                key={option.value} 
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md transition-colors",
                  "hover:bg-accent/50",
                  filters.audience?.includes(option.value) && "bg-accent border border-primary/20"
                )}
              >
                <Checkbox
                  id={`audience-${option.value}`}
                  checked={filters.audience?.includes(option.value) || false}
                  onCheckedChange={(checked) =>
                    handleAudienceChange(option.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`audience-${option.value}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Filtro por modalidad */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Modalidad</Label>
          <div className="space-y-2">
            {modalityOptions.map((option) => (
              <div 
                key={option.value} 
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md transition-colors",
                  "hover:bg-accent/50",
                  filters.modality?.includes(option.value) && "bg-accent border border-primary/20"
                )}
              >
                <Checkbox
                  id={`modality-${option.value}`}
                  checked={filters.modality?.includes(option.value) || false}
                  onCheckedChange={(checked) =>
                    handleModalityChange(option.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`modality-${option.value}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Filtro por campus */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Campus</Label>
          <div className="space-y-2">
            {campusOptions.map((option) => (
              <div 
                key={option.value} 
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md transition-colors",
                  "hover:bg-accent/50",
                  filters.campus?.includes(option.value) && "bg-accent border border-primary/20"
                )}
              >
                <Checkbox
                  id={`campus-${option.value}`}
                  checked={filters.campus?.includes(option.value) || false}
                  onCheckedChange={(checked) =>
                    handleCampusChange(option.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`campus-${option.value}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};