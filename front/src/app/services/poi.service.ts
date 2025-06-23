// src/app/services/poi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PointOfInterest } from '../models/poi.model';

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private apiUrl = 'http://localhost:3000/api/pois';

  constructor(private http: HttpClient) { }

  getPoiDetails(poiId: number): Observable<PointOfInterest> {
    return this.http.get<PointOfInterest>(`${this.apiUrl}/${poiId}`, { withCredentials: true });
  }
}