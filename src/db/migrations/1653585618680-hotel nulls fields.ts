import {MigrationInterface, QueryRunner} from "typeorm";

export class hotelNullsFields1653585618680 implements MigrationInterface {
    name = 'hotelNullsFields1653585618680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "logo_path" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "horario_contacto" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "horario_contacto" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotel" ALTER COLUMN "logo_path" DROP NOT NULL`);
    }

}
