import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';

import { SideBarComponent } from '../../components/side-bar/side-bar.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: false
})
export class ExplorePage implements OnInit {
  @ViewChild(SideBarComponent) sidebar!: SideBarComponent;

  searchCategorySegment: string = 'all';
  exploreCategorySegment: string = 'beaches';
  searchTerm: string = '';

  public allDestinations: Destination[] = [];
  public popularDestinations: Destination[] = [];
  public beachDestinations: Destination[] = [];
  public mountainDestinations: Destination[] = [];
  public cityDestinations: Destination[] = [];
  public trendingDestinations: Destination[] = [];

  public isLoading: boolean = true;

  constructor(
    private destinationService: DestinationService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadDestinations();
  }

  async loadDestinations() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Descubriendo destinos...',
      spinner: 'crescent'
    });
    await loading.present();

    this.destinationService.getDestinations(1, 30)
      .pipe(finalize(() => {
        this.isLoading = false;
        loading.dismiss();
      }))
      .subscribe({
        next: response => {
          this.allDestinations = response.destinations;

          this.distributeDestinations();
        },
        error: err => {
          console.error('Error al cargar destinos:', err)
        }
      });
  }


  distributeDestinations(): void {
  
    this.popularDestinations = this.allDestinations.slice(0, 8);
    this.trendingDestinations = this.allDestinations.slice(0, 4);
    this.beachDestinations = this.allDestinations.filter(d => d.category?.name.toLowerCase() === 'playa');
    this.mountainDestinations = this.allDestinations.filter(d => d.category?.name.toLowerCase() === 'montaña');
    this.cityDestinations = this.allDestinations.filter(d => d.category?.name.toLowerCase() === 'ciudad');
  }

  performSearch() {
   
  }
  createAiItinerary() {
  
  }
  viewAll(type: string) {
    
  }
}