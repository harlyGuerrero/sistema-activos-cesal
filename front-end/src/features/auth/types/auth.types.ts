// auth.types.ts

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  auth: number;
  rol: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  token: string;
  user: User;
}