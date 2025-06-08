// NUEVO: Definimos una interfaz para el usuario que recibimos del backend.
export interface User {
  id: number;
  name: string;
  email: string;

}

export interface AuthResponse {
  message: string;
  data: User;
}