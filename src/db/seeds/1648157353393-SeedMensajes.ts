import { MigrationInterface, QueryRunner } from 'typeorm';

import { Hotel } from '../entities/hotel.entity';
import { Mensaje } from '../entities/mensaje.entity';

export class SeedMensajes1648157353393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hotel = await queryRunner.manager
      .createQueryBuilder()
      .select('hotel')
      .from(Hotel, 'hotel')
      .where('hotel.id = :hotelId', { hotelId: 1 })
      .getOne();

    const mensajes = [
      {
        id: 1,
        nombre: `test nom 1`,
        apellido: `test ape 1`,
        email: `test1@mail.com`,
        checkin: `2022-05-20`,
        checkout: '2022-06-01',
        pais: 'AR',
        adultos: 2,
        menores: 0,
        mensaje: 'Este es un mensaje de prueba seed 1',
        hotel: hotel,
      },
      {
        id: 2,
        nombre: `test nom 2`,
        apellido: `test ape 2`,
        email: `test2@mail.com`,
        checkin: `2022-05-25`,
        checkout: '2022-06-05',
        pais: 'AR',
        adultos: 2,
        menores: 2,
        mensaje: 'Este es un mensaje de prueba seed 2',
        hotel: hotel,
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Mensaje)
      .values(mensajes)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(Mensaje);
  }
}
