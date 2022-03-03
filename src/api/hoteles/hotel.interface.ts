export interface IHotel {
  id: number;
  nombre: string;
  descripcion_home: string;
  descripcion_ubi: string;
  telefono_1: string;
  telefono_2?: string;
  email: string;
  direccion: string;
  latLng: [number, number];
}
