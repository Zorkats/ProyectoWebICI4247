// src/app/services/trip.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viaje } from '../models/viaje.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) { }

  // Obtiene todos los viajes del usuario autenticado
  getUserTrips(): Observable<Viaje[]> {
    // CAMBIO: Añadido { withCredentials: true } para enviar la cookie de sesión
    return this.http.get<Viaje[]>(this.apiUrl, { withCredentials: true });
  }

  // Obtener un viaje específico por ID
  getTripDetails(tripId: number): Observable<Viaje> {
    // CAMBIO: Añadido { withCredentials: true }
    return this.http.get<Viaje>(`${this.apiUrl}/${tripId}`, { withCredentials: true });
  }

  // Crear un nuevo viaje
  // NOTA: Para crear, enviamos los IDs, no los objetos completos.
  createTrip(tripData: { name: string, destination_id: number, status_id: number, [key: string]: any }): Observable<Viaje> {
    // CAMBIO: Añadido { withCredentials: true }
    return this.http.post<Viaje>(this.apiUrl, tripData, { withCredentials: true });
  }

  // Actualizar un viaje existente
  updateTrip(tripId: number, tripData: Partial<Viaje>): Observable<Viaje> {
    // CAMBIO: Añadido { withCredentials: true }
    return this.http.put<Viaje>(`${this.apiUrl}/${tripId}`, tripData, { withCredentials: true });
  }
  
  // Eliminar un viaje
  deleteTrip(tripId: number): Observable<void> {
    // CAMBIO: Añadido { withCredentials: true }
    return this.http.delete<void>(`${this.apiUrl}/${tripId}`, { withCredentials: true });
  }

  getNextTrip(): Observable<Viaje> {
  // Añadimos withCredentials para enviar la cookie
  return this.http.get<Viaje>(`${this.apiUrl}/next`, { withCredentials: true });
}
  
  // Los otros métodos también necesitan withCredentials si son rutas protegidas
  // ...
}