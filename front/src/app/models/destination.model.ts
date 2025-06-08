export interface Destination {
  id: number;
  name: string;
  description: string | null;
  country: string | null;
  main_image_url: string | null;
  category_id: number;
  category?: { // La relación `category` que incluyes en el backend
    id: number;
    name: string;
  };
}