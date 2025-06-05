import {Component, OnInit, ViewChild} from '@angular/core';
import {SideBarComponent} from "../../components/side-bar/side-bar.component";
import {Viaje} from "../../models/viaje.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  @ViewChild(SideBarComponent) sidebar!: SideBarComponent;

  ngOnInit() {
  }

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
      }]
  }

}
