import { Component, Input, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/viaje.model';

@Component({
  selector: 'app-tarjeta-viaje',
  templateUrl: './tarjeta-viaje.component.html',
  styleUrls: ['./tarjeta-viaje.component.scss'],
  standalone: false
})
export class TarjetaViajeComponent  implements OnInit {
  // @Input() viajes: Viaje[] = [];
  @Input() viaje!:Viaje; 

  constructor() { }

  ngOnInit() {}

}
