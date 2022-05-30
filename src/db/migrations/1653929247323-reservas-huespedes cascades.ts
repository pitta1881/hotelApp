import {MigrationInterface, QueryRunner} from "typeorm";

export class reservasHuespedesCascades1653929247323 implements MigrationInterface {
    name = 'reservasHuespedesCascades1653929247323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "huesped_x_reserva" DROP CONSTRAINT "FK_0de44de380b9e8bb5d8e8943402"`);
        await queryRunner.query(`ALTER TABLE "huesped_x_reserva" DROP CONSTRAINT "FK_8727f34b1cd4eb32e80a21cdd1c"`);
        await queryRunner.query(`ALTER TABLE "huesped_x_reserva" ADD CONSTRAINT "FK_8727f34b1cd4eb32e80a21cdd1c" FOREIGN KEY ("huespedId") REFERENCES "huesped"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "huesped_x_reserva" ADD CONSTRAINT "FK_0de44de380b9e8bb5d8e8943402" FOREIGN KEY ("reservaId", "reservaHotelId") REFERENCES "reserva"("id","hotelId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "huesped_x_reserva" DROP CONSTRAINT "FK_0de44de380b9e8bb5d8e8943402"`);
        await queryRunner.query(`ALTER TABLE "huesped_x_reserva" DROP CONSTRAINT "FK_8727f34b1cd4eb32e80a21cdd1c"`);
        await queryRunner.query(`ALTER TABLE "huesped_x_reserva" ADD CONSTRAINT "FK_8727f34b1cd4eb32e80a21cdd1c" FOREIGN KEY ("huespedId") REFERENCES "huesped"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "huesped_x_reserva" ADD CONSTRAINT "FK_0de44de380b9e8bb5d8e8943402" FOREIGN KEY ("reservaId", "reservaHotelId") REFERENCES "reserva"("id","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
