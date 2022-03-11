export interface IMensaje {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  checkin: string;
  checkout: string;
  pais: string;
  adultos: number;
  menores?: number;
  mensaje: string;
  leido?: boolean;
  hotelId: number;
}
