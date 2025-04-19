import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UserStats {
  icon: string;
  value: string | number;
  label: string;
}

export interface SecurityInfo {
  lastPwdChange: string;
  twoFA: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  loadProfile(): Observable<User> {
    return this.http.get<User>('/api/user/me');
  }

  loadStats(): Observable<UserStats[]> {
    return this.http.get<any>('/api/user/stats').pipe(
      map((d) => [
        { icon: 'map-outline', value: d.tripsDone, label: 'Viajes completados' },
        { icon: 'flag-outline', value: d.countries, label: 'Países visitados' },
        { icon: 'time-outline', value: d.travelTime, label: 'Tiempo viajando' },
        { icon: 'star-outline', value: d.level, label: 'Nivel' },
      ])
    );
  }

  loadSecurity(): Observable<SecurityInfo> {
    return this.http.get<SecurityInfo>('/api/user/security');
  }

  update2FA(enabled: boolean) {
    return this.http.put('/api/user/security/2fa', { enabled });
  }
}
