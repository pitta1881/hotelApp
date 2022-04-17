import { MigrationInterface, QueryRunner } from 'typeorm';

export class huespednullablefields1649527853338 implements MigrationInterface {
  name = 'huespednullablefields1649527853338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "huesped" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "huesped" ALTER COLUMN "telefono" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "huesped" ALTER COLUMN "telefono" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "huesped" ALTER COLUMN "email" SET NOT NULL`,
    );
  }
}
