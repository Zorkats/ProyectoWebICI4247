// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
}

export interface UserStats {
  icon: string;
  value: number | string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  loadProfile(): Observable<User | null> {
    // Simulating API call with mock data
    const mockUser: User = {
      id: '1',
      name: 'Usuario Demo',
      email: 'demo@example.com',
      avatarUrl: 'assets/img/default-avatar.png',
      role: 'Viajero'
    };
    return of(mockUser);
  }

  loadStats(): Observable<UserStats[]> {
    // Simulating API call with mock data
    const mockStats: UserStats[] = [
      { icon: 'airplane-outline', value: 12, label: 'Viajes' },
      { icon: 'location-outline', value: 25, label: 'Lugares visitados' },
      { icon: 'star-outline', value: 48, label: 'Reseñas' },
      { icon: 'heart-outline', value: 156, label: 'Favoritos' }
    ];
    return of(mockStats);
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<boolean> {
    // Simulating API call
    console.log('Updating password...');
    return of(true);
  }
}