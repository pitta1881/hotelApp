import { MigrationInterface, QueryRunner } from 'typeorm';

export class pptNullsFields1653520601768 implements MigrationInterface {
  name = 'pptNullsFields1653520601768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paypertop" ALTER COLUMN "titular" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "paypertop" ALTER COLUMN "email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "paypertop" ALTER COLUMN "url" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paypertop" ALTER COLUMN "email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "paypertop" ALTER COLUMN "titular" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "paypertop" ALTER COLUMN "url" SET NOT NULL`,
    );
  }
}
