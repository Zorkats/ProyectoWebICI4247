import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
  standalone: false
})
export class MisViajesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menuType: string = 'overlay';

}
