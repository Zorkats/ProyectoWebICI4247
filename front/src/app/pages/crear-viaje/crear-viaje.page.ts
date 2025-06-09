import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

import { Destination } from '../../models/destination.model';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
  standalone: false
})
export class CrearViajePage implements OnInit {
  tripForm: FormGroup;
  private allDestinations: Destination[] = [];
  public filteredDestinations: Destination[] = [];
  public searchTerm: string = '';

  public intereses: string[] = [
    'Ciudad', 'Cultura', 'Patrimonio', 'Costa', 'Playa', 'Caribe', 'Resort', 
    'Fiesta', 'Montaña', 'Trekking', 'Naturaleza', 'Patagonia', 'Aventura', 'Historia'
  ];
  public selectedInterests: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private destinationService: DestinationService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.tripForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      destination_id: [null, [Validators.required]],
      start_date: [new Date().toISOString(), [Validators.required]],
      end_date: [null, [Validators.required]],
      budget: [1200000, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadDestinations();
  }

  ionViewWillEnter() {
   this.resetForm();
  }

  resetForm() {
    this.tripForm.reset({
      name: '',
      destination_id: null,
      start_date: new Date().toISOString(),
      end_date: null,
      budget: 1200000
    });
    this.searchTerm = '';
    this.filteredDestinations = [];
    this.selectedInterests = {};
  }

  async loadDestinations() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando destinos...' });
    await loading.present();
    this.destinationService.getAllDestinationsForAutocomplete()
      .pipe(finalize(() => loading.dismiss()))
      .subscribe({
        next: (destinations: Destination[]) => {
          this.allDestinations = destinations;
        },
        error: (err: any) => {
          console.error('Error al cargar destinos:', err);
        }
      });
  }

  filterDestinations() {
    if (!this.searchTerm.trim()) {
      this.filteredDestinations = [];
      return;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredDestinations = this.allDestinations.filter(dest =>
      dest.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  selectDestination(destination: Destination) {
    this.tripForm.get('destination_id')?.setValue(destination.id);
    this.searchTerm = `${destination.name}, ${destination.country}`;
    this.filteredDestinations = [];
  }

  toggleInterest(interes: string) {
    this.selectedInterests[interes] = !this.selectedInterests[interes];
  }
  
  async createTrip() {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      this.presentAlert('Formulario Incompleto', 'Por favor, completa todos los campos requeridos.');
      return;
    }
    const loading = await this.loadingCtrl.create({ message: 'Creando tu viaje...' });
    await loading.present();

    const formValue = this.tripForm.value;
    const tripData = {
      ...formValue,
      status_id: 1, 
      description: Object.keys(this.selectedInterests).filter(k => this.selectedInterests[k]).join(', '),
      image_url: null 
    };

    this.http.post('http://localhost:3000/api/trips', tripData, { withCredentials: true })
      .pipe(finalize(() => loading.dismiss()))
      .subscribe({
        next: async (response: any) => {
          const toast = await this.toastCtrl.create({
            message: '¡Viaje creado exitosamente!',
            duration: 3000,
            color: 'success',
            position: 'top'
          });
          await toast.present();
          this.router.navigate(['/mis-viajes']);
        },
        error: async (err) => {
          const message = err.error?.message || 'Ocurrió un error inesperado.';
          this.presentAlert('Error al Crear Viaje', message);
        }
      });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}