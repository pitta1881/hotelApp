import { MigrationInterface, QueryRunner } from 'typeorm';

import { TipoPPT } from './../entities/tipoPPT.entity';

export class SeedTipoPPT1646866499063 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tipoPPTs = [
      {
        nombre: 'Gastronomía',
      },
      {
        nombre: 'Atracciones',
      },
      {
        nombre: 'Supermercados',
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(TipoPPT)
      .values(tipoPPTs)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(TipoPPT);
  }
}
