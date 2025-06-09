export interface DestinationCategory {
  id: number;
  name: string;
}

export interface Destination {
  id: number;
  name: string;
  description: string;
  country: string;
  main_image_url: string;
  category_id: number;
  category?: DestinationCategory; 
}

export interface DestinationsResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  destinations: Destination[];
}