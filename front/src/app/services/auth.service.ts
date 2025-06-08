import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth.model';

// El decorador @Injectable({ providedIn: 'root' }) es lo que lo convierte
// en un servicio que Angular puede inyectar en toda la aplicación.
// Si esto falta o está mal escrito, NADA puede inyectar este servicio.
@Injectable({
  providedIn: 'root'
})
// La palabra 'export' permite que otros archivos, como AuthGuard, lo importen.
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'auth_token';
  
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated = this.authState.asObservable();

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => this.setSession(response))
    );
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.setSession(response))
    );
  }

  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem(this.tokenKey, authResponse.token);
    this.authState.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}