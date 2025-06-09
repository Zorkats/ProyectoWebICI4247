// src/app/models/viaje.model.ts

// NUEVO: Interfaz para el objeto 'destination' anidado
export interface Destination {
  id: number;
  name: string;
  country: string;
  // puedes añadir más campos si los necesitas, ej: main_image_url
}

// NUEVO: Interfaz para el objeto 'status' anidado
export interface TripStatus {
  id: number;
  name: string;
}

// CAMBIO: La interfaz principal 'Viaje' ahora refleja la estructura del backend
export interface Viaje {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  budget: number;
  description: string | null;
  image_url: string | null;
  
  // Objetos anidados que vienen del 'include' en Sequelize
  destination: Destination; 
  status: TripStatus;

  // Campos que puedes necesitar para crear/actualizar, pero que no vienen en el GET anidado
  destination_id?: number;
  status_id?: number;
}