// src/app/pages/trip-detail/trip-detail.page.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular'; // Añade Toast y Alert
import { finalize } from 'rxjs';
import { TripService } from 'src/app/services/trip.service';
import { Viaje } from 'src/app/models/viaje.model';
import { ItineraryItem } from 'src/app/models/itinerary.model';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
  standalone: false
})
export class TripDetailPage {
  trip: Viaje | null = null;
  groupedItinerary: { [day: number]: ItineraryItem[] } = {};
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.loadTripDetails();
  }

  async loadTripDetails() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({ message: 'Cargando itinerario...' });
    await loading.present();

    const tripId = Number(this.route.snapshot.paramMap.get('id'));

    this.tripService.getTripDetails(tripId).pipe(
      finalize(() => {
        this.isLoading = false;
        loading.dismiss();
      })
    ).subscribe(data => {
      this.trip = data;
      this.groupItineraryByDay();
    });
  }

  groupItineraryByDay() {
    this.groupedItinerary = {}; // Limpia antes de agrupar
    if (this.trip?.itineraryItems) {
      for (const item of this.trip.itineraryItems) {
        const day = item.day_number;
        if (!this.groupedItinerary[day]) {
          this.groupedItinerary[day] = [];
        }
        this.groupedItinerary[day].push(item);
      }
    }
  }

  // Helper para obtener los días ordenados para el *ngFor
  get itineraryDays(): number[] {
    return Object.keys(this.groupedItinerary).map(Number).sort((a, b) => a - b);
  }

navigateToPoi(poiId: number) {
  this.router.navigate(['/poi', poiId]);}
   
async deleteItem(itemId: number) {
  const alert = await this.alertCtrl.create({
    header: 'Confirmar',
    message: '¿Estás seguro de que quieres eliminar este lugar de tu itinerario?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.executeDelete(itemId);
        }
      }
    ]
  });
  await alert.present();
}

private async executeDelete(itemId: number) {
  const loading = await this.loadingCtrl.create({ message: 'Eliminando...' });
  await loading.present();


    this.tripService.deleteItineraryItem(itemId)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe({
        next: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Lugar eliminado del itinerario.',
            duration: 2000,
            color: 'success'
          });
          toast.present();
          // Recargamos los detalles del viaje para refrescar la lista en la UI
          this.loadTripDetails();
        },
        error: async (err) => {
          console.error('Error al eliminar el item:', err);
          const toast = await this.toastCtrl.create({
            message: 'No se pudo eliminar el lugar.',
            duration: 3000,
            color: 'danger'
          });
          toast.present();
        }
      });
  }
}