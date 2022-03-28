import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from './../entities/usuario.entity';
import { Hotel } from '../entities/hotel.entity';

export class SeedUsuarioAdmin1646867024536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hotel = await queryRunner.manager
      .createQueryBuilder()
      .select('hotel')
      .from(Hotel, 'hotel')
      .where('hotel.id = :hotelId', { hotelId: 1 })
      .getOne();

    const usuarioAdmin = {
      id: 1,
      nombre: `admin-${hotel.nombre_uri}`,
      apellido: `admin-${hotel.nombre_uri}`,
      email: `admin-${hotel.nombre_uri}@mail.com`,
      nick: `admin-${hotel.nombre_uri}`,
      password: await bcrypt.hash('admin123', 10),
      hotel: hotel,
    };
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Usuario)
      .values(usuarioAdmin)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(Usuario);
  }
}
