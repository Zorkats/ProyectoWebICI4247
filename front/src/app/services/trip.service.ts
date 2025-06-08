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


  getUserTrips(): Observable<Viaje[]> {
  
    return this.http.get<Viaje[]>(this.apiUrl, { withCredentials: true });
  }


  getTripDetails(tripId: number): Observable<Viaje> {

    return this.http.get<Viaje>(`${this.apiUrl}/${tripId}`, { withCredentials: true });
  }

  createTrip(tripData: { name: string, destination_id: number, status_id: number, [key: string]: any }): Observable<Viaje> {
    
    return this.http.post<Viaje>(this.apiUrl, tripData, { withCredentials: true });
  }

  updateTrip(tripId: number, tripData: Partial<Viaje>): Observable<Viaje> {
    
    return this.http.put<Viaje>(`${this.apiUrl}/${tripId}`, tripData, { withCredentials: true });
  }
  
  deleteTrip(tripId: number): Observable<void> {
    
    return this.http.delete<void>(`${this.apiUrl}/${tripId}`, { withCredentials: true });
  }

  getNextTrip(): Observable<Viaje> {
  
  return this.http.get<Viaje>(`${this.apiUrl}/next`, { withCredentials: true });
  }
  
}