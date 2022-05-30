import { MigrationInterface, QueryRunner } from 'typeorm';

export class reservasHuespedesFixes1653928820974 implements MigrationInterface {
  name = 'reservasHuespedesFixes1653928820974';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reserva" DROP CONSTRAINT "FK_2626c9a5e1a74d06d6530b58fac"`,
    );
    await queryRunner.query(
      `CREATE TABLE "huesped_x_reserva" ("huespedId" integer NOT NULL, "reservaId" integer NOT NULL, "reservaHotelId" integer NOT NULL, CONSTRAINT "PK_a413381d68d5ad7f837e04d6f4f" PRIMARY KEY ("huespedId", "reservaId", "reservaHotelId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8727f34b1cd4eb32e80a21cdd1" ON "huesped_x_reserva" ("huespedId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0de44de380b9e8bb5d8e894340" ON "huesped_x_reserva" ("reservaId", "reservaHotelId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" ADD "habitacionHotel" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" DROP CONSTRAINT "PK_b3ef20d1eb78569318849baf95d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" ADD CONSTRAINT "PK_efa2b62000b895f73e1a5fc83c7" PRIMARY KEY ("id", "hotelId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" ALTER COLUMN "monto_pagado" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" ADD CONSTRAINT "FK_d41ae7be6708771382ef804a2c6" FOREIGN KEY ("habitacionId", "habitacionHotel") REFERENCES "habitacion"("id","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" ADD CONSTRAINT "FK_2cd7abf50604ba257ef1aa3d7ed" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "huesped_x_reserva" ADD CONSTRAINT "FK_8727f34b1cd4eb32e80a21cdd1c" FOREIGN KEY ("huespedId") REFERENCES "huesped"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "huesped_x_reserva" ADD CONSTRAINT "FK_0de44de380b9e8bb5d8e8943402" FOREIGN KEY ("reservaId", "reservaHotelId") REFERENCES "reserva"("id","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "huesped_x_reserva" DROP CONSTRAINT "FK_0de44de380b9e8bb5d8e8943402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "huesped_x_reserva" DROP CONSTRAINT "FK_8727f34b1cd4eb32e80a21cdd1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" DROP CONSTRAINT "FK_2cd7abf50604ba257ef1aa3d7ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" DROP CONSTRAINT "FK_d41ae7be6708771382ef804a2c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" DROP CONSTRAINT "PK_efa2b62000b895f73e1a5fc83c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" ADD CONSTRAINT "PK_b3ef20d1eb78569318849baf95d" PRIMARY KEY ("id", "habitacionId", "hotelId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" ALTER COLUMN "monto_pagado" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" DROP COLUMN "habitacionHotel"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0de44de380b9e8bb5d8e894340"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8727f34b1cd4eb32e80a21cdd1"`,
    );
    await queryRunner.query(`DROP TABLE "huesped_x_reserva"`);
    await queryRunner.query(
      `ALTER TABLE "reserva" ADD CONSTRAINT "FK_2626c9a5e1a74d06d6530b58fac" FOREIGN KEY ("habitacionId", "hotelId") REFERENCES "habitacion"("id","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
