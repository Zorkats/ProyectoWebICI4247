import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-trip',
  templateUrl: './plan-trip.page.html',
  styleUrls: ['./plan-trip.page.scss'],
  standalone: false
})
export class PlanTripPage implements OnInit {
  destino: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  presupuesto: number = 0;
  intereses: string[] = [];

  constructor() { }

  ngOnInit() {}

  onGenerarItinerario() {
    console.log('Generando itinerario para', this.destino);
    // Aquí se llamará al algoritmo que genere el itinerario basado en los criterios
  }
}
