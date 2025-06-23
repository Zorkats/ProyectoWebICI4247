import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
   {
    path: 'auth', 
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'explore',
    loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExplorePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'destinations/:id', // La ruta con el parámetro :id
    loadChildren: () => import('./pages/destination-detail/destination-detail.module').then( m => m.DestinationDetailPageModule)
  },
  {
  path: 'poi/:id',
  loadChildren: () => import('./pages/poi-detail/poi-detail.module').then( m => m.PoiDetailPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mis-viajes',
    loadChildren: () => import('./pages/mis-viajes/mis-viajes.module').then(m => m.MisViajesPageModule),
    canActivate: [AuthGuard]
  },
  {
  path: 'trips/:id',
  loadChildren: () => import('./pages/trip-detail/trip-detail.module').then( m => m.TripDetailPageModule)
},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'crear-viaje',
    loadChildren: () => import('./pages/crear-viaje/crear-viaje.module').then( m => m.CrearViajePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'destination-detail',
    loadChildren: () => import('./pages/destination-detail/destination-detail.module').then( m => m.DestinationDetailPageModule)
  },
  {
    path: 'poi-detail',
    loadChildren: () => import('./pages/poi-detail/poi-detail.module').then( m => m.PoiDetailPageModule)
  },
  {
    path: 'trip-detail',
    loadChildren: () => import('./pages/trip-detail/trip-detail.module').then( m => m.TripDetailPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
