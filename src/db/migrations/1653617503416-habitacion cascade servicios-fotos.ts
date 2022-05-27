import { MigrationInterface, QueryRunner } from 'typeorm';

export class habitacionCascadeServiciosFotos1653617503416
  implements MigrationInterface
{
  name = 'habitacionCascadeServiciosFotos1653617503416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" DROP CONSTRAINT "FK_1369fc969234982edf1ecad5576"`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" DROP CONSTRAINT "FK_aadbfab5455ec1f6c0c1376115e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" DROP CONSTRAINT "FK_1912fc593035d73c5ac10dcb21c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" ADD CONSTRAINT "FK_1369fc969234982edf1ecad5576" FOREIGN KEY ("habitacionId", "hotelId") REFERENCES "habitacion"("id","hotelId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" ADD CONSTRAINT "FK_1912fc593035d73c5ac10dcb21c" FOREIGN KEY ("servicioId", "servicioHotelId") REFERENCES "servicio"("id","hotelId") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" ADD CONSTRAINT "FK_aadbfab5455ec1f6c0c1376115e" FOREIGN KEY ("habitacionId", "habitacionHotelId") REFERENCES "habitacion"("id","hotelId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" DROP CONSTRAINT "FK_aadbfab5455ec1f6c0c1376115e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" DROP CONSTRAINT "FK_1912fc593035d73c5ac10dcb21c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" DROP CONSTRAINT "FK_1369fc969234982edf1ecad5576"`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" ADD CONSTRAINT "FK_1912fc593035d73c5ac10dcb21c" FOREIGN KEY ("servicioId", "servicioHotelId") REFERENCES "servicio"("id","hotelId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" ADD CONSTRAINT "FK_aadbfab5455ec1f6c0c1376115e" FOREIGN KEY ("habitacionId", "habitacionHotelId") REFERENCES "habitacion"("id","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" ADD CONSTRAINT "FK_1369fc969234982edf1ecad5576" FOREIGN KEY ("habitacionId", "hotelId") REFERENCES "habitacion"("id","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
