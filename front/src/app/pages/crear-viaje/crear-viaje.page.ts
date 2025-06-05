import {Component, OnInit, ViewChild} from '@angular/core';
import {SideBarComponent} from "../../components/side-bar/side-bar.component";

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
  standalone:false
})
export class CrearViajePage implements OnInit {
  @ViewChild(SideBarComponent) sidebar!: SideBarComponent;

  constructor() { }

  ngOnInit() {
  }

}
