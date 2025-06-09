import { Component, OnInit } from '@angular/core';
import { Viaje } from '../../models/viaje.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  
  // NUEVO: Propiedades para manejar el estado
  public currentUser$ = this.authService.currentUser$;
  public nextTrip: Viaje | null = null;
  public isLoading = true;
  public errorLoadingTrips = false;

  constructor(
    private authService: AuthService,
    private tripService: TripService
  ) {}

  // CAMBIO: ngOnInit es un mejor lugar para la lógica de inicialización
  ngOnInit() {
    this.loadNextTrip();
  }

  loadNextTrip() {
    this.isLoading = true;
    this.errorLoadingTrips = false;

    this.tripService.getNextTrip().subscribe({
      next: (trip) => {
        this.nextTrip = trip;
        this.isLoading = false;
      },
      error: (err) => {
        // Un error 404 significa que no hay próximos viajes, lo cual es normal.
        if (err.status !== 404) {
          console.error('Error al cargar el próximo viaje', err);
          this.errorLoadingTrips = true; // Marcamos un error real
        }
        this.nextTrip = null; // Nos aseguramos de que no haya viaje para mostrar
        this.isLoading = false;
      },
    });
  }
}