export interface IHabitacion {
  id: number;
  nombre: string;
  descripcion_hab: string;
  descripcion_camas: string;
  max_pax: number;
  tamanio_m2: number;
  ocupado?: boolean;
  hotelId: number;
  tipoHabitacionId: number;
}
