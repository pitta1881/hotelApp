export interface IPaypertop {
  id: number;
  titular: string;
  razon_social: string;
  email: string;
  descripcion: string;
  url: string;
  abono_mensual: number;
  lat_lng: [number, number];
  activo?: boolean;
  hotelId: number;
  tipoPPTId: number;
}
