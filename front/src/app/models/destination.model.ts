// src/app/models/destination.model.ts

// Interfaz para la categoría anidada que viene del backend
export interface DestinationCategory {
  id: number;
  name: string;
}

// Interfaz principal para el Destino, ahora completa
export interface Destination {
  id: number;
  name: string;
  description?: string; // El signo ? indica que la propiedad es opcional (puede ser null)
  country?: string;
  region?: string;
  main_image_url?: string;
  gallery_image_urls?: string[];  // <--- PROPIEDAD AÑADIDA (es un array de strings)
  category_id: number;
  category?: DestinationCategory;   // El objeto categoría que se incluye en la consulta
  tags?: any[];                   // Puede ser string[] o un tipo más complejo
  popularity_score: number;
  is_trending: boolean;
  best_time_to_visit?: string;    // <--- PROPIEDAD AÑADIDA
  average_daily_cost?: number;    // <--- PROPIEDAD AÑADIDA
  latitude?: number;
  longitude?: number;
  created_at?: string; // o Date, si lo transformas
  updated_at?: string; // o Date, si lo transformas
}

// Interfaz para la respuesta de la API que incluye paginación
export interface DestinationsResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  destinations: Destination[];
}