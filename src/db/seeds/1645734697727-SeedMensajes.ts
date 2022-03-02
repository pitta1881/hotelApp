import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMensajes1645734697727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO mensaje (nombre, apellido, email, checkin, checkout, pais, adultos, mensaje) VALUES ('John', 'Doe', 'jdoe@mail.com','2022-02-18 00:00:00', '2022-02-19 00:00:00', 'AR', 2, 'este es el mensaje');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DELETE FROM mensaje;');
  }
}
