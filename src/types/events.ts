export type EventTheme = 'programming' | 'culture' | 'science' | 'admin';
export type EventAudience = 'students' | 'staff' | 'external' | 'families';
export type EventModality = 'presencial' | 'online' | 'hibrido';
export type EventStatus = 'draft' | 'under_review' | 'published';

export interface EventLocation {
  id: string;
  name: string;
  campus: string;
  capacity: number;
  hasProjector: boolean;
  hasMicrophone: boolean;
  hasStreaming: boolean;
}

export interface TechnicalChecklist {
  microphone: boolean;
  streaming: boolean;
  projector: boolean;
  earlyAccess: boolean; // 1 hour before
  reviewed: boolean;
  reviewedBy?: string;
  reviewDate?: Date;
  notes?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  theme: EventTheme;
  audience: EventAudience[];
  modality: EventModality;
  location: EventLocation;
  capacity: number;
  registeredCount: number;
  organizer: {
    name: string;
    email: string;
    phone?: string;
  };
  technicalChecklist: TechnicalChecklist;
  status: EventStatus;
  accessibility?: string;
  rulesForMinors?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFilter {
  theme?: EventTheme[];
  audience?: EventAudience[];
  modality?: EventModality[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  campus?: string[];
  search?: string;
}

export interface DayEvents {
  date: Date;
  events: Event[];
}

export interface ConflictDetection {
  hasConflict: boolean;
  conflictingEvent?: Event;
  suggestions: {
    timeSlots: Array<{ start: Date; end: Date }>;
    alternativeLocations: EventLocation[];
  };
}