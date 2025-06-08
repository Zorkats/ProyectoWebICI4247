import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { jwtInterceptor } from './interceptors/jwt.interceptor'; 

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    , provideHttpClient(withInterceptors([jwtInterceptor]))
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
