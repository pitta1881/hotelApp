import { MigrationInterface, QueryRunner } from 'typeorm';

import { Hotel } from '../entities/hotel.entity';
import { Servicio } from '../entities/servicio.entity';

export class SeedServicios1646914111274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hotel = await queryRunner.manager
      .createQueryBuilder()
      .select('hotel')
      .from(Hotel, 'hotel')
      .where('hotel.id = :hotelId', { hotelId: 1 })
      .getOne();

    const servicios = [
      {
        id: 1,
        nombre: 'WiFi',
        servInstal: false,
        icon_path: '/icon_wifi.png',
        hotel: hotel,
      },
      {
        id: 2,
        nombre: 'Desayuno',
        servInstal: false,
        icon_path: '/icon_desayuno.png',
        hotel: hotel,
      },
      {
        id: 3,
        nombre: 'Spa',
        servInstal: true,
        icon_path: '/icon_spa.png',
        hotel: hotel,
      },
      {
        id: 4,
        nombre: 'Estacionamiento',
        servInstal: true,
        icon_path: '/icon_estacionamiento.png',
        hotel: hotel,
      },
      {
        id: 5,
        nombre: 'TV',
        servInstal: false,
        icon_path: '/icon_tv.png',
        hotel: hotel,
      },
      {
        id: 6,
        nombre: 'Frigobar',
        servInstal: false,
        icon_path: '/icon_frigobar.png',
        hotel: hotel,
      },
      {
        id: 7,
        nombre: 'Secador',
        servInstal: false,
        icon_path: '/icon_secador.png',
        hotel: hotel,
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Servicio)
      .values(servicios)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(Servicio);
  }
}
