import { Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminButtonProps {
  onCreateEvent: () => void;
  onTechnicalPanel: () => void;
}

export const AdminButton = ({ onCreateEvent, onTechnicalPanel }: AdminButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="default" 
          className="fixed bottom-4 left-4 z-40 h-14 px-6 rounded-full shadow-elevation bg-gradient-primary hover:opacity-90"
        >
          <Settings className="h-5 w-5 mr-2" />
          Admin
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={onCreateEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Crear evento
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onTechnicalPanel}>
          <Settings className="h-4 w-4 mr-2" />
          Panel técnico
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};