import { MigrationInterface, QueryRunner } from 'typeorm';

import { TipoCarousel } from '../entities/tipoCarousel.entity';

export class SeedTipoCarousel1647256009749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tipoCarouseles = [
      {
        nombre: 'Home',
      },
      {
        nombre: 'Servicios',
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(TipoCarousel)
      .values(tipoCarouseles)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(TipoCarousel);
  }
}
