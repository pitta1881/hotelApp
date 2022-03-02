import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsuario1645784231059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "INSERT INTO usuario (nombre, apellido, email, nick, password) VALUES ('admin', 'admin', 'pitta1881@gmail.com','admin', 'admin');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DELETE FROM usuario;');
  }
}
