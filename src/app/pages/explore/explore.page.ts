// explore.page.ts
import { Component, OnInit } from '@angular/core';

interface Destination {
  id: number;
  name: string;
  region: string;
  image: string;
  badge: string;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: false
})
export class ExplorePage implements OnInit {
  menuType: string = 'overlay';
  // Propiedad para el valor del segmento de búsqueda
  searchCategorySegment: string = 'all';
  // Propiedad para el valor del segmento de exploración por categoría
  exploreCategorySegment: string = 'beaches';
  // Propiedad para el término de búsqueda
  searchTerm: string = '';

  // Destinos populares (usamos la interfaz Destination)
  popularDestinations: Destination[] = [
    { id: 1, name: "Patagonia", region: "Sudamérica", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Aventura" },
    { id: 2, name: "Barcelona", region: "Europa", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Cultural" },
    { id: 3, name: "Bali", region: "Asia", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Playas" },
    { id: 4, name: "Queenstown", region: "Oceanía", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Aventura" },
  ];

  // Destinos por categoría
  beachDestinations: Destination[] = [
    { id: 101, name: "Islas Maldivas", region: "Asia", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Playas Paradisíacas" },
    { id: 102, name: "Cancún", region: "Norteamérica", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Resort" },
    { id: 103, name: "Santorini", region: "Europa", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Vistas al Mar" },
    { id: 104, name: "Phi Phi Islands", region: "Asia", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Aguas Cristalinas" },
  ];

  mountainDestinations: Destination[] = [
    { id: 201, name: "Alpes Suizos", region: "Europa", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Montañas" },
    { id: 202, name: "Machu Picchu", region: "Sudamérica", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Histórico" },
    { id: 203, name: "Himalaya", region: "Asia", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Trekking" },
    { id: 204, name: "Montañas Rocosas", region: "Norteamérica", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Naturaleza" },
  ];

  cityDestinations: Destination[] = [
    { id: 301, name: "Tokio", region: "Asia", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Urbano" },
    { id: 302, name: "Nueva York", region: "Norteamérica", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Cosmopolita" },
    { id: 303, name: "París", region: "Europa", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Romántico" },
    { id: 304, name: "Ciudad del Cabo", region: "África", image: "https://ionicframework.com/docs/img/demos/card-media.png", badge: "Vistas" },
  ];

  // Usamos los populares también para la sección de tendencias
  trendingDestinations: Destination[] = [...this.popularDestinations];

  constructor() { }

  ngOnInit() {
    // Lógica de inicialización si es necesaria
  }

  // Método para manejar el clic del botón de búsqueda (opcional, depende de cómo implementes la búsqueda)
  performSearch() {
    console.log('Buscando:', this.searchTerm, 'en categoría:', this.searchCategorySegment);
    // Aquí iría la lógica para filtrar o navegar a resultados
  }

  // Método para el botón "Crear itinerario con IA"
  createAiItinerary() {
    console.log('Navegando a la creación de itinerario con IA...');
    // Aquí iría la lógica de navegación o modal
  }

  // Método para los botones "Ver todos"
  viewAll(type: string) {
    console.log(`Navegando para ver todos los destinos de tipo: ${type}`);
    // Aquí iría la lógica de navegación a una página de listado completo
  }
}
