// src/app/pages/mis-viajes/mis-viajes.page.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { Viaje } from 'src/app/models/viaje.model';
import { TripService } from 'src/app/services/trip.service';
import { SideBarComponent } from '../../components/side-bar/side-bar.component'; // Corregido 'shared' a 'components' si aplica
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
  standalone: false
})
export class MisViajesPage implements OnInit {
  @ViewChild(SideBarComponent) sidebar!: SideBarComponent;

  viajes: Viaje[] = [];
  isLoading = true;

 
  constructor(
    private tripService: TripService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadTrips();
  }

  ionViewWillEnter() {
    this.loadTrips();
  }

  loadTrips() {
    this.isLoading = true;
    this.tripService.getUserTrips().subscribe({
      next: data => {
        this.viajes = data;
        this.isLoading = false;
      },
      error: async (error) => {
        console.error('Error al cargar los viajes', error);
        this.isLoading = false;
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudieron cargar tus viajes. Por favor, intenta de nuevo.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }
}