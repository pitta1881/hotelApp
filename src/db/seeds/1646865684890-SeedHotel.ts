import { MigrationInterface, QueryRunner } from 'typeorm';

import { Hotel } from './../entities/hotel.entity';
import { IHotel } from '../../api/hoteles/hoteles.interface';

export class SeedHotel1646865684890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hotel: IHotel = {
      nombre: 'Hotel Pato',
      descripcion_home: 'Esta es la descripcion del home',
      descripcion_ubi: 'Esta es la descripcion de la ubicacion',
      telefono_1: '0112134564',
      email: 'calle falsa 123',
      direccion: 'Gastronomía',
      lat_lng: [-34.603017070009386, -58.95253488566254],
    };
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Hotel)
      .values(hotel)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(Hotel);
  }
}
