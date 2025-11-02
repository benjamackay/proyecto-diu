import { useState, useMemo } from 'react';
import { Event, EventFilter } from '@/types/events';
import { events as seedEvents } from '@/data/seedData';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>(seedEvents);
  const [filters, setFilters] = useState<EventFilter>({});

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.organizer.name.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Theme filter
      if (filters.theme && filters.theme.length > 0) {
        if (!filters.theme.includes(event.theme)) return false;
      }

      // Audience filter
      if (filters.audience && filters.audience.length > 0) {
        const hasMatchingAudience = filters.audience.some(filterAudience =>
          event.audience.includes(filterAudience)
        );
        if (!hasMatchingAudience) return false;
      }

      // Modality filter
      if (filters.modality && filters.modality.length > 0) {
        if (!filters.modality.includes(event.modality)) return false;
      }

      // Campus filter
      if (filters.campus && filters.campus.length > 0) {
        if (!filters.campus.includes(event.location.campus)) return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const eventDate = new Date(event.startDate);
        eventDate.setHours(0, 0, 0, 0);
        
        if (filters.dateRange.start) {
          const startDate = new Date(filters.dateRange.start);
          startDate.setHours(0, 0, 0, 0);
          if (eventDate < startDate) return false;
        }
        
        if (filters.dateRange.end) {
          const endDate = new Date(filters.dateRange.end);
          endDate.setHours(23, 59, 59, 999);
          if (eventDate > endDate) return false;
        }
      }

      return true;
    });
  }, [events, filters]);

  const publishedEvents = useMemo(() => {
    return filteredEvents.filter(event => event.status === 'published');
  }, [filteredEvents]);

  const updateFilters = (newFilters: Partial<EventFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const addEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
  };

  const updateEvent = (eventId: string, updates: Partial<Event>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, ...updates, updatedAt: new Date() } : event
      )
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const getEventsByDate = (date: Date) => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    return publishedEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === targetDate.getTime();
    }).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.theme && filters.theme.length > 0) count++;
    if (filters.audience && filters.audience.length > 0) count++;
    if (filters.modality && filters.modality.length > 0) count++;
    if (filters.campus && filters.campus.length > 0) count++;
    if (filters.dateRange && (filters.dateRange.start || filters.dateRange.end)) count++;
    if (filters.search && filters.search.trim()) count++;
    return count;
  };

  return {
    events: filteredEvents,
    publishedEvents,
    filters,
    updateFilters,
    clearFilters,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
    getActiveFiltersCount,
  };
};