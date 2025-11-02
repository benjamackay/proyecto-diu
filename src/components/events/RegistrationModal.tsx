import { useState } from 'react';
import { UserPlus, Mail, User, CheckCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Event } from '@/types/events';
import { useToast } from '@/hooks/use-toast';

interface RegistrationModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegistrationComplete: (event: Event) => void;
}

export const RegistrationModal = ({
  event,
  isOpen,
  onClose,
  onRegistrationComplete,
}: RegistrationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!event) return null;

  const resetForm = () => {
    setFormData({ name: '', email: '' });
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Por favor, introduce un email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      onRegistrationComplete(event);
      
      toast({
        title: "¡Inscripción exitosa!",
        description: `Te has inscrito correctamente al evento "${event.title}".`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error durante la inscripción. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {isSuccess ? (
              <>
                <CheckCircle className="h-5 w-5 text-success" />
                <span>¡Inscripción exitosa!</span>
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 text-primary" />
                <span>Inscribirse al evento</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="space-y-4">
            <Alert className="border-success/20 bg-success/5">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">
                Te has inscrito correctamente al evento <strong>"{event.title}"</strong>.
                Recibirás un email de confirmación en breve.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <p className="text-sm font-medium">¿Quieres agregar el evento a tu calendario?</p>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(generateCalendarLink('google'), '_blank')}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Google Calendar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {/* Implementar iCal */}}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Descargar iCal
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleClose}>
                Cerrar
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu.email@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                Recibirás un email de confirmación con los detalles del evento y las instrucciones de acceso.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin mr-2" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Confirmar inscripción
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};