// src/app/pages/destination-detail/destination-detail.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { Destination } from '../../models/destination.model';
import { DestinationService } from '../../services/destination.service';
import { PointOfInterest } from '../../models/poi.model';

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.page.html',
  styleUrls: ['./destination-detail.page.scss'],
  standalone: false
})
export class DestinationDetailPage implements OnInit {

  public destination: Destination | null = null;
  public isLoading: boolean = true;
  public errorMessage: string | null = null;

  public poisLoading: boolean = false;
  public selectedTab: string = 'info'; // 'info', 'attractions', 'restaurants'
  public attractions: PointOfInterest[] = [];
  public restaurants: PointOfInterest[] = [];
  public museums: PointOfInterest[] = [];
  public parks: PointOfInterest[] = [];

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    // Es mejor usar ionViewWillEnter en Ionic para que recargue si se navega hacia atrás y adelante
  }

  async ionViewWillEnter() {
    this.loadDestinationDetails();
  }

  async loadDestinationDetails() {
    this.isLoading = true;
    this.errorMessage = null;

    // Crear y mostrar el indicador de carga
    const loading = await this.loadingCtrl.create({
      message: 'Cargando detalles del destino...',
      spinner: 'crescent'
    });
    await loading.present();

    // 1. Obtener el ID de la URL
    const destinationIdString = this.route.snapshot.paramMap.get('id');
    
    if (!destinationIdString) {
      this.errorMessage = 'No se encontró el ID del destino.';
      this.isLoading = false;
      loading.dismiss();
      // Opcional: redirigir si no hay ID
      // this.router.navigate(['/explore']); 
      return;
    }

    const destinationId = parseInt(destinationIdString, 10);

    // 2. Llamar al servicio con el ID
    this.destinationService.getDestinationDetails(destinationId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          loading.dismiss(); // Ocultar el indicador de carga
        })
      )
      .subscribe({
        next: (data) => {
          // 3. Guardar los datos del destino
          this.destination = data;
          this.loadAllPois(destinationId);
        },
        error: (err) => {
          console.error('Error al cargar detalles del destino:', err);
          if (err.status === 404) {
            this.errorMessage = 'El destino que buscas no existe o no se pudo encontrar.';
          } else {
            this.errorMessage = 'Ocurrió un error al cargar los datos. Por favor, intenta de nuevo.';
          }
        }
      });
  }

  // --- AÑADE ESTE NUEVO MÉTODO ---
  // --- MÉTODO ACTUALIZADO CON forkJoin ---
  loadAllPois(destinationId: number) {
    this.poisLoading = true;

    const poiRequests = {
      attractions: this.destinationService.getPoisByDestination(destinationId, 'Atracción Turística'),
      restaurants: this.destinationService.getPoisByDestination(destinationId, 'Restaurante'),
      museums: this.destinationService.getPoisByDestination(destinationId, 'Museo'),
      parks: this.destinationService.getPoisByDestination(destinationId, 'Parque')
    };

    forkJoin(poiRequests).pipe(
      finalize(() => {
        this.poisLoading = false;
      })
    ).subscribe({
      next: (responses) => {
        this.attractions = responses.attractions;
        this.restaurants = responses.restaurants;
        this.museums = responses.museums;
        this.parks = responses.parks;
      },
      error: (err) => {
        console.error('Error al cargar los Puntos de Interés', err);
        // Opcional: mostrar un mensaje de error para los POI
      }
    });
  }
}