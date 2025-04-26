import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
  standalone:false
})
export class CrearViajePage implements OnInit {

  constructor() { }

  ngOnInit() {
    const hoy = new Date();
    this.fechaInicio = hoy.toISOString().split('T')[0];
  }

  fechaInicio:string = new Date().toISOString();

  fechaFin:string | null = null;


}
