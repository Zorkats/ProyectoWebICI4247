import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/viaje.model';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
  standalone: false
})
export class MisViajesPage implements OnInit {

  Viajes: Viaje[] = [];
  constructor() {
    this.Viajes = [
      {
        id: 1,
        nombre: 'Viaje a la playa',
        destino: 'Playa del Carmen',
        fechaInicio: '2023-12-01',
        fechaFin: '2023-12-10',
        presupuesto: 5000,
        estado: 'Pendiente'
      },
      {
        id: 2,
        nombre: 'Viaje a la montaña',
        destino: 'Cerro de la Silla',
        fechaInicio: '2023-11-15',
        fechaFin: '2023-11-20',
        presupuesto: 3000,
        estado: 'Completado'
      },
      {
        id: 3,
        nombre: 'Viaje a la ciudad',
        destino: 'Ciudad de México',
        fechaInicio: '2023-10-20',
        fechaFin: '2023-10-25',
        presupuesto: 7000,
        estado: 'Cancelado'
      },
      {
        id: 4,
        nombre: 'Viaje a la selva',
        destino: 'Selva Lacandona',
        fechaInicio: '2023-09-05',
        fechaFin: '2023-09-12',
        presupuesto: 4000,
        estado: 'Pendiente'
      },
      {
        id: 5,
        nombre: 'Viaje a la montaña',
        destino: 'Cerro de la Silla',
        fechaInicio: '2023-11-15',
        fechaFin: '2023-11-20',
        presupuesto: 3000,
        estado: 'Completado'
      },
      {
        id: 6,
        nombre: 'Viaje a la ciudad',
        destino: 'Ciudad de México',
        fechaInicio: '2023-10-20',
        fechaFin: '2023-10-25',
        presupuesto: 7000,
        estado: 'Cancelado'
      },
      {
        id: 7,
        nombre: 'Viaje a la selva',
        destino: 'Selva Lacandona',
        fechaInicio: '2023-09-05',
        fechaFin: '2023-09-12',
        presupuesto: 4000,
        estado: 'Pendiente'
      }
    ];
   
  }

  ngOnInit() {
  }


}
