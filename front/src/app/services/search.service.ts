// src/app/services/search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from '../models/destination.model';
import { PointOfInterest } from '../models/poi.model';

// Un tipo que puede ser Destino o POI, y que siempre tendrá un campo 'type'
export type SearchResult = (Destination | PointOfInterest) & { type: 'destination' | 'poi' };

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:3000/api/search';

  constructor(private http: HttpClient) { }

  search(term: string, category: string): Observable<SearchResult[]> {
    let params = new HttpParams().set('q', term);
    if (category && category !== 'all') {
      params = params.set('category', category);
    }
    return this.http.get<SearchResult[]>(this.apiUrl, { params, withCredentials: true });
  }
}