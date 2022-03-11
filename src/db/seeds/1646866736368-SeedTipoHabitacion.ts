import { MigrationInterface, QueryRunner } from 'typeorm';

import { TipoHabitacion } from './../entities/tipoHabitacion.entity';

export class SeedTipoHabitacion1646866736368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tipoHabitaciones = [
      {
        nombre: 'Simple',
      },
      {
        nombre: 'Doble',
      },
      {
        nombre: 'Triple',
      },
      {
        nombre: 'Suite',
      },
      {
        nombre: 'Suite Presidencial',
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(TipoHabitacion)
      .values(tipoHabitaciones)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(TipoHabitacion);
  }
}
