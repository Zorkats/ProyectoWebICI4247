// src/app/services/destination.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Destination, DestinationsResponse } from '../models/destination.model';
import { PointOfInterest } from '../models/poi.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private apiUrl = 'http://localhost:3000/api/destinations';

  constructor(private http: HttpClient) { }

  getPoisByDestination(destinationId: number, categoryName?: string): Observable<PointOfInterest[]> {
    let params = new HttpParams();
    if (categoryName) {
      params = params.set('category', categoryName);
    }

    const url = `${this.apiUrl}/${destinationId}/pois`;
    return this.http.get<PointOfInterest[]>(url, { params, withCredentials: true });
  }


  getDestinations(page: number = 1, limit: number = 10): Observable<DestinationsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<DestinationsResponse>(this.apiUrl, { params, withCredentials: true });
  }

  getAllDestinationsForAutocomplete(): Observable<Destination[]> {
    return this.getDestinations(1, 500).pipe(
      map(response => response.destinations)
    );
  }

  getDestinationDetails(destinationId: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}/${destinationId}`, { withCredentials: true });
  }

  createDestination(destinationData: Partial<Destination>): Observable<any> {
    return this.http.post<any>(this.apiUrl, destinationData, { withCredentials: true });
  }

  updateDestination(destinationId: number, destinationData: Partial<Destination>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${destinationId}`, destinationData, { withCredentials: true });
  }

  deleteDestination(destinationId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${destinationId}`, { withCredentials: true });
  }
}