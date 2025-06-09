import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// CAMBIO: Ya no necesitamos 'withInterceptors' porque no hay interceptores
import { provideHttpClient } from '@angular/common/http'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// ELIMINADO: La importación del interceptor ya no es necesaria
// import { jwtInterceptor } from './interceptors/jwt.interceptor'; 

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    // CAMBIO: Simplificamos el provider. Ahora solo proveemos el HttpClient
    // sin interceptores adicionales.
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}