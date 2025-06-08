import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viaje } from '../models/viaje.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:3000/api/trips'; // Endpoint de viajes

  constructor(private http: HttpClient) { }

  // Obtiene todos los viajes del usuario autenticado
  // El interceptor JWT se encargará de añadir el token
  getUserTrips(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.apiUrl);
  }

  // Obtener un viaje específico por ID
  getTripDetails(tripId: number): Observable<Viaje> {
    return this.http.get<Viaje>(`${this.apiUrl}/${tripId}`);
  }

  // Crear un nuevo viaje
  createTrip(tripData: Partial<Viaje>): Observable<Viaje> {
    return this.http.post<Viaje>(this.apiUrl, tripData);
  }

  // Actualizar un viaje existente
  updateTrip(tripId: number, tripData: Partial<Viaje>): Observable<Viaje> {
    return this.http.put<Viaje>(`${this.apiUrl}/${tripId}`, tripData);
  }
  // Eliminar un viaje
  deleteTrip(tripId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tripId}`);
  }
  // Buscar viajes por destino
  searchTrips(destination: string): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`${this.apiUrl}/search?destination=${encodeURIComponent(destination)}`);
  }
  // Filtrar viajes por estado
  filterTripsByStatus(status: string): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`${this.apiUrl}/filter?status=${encodeURIComponent(status)}`);
  } 
}