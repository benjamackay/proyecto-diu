import { Search, Calendar, List, User, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';

interface HeaderProps {
  view: 'list' | 'calendar';
  onViewChange: (view: 'list' | 'calendar') => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeFiltersCount: number;
  onFiltersClick: () => void;
}

export const Header = ({
  view,
  onViewChange,
  searchValue,
  onSearchChange,
  activeFiltersCount,
  onFiltersClick,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center">
        {/* Logo y título */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary"></div>
            <h1 className="text-xl font-bold text-gradient-primary hidden sm:block">
              Eventos Universidad
            </h1>
          </div>
        </div>

        {/* Buscador central */}
        <div className="flex-1 max-w-sm mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar eventos..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 transition-smooth focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Controles de vista y filtros */}
        <div className="flex items-center space-x-2">
          {/* Filtros */}
          <Button
            variant="outline"
            size="sm"
            onClick={onFiltersClick}
            className="relative"
          >
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Filtros</span>
            {activeFiltersCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {/* Selector de vista */}
          <div className="flex rounded-lg border bg-muted p-1">
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('list')}
              className={cn(
                "h-8 px-3 transition-quick",
                view === 'list' && "bg-background shadow-soft"
              )}
            >
              <List className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Lista</span>
            </Button>
            <Button
              variant={view === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('calendar')}
              className={cn(
                "h-8 px-3 transition-quick",
                view === 'calendar' && "bg-background shadow-soft"
              )}
            >
              <Calendar className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Calendario</span>
            </Button>
          </div>

          {/* Cambio de tema */}
          <ThemeToggle />

          {/* Notificaciones */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notificaciones</span>
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs"
            >
              2
            </Badge>
          </Button>

          {/* Menú usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Mi perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="h-4 w-4 mr-2" />
                Mis eventos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};