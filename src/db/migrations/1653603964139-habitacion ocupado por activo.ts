import { MigrationInterface, QueryRunner } from 'typeorm';

export class habitacionOcupadoPorActivo1653603964139
  implements MigrationInterface
{
  name = 'habitacionOcupadoPorActivo1653603964139';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "habitacion" RENAME COLUMN "ocupado" TO "activo"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "habitacion" RENAME COLUMN "activo" TO "ocupado"`,
    );
  }
}
