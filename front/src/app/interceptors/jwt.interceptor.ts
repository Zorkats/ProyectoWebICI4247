import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Convertimos la clase en una función interceptora exportable
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectamos dependencias con inject() en lugar del constructor
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  // La lógica del interceptor es la misma
  if (token && req.url.includes('http://localhost:3000/api/')) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};