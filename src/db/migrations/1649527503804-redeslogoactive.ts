import { MigrationInterface, QueryRunner } from 'typeorm';

export class redeslogoactive1649527503804 implements MigrationInterface {
  name = 'redeslogoactive1649527503804';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "activo" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "logo_path" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "facebook" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "twitter" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "hotel" ADD "instagram" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "instagram"`);
    await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "twitter"`);
    await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "facebook"`);
    await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "logo_path"`);
    await queryRunner.query(`ALTER TABLE "hotel" DROP COLUMN "activo"`);
  }
}
