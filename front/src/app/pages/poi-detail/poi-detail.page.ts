// src/app/pages/poi-detail/poi-detail.page.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { PointOfInterest } from '../../models/poi.model';
import { PoiService } from '../../services/poi.service';

// --- AÑADE ESTOS IMPORTS ---
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { TripService } from '../../services/trip.service';
import { Viaje } from 'src/app/models/viaje.model';

@Component({
  selector: 'app-poi-detail',
  templateUrl: './poi-detail.page.html',
  styleUrls: ['./poi-detail.page.scss'],
  standalone: false
})
export class PoiDetailPage {
  public poi: PointOfInterest | null = null;
  public isLoading: boolean = true;
  public errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private poiService: PoiService,
    private loadingCtrl: LoadingController,
    // --- INYECTA ESTOS SERVICIOS ---
    private tripService: TripService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ionViewWillEnter() {
    this.loadPoiDetails();
  }

  async loadPoiDetails() {
    this.isLoading = true;
    this.errorMessage = null;

    const loading = await this.loadingCtrl.create({
      message: 'Cargando detalles...',
      spinner: 'crescent'
    });
    await loading.present();

    const poiIdString = this.route.snapshot.paramMap.get('id');
    if (!poiIdString) {
      this.errorMessage = 'No se encontró el ID del lugar.';
      this.isLoading = false;
      loading.dismiss();
      return;
    }
    const poiId = parseInt(poiIdString, 10);

    this.poiService.getPoiDetails(poiId).pipe(
      finalize(() => {
        this.isLoading = false;
        loading.dismiss();
      })
    ).subscribe({
      next: (data) => {
        this.poi = data;
      },
      error: (err) => {
        console.error('Error al cargar detalles del POI:', err);
        this.errorMessage = 'No se pudo cargar la información del lugar.';
      }
    });
  }

  async presentAddToTripSheet() {
    if (!this.poi) return;

    const loading = await this.loadingCtrl.create({ message: 'Cargando tus viajes...' });
    await loading.present();

    this.tripService.getUserTrips().pipe(finalize(() => loading.dismiss())).subscribe(async (trips) => {
      if (trips.length === 0) {
        // Si no hay viajes, informa al usuario
        const alert = await this.alertCtrl.create({
          header: 'No tienes viajes',
          message: 'Primero debes crear un viaje para poder añadirle lugares.',
          buttons: [
            { text: 'Cancelar' },
            { text: 'Crear Viaje', handler: () => { /* Navegar a la página de crear viaje */ } }
          ]
        });
        await alert.present();
        return;
      }

      // Crea un botón para cada viaje existente
      const tripButtons = trips.map(trip => ({
        text: trip.name,
        handler: () => {
          this.addPoiToSelectedTrip(trip);
        }
      }));

      // Muestra el Action Sheet con la lista de viajes
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Añadir a un viaje',
        buttons: [
          ...tripButtons,
          { text: 'Cancelar', role: 'cancel' }
        ]
      });
      await actionSheet.present();
    });
  }

  async addPoiToSelectedTrip(trip: Viaje) {
    // Por simplicidad, añadimos al día 1. Podrías pedirle al usuario que elija el día.
    const dayNumber = 1; 

    const loading = await this.loadingCtrl.create({ message: `Añadiendo a ${trip.name}...` });
    await loading.present();

    this.tripService.addPoiToTrip(trip.id, this.poi!.id, dayNumber)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(async () => {
        const toast = await this.toastCtrl.create({
          message: `${this.poi!.name} añadido a tu viaje!`,
          duration: 2000,
          color: 'success'
        });
        toast.present();
      });
  }
}