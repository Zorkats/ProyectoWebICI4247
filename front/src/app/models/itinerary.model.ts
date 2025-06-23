// src/app/models/itinerary.model.ts
import { PointOfInterest } from './poi.model';

export interface ItineraryItem {
  id: number;
  trip_id: number;
  poi_id: number;
  day_number: number;
  start_time?: string;
  end_time?: string;
  notes?: string;
  poi: PointOfInterest; // Objeto anidado con el detalle del POI
}