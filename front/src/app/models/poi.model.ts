// src/app/models/poi.model.ts

// Interfaz para la categoría del POI, según lo que devuelve tu API
export interface PoiCategory {
  name: string;
  icon_name: string;
}

// Interfaz para un Punto de Interés
export interface PointOfInterest {
  id: number;
  name: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  main_image_url?: string;
  gallery_image_urls?: string[];
  average_rating?: number;
  review_count?: number;
  contact_info?: { website?: string; phone?: string };
  category: PoiCategory; // Objeto anidado
  // Opcional, si lo incluyes en la llamada a getPoiDetails
  destination?: { 
    id: number;
    name: string;
    country: string;
  };
}