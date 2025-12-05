export type ActivityType = 'transport' | 'sightseeing' | 'food' | 'stay' | 'other';

export interface Activity {
  id: string;
  time: string;
  title: string;
  location?: string;
  notes?: string;
  cost?: string;
  type: ActivityType;
  link?: string;
  isCompleted?: boolean;
}

export interface DayItinerary {
  id: string;
  dayNumber: number;
  date: string;
  locationRegion: string; // e.g., "Zushi", "Kawaguchiko"
  hotel?: string;
  activities: Activity[];
}

export interface ItineraryState {
  days: DayItinerary[];
}