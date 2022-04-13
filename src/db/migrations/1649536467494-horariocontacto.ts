import { MigrationInterface, QueryRunner } from 'typeorm';

export class horariocontacto1649536467494 implements MigrationInterface {
  name = 'horariocontacto1649536467494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "horario_contacto" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hotel" DROP COLUMN "horario_contacto"`,
    );
  }
}
