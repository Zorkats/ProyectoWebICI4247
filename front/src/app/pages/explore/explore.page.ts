import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';
import { PointOfInterest } from 'src/app/models/poi.model';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { SearchService, SearchResult } from '../../services/search.service';

import { register } from 'swiper/element/bundle';

// Llama a la función de registro FUERA de la clase del componente
register();

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
  public explorePoiCategory: string = 'Restaurante'; // Categoría por defecto
  public poisByCategory: PointOfInterest[] = [];
  public poisByCategoryLoading: boolean = false;

  public isLoading: boolean = true;

  // --- NUEVAS PROPIEDADES PARA LA BÚSQUEDA ---
  public searchResults: SearchResult[] = [];
  public searchPerformed: boolean = false; // Para saber si mostrar resultados o la vista inicial
  public isSearching: boolean = false;
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private destinationService: DestinationService,
    private loadingCtrl: LoadingController,
    private searchService: SearchService // <-- INYECTAR NUEVO SERVICIO
  ) {}

  ngOnInit() {
    // Configurar el "debouncing" para la búsqueda
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400), // Espera 400ms después de la última pulsación
      distinctUntilChanged(), // No busca si el término es el mismo
      switchMap(searchTerm => {
        this.isSearching = true;
        return this.searchService.search(searchTerm, this.searchCategorySegment).pipe(
          finalize(() => this.isSearching = false)
        );
      })
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    if (!this.searchPerformed) {
      this.loadDestinations();
    }
        this.loadPoisByCategory(); // Cargamos los POIs de la categoría por defecto

  }

  loadPoisByCategory() {
    this.poisByCategoryLoading = true;
    // Usamos el servicio de búsqueda, pasamos un término vacío para obtener todo de esa categoría
    this.searchService.search('', this.explorePoiCategory)
      .pipe(finalize(() => this.poisByCategoryLoading = false))
      .subscribe(results => {
        // Filtramos por si acaso la API devuelve otros tipos, aunque no debería
        this.poisByCategory = results.filter(r => r.type === 'poi') as PointOfInterest[];
      });
  }

  onPoiCategoryChange() {
    this.loadPoisByCategory();
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
    if (this.searchTerm.trim() === '') {
      this.searchPerformed = false;
      this.searchResults = [];
      return;
    }
    this.searchPerformed = true;
    this.searchSubject.next(this.searchTerm.trim());
  }

  // NUEVO: Manejar cambio de categoría para volver a buscar
  onCategoryChange() {
    if (this.searchPerformed) {
      this.performSearch();
    }
  }

  createAiItinerary() {
  
  }
  viewAll(type: string) {
    
  }
}