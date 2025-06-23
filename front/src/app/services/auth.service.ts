import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthResponse, User } from '../models/auth.model'; // CAMBIO: Importamos User
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'
  private apiUrl = 'http://localhost:3000/api/auth';
  
  // CAMBIO: Ya no guardamos un token. Guardamos el estado del usuario actual.
  // Inicia como null porque al principio no sabemos si el usuario está autenticado.
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  // Observable público para que los componentes puedan suscribirse a los cambios del usuario.
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Observable que simplemente emite true o false si el usuario está autenticado.
  public isAuthenticated$: Observable<boolean> = this.currentUser$.pipe(map(user => !!user));

  constructor(private http: HttpClient, private router: Router) {
    // NUEVO: Al iniciar el servicio, intentamos verificar si ya existe una sesión válida.
    this.checkAuthState().subscribe();
  }

  // NUEVO: Método para verificar el estado de autenticación al cargar la app.
  // Llama a un endpoint protegido. Si funciona, el usuario está logueado.
  checkAuthState(): Observable<User | null> {
    return this.http.get<User>(`${this.baseUrl}/user`, { withCredentials: true }).pipe(
      tap(user => {
        // Si la petición tiene éxito, guardamos los datos del usuario.
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        // Si falla (ej. 401 Unauthorized), no hay sesión válida.
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData, { withCredentials: true }).pipe(
      // CAMBIO: En lugar de guardar un token, guardamos los datos del usuario.
      tap(response => this.storeUserData(response.data))
    );
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      // CAMBIO: También guardamos los datos del usuario al iniciar sesión.
      tap(response => this.storeUserData(response.data))
    );
  }
  
  // CAMBIO: Este método ahora debe llamar a la API para cerrar la sesión en el backend.
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.currentUserSubject.next(null); // Limpiamos el estado local.
        this.router.navigateByUrl('/home', { replaceUrl: true }); // Redirigimos a login.
      },
      error: () => {
        // Incluso si hay un error, limpiamos el estado local por seguridad.
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }
    });
  }
  
  // NUEVO: Método centralizado para actualizar el estado del usuario.
  private storeUserData(user: User): void {
    this.currentUserSubject.next(user);
  }

  // ELIMINADO: Los siguientes métodos ya no son necesarios porque no manejamos el token.
  // private setSession(authResponse: AuthResponse): void { ... }
  // getToken(): string | null { ... }
  // private hasToken(): boolean { ... }
}