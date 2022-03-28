import { MigrationInterface, QueryRunner } from 'typeorm';

import { Huesped } from '../entities/husped.entity';

export class SeedHuespedes1648233698471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const huespedes = [
      {
        nombre: 'Huesped test nom 1',
        apellido: 'Huesped test ape 1',
        email: 'huesped1@mail.com',
        dni: 12345678,
        fecha_nacimiento: '1990-05-10',
        telefono: '0111512345678',
      },
      {
        nombre: 'Huesped test nom 2',
        apellido: 'Huesped test ape 2',
        email: 'huesped2@mail.com',
        dni: 87654321,
        fecha_nacimiento: '1992-03-18',
        telefono: '0111587654321',
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Huesped)
      .values(huespedes)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(Huesped);
  }
}
