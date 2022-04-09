import { MigrationInterface, QueryRunner } from 'typeorm';

export class fotosnonombre1649527616378 implements MigrationInterface {
  name = 'fotosnonombre1649527616378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" DROP COLUMN "nombre"`,
    );
    await queryRunner.query(`ALTER TABLE "foto_hotel" DROP COLUMN "nombre"`);
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" DROP CONSTRAINT "UQ_3179458cef23c4f806276d9a708"`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_hotel" DROP CONSTRAINT "UQ_3183260184741877c6dae52c003"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "foto_hotel" ADD CONSTRAINT "UQ_3183260184741877c6dae52c003" UNIQUE ("path")`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" ADD CONSTRAINT "UQ_3179458cef23c4f806276d9a708" UNIQUE ("path")`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_hotel" ADD "nombre" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" ADD "nombre" character varying NOT NULL`,
    );
  }
}
