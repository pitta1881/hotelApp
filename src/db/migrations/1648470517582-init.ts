import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1648470517582 implements MigrationInterface {
  name = 'init1648470517582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tipo_ppt" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, CONSTRAINT "UQ_1e967e3745c6a0bfc63d0eeeeb4" UNIQUE ("nombre"), CONSTRAINT "PK_565fe92b6533f77ae1711031dfa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "paypertop" ("id" integer NOT NULL, "titular" character varying NOT NULL, "razon_social" character varying NOT NULL, "email" character varying NOT NULL, "descripcion" text NOT NULL, "url" text NOT NULL, "abono_mensual" double precision NOT NULL, "lat_lng" double precision array NOT NULL, "activo" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "hotelId" integer NOT NULL, "tipoPPTId" integer NOT NULL, CONSTRAINT "PK_d87034efe224edfdafbba0d638f" PRIMARY KEY ("id", "hotelId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario" ("id" integer NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "email" character varying NOT NULL, "nick" character varying NOT NULL, "password" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "hotelId" integer NOT NULL, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "UQ_ce3da8922121b0a5bd1fecbe2f1" UNIQUE ("nick"), CONSTRAINT "PK_980eb3d4e29c6eafa07a695e11c" PRIMARY KEY ("id", "hotelId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "mensaje" ("id" integer NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "email" character varying NOT NULL, "checkin" TIMESTAMP NOT NULL, "checkout" TIMESTAMP NOT NULL, "pais" character varying NOT NULL, "adultos" integer NOT NULL, "menores" integer NOT NULL DEFAULT '0', "mensaje" text NOT NULL, "leido" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "hotelId" integer NOT NULL, CONSTRAINT "PK_a75b803e5705ba675ec82427867" PRIMARY KEY ("id", "hotelId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "servicio" ("id" integer NOT NULL, "nombre" character varying NOT NULL, "servInstal" boolean NOT NULL DEFAULT false, "icon_path" character varying NOT NULL, "hotelId" integer NOT NULL, CONSTRAINT "UQ_20f03be6b4f4f61b0485182c1e5" UNIQUE ("nombre"), CONSTRAINT "PK_fd058af0cf1a50f88508391ec4c" PRIMARY KEY ("id", "hotelId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tipo_carousel" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, CONSTRAINT "UQ_1aa610f4fe90afc741e93cac95d" UNIQUE ("nombre"), CONSTRAINT "PK_aa57df12df480048abe05c706c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "foto_hotel" ("id" integer NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying, "path" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tipoCarouselId" integer NOT NULL, "hotelId" integer NOT NULL, CONSTRAINT "UQ_3183260184741877c6dae52c003" UNIQUE ("path"), CONSTRAINT "PK_1587bc995948c79f82fb7d42125" PRIMARY KEY ("id", "hotelId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hotel" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "nombre_uri" character varying NOT NULL, "descripcion_home" text NOT NULL, "descripcion_ubi" text NOT NULL, "telefono_1" character varying NOT NULL, "telefono_2" character varying, "email" character varying NOT NULL, "direccion" character varying NOT NULL, "lat_lng" double precision array NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_6b9d29bfc613c6935cfc83e79e2" UNIQUE ("nombre"), CONSTRAINT "UQ_a8ab533c8dd35acea66f421a49c" UNIQUE ("nombre_uri"), CONSTRAINT "PK_3a62ac86b369b36c1a297e9ab26" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tipo_habitacion" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, CONSTRAINT "UQ_81d09acf1be6f601fa85f7cfb87" UNIQUE ("nombre"), CONSTRAINT "PK_4e386396f14c49c795334c7be20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "habitacion" ("id" integer NOT NULL, "nombre" character varying NOT NULL, "descripcion_hab" text NOT NULL, "descripcion_camas" text NOT NULL, "max_pax" integer NOT NULL, "tamanio_m2" integer NOT NULL, "ocupado" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "hotelId" integer NOT NULL, "tipoHabitacionId" integer NOT NULL, CONSTRAINT "PK_43bf194308e0cca538e24afd890" PRIMARY KEY ("id", "hotelId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "foto_habitacion" ("id" integer NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying, "path" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "habitacionId" integer NOT NULL, "hotelId" integer NOT NULL, CONSTRAINT "UQ_3179458cef23c4f806276d9a708" UNIQUE ("path"), CONSTRAINT "PK_f3a100553615f32a4a80c19dcde" PRIMARY KEY ("id", "habitacionId", "hotelId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reserva" ("id" integer NOT NULL, "habitacionId" integer NOT NULL, "hotelId" integer NOT NULL, "checkin" TIMESTAMP NOT NULL, "checkout" TIMESTAMP NOT NULL, "monto_final" double precision NOT NULL, "monto_pagado" double precision NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b3ef20d1eb78569318849baf95d" PRIMARY KEY ("id", "habitacionId", "hotelId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reserva_x_huesped" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "reservaId" integer NOT NULL, "reservaHabitacionId" integer NOT NULL, "reservaHotelId" integer NOT NULL, "huespedId" integer NOT NULL, CONSTRAINT "PK_4a11eb9cd155f7c43055db4f39b" PRIMARY KEY ("reservaId", "reservaHabitacionId", "reservaHotelId", "huespedId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "huesped" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "email" character varying NOT NULL, "dni" integer NOT NULL, "fecha_nacimiento" TIMESTAMP NOT NULL, "telefono" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_dcc19d84203ab5cc4326ccf4a84" UNIQUE ("email"), CONSTRAINT "UQ_e52c29b7f445619b14d1aba5e6b" UNIQUE ("dni"), CONSTRAINT "PK_5bb6200e872f1b6219a844a5cbd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "servicio_x_habitacion" ("servicioId" integer NOT NULL, "servicioHotelId" integer NOT NULL, "habitacionId" integer NOT NULL, "habitacionHotelId" integer NOT NULL, CONSTRAINT "PK_35c72e1e0474b9044523ca2c323" PRIMARY KEY ("servicioId", "servicioHotelId", "habitacionId", "habitacionHotelId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1912fc593035d73c5ac10dcb21" ON "servicio_x_habitacion" ("servicioId", "servicioHotelId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aadbfab5455ec1f6c0c1376115" ON "servicio_x_habitacion" ("habitacionId", "habitacionHotelId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "paypertop" ADD CONSTRAINT "FK_1e8e8ef698a94de2a22771bce96" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "paypertop" ADD CONSTRAINT "FK_6573721df416f4c704c1aa219b1" FOREIGN KEY ("tipoPPTId") REFERENCES "tipo_ppt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" ADD CONSTRAINT "FK_775dadaee60b8ecbf6e8e70ba5e" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "mensaje" ADD CONSTRAINT "FK_3d7263502c4c4c30232a46cc021" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio" ADD CONSTRAINT "FK_8f640df0edd438abc1b613f639d" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_hotel" ADD CONSTRAINT "FK_63cd0aeccd7eed6b37d1aa6a668" FOREIGN KEY ("tipoCarouselId") REFERENCES "tipo_carousel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_hotel" ADD CONSTRAINT "FK_3772562e643aba96ac0de5d8a65" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "habitacion" ADD CONSTRAINT "FK_0712e949c97dcfc4f6a09b16b21" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "habitacion" ADD CONSTRAINT "FK_531cad5f0e186c438efab2c1ac5" FOREIGN KEY ("tipoHabitacionId") REFERENCES "tipo_habitacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" ADD CONSTRAINT "FK_1369fc969234982edf1ecad5576" FOREIGN KEY ("habitacionId", "hotelId") REFERENCES "habitacion"("id","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" ADD CONSTRAINT "FK_2626c9a5e1a74d06d6530b58fac" FOREIGN KEY ("habitacionId", "hotelId") REFERENCES "habitacion"("id","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva_x_huesped" ADD CONSTRAINT "FK_2c5968812b5622473294b73211b" FOREIGN KEY ("reservaId", "reservaHabitacionId", "reservaHotelId") REFERENCES "reserva"("id","habitacionId","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva_x_huesped" ADD CONSTRAINT "FK_e784908c3d308007becb83cc86c" FOREIGN KEY ("huespedId") REFERENCES "huesped"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" ADD CONSTRAINT "FK_1912fc593035d73c5ac10dcb21c" FOREIGN KEY ("servicioId", "servicioHotelId") REFERENCES "servicio"("id","hotelId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio_x_habitacion" ADD CONSTRAINT "FK_aadbfab5455ec1f6c0c1376115e" FOREIGN KEY ("habitacionId", "habitacionHotelId") REFERENCES "habitacion"("id","hotelId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "reserva_x_huesped" DROP CONSTRAINT "FK_e784908c3d308007becb83cc86c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva_x_huesped" DROP CONSTRAINT "FK_2c5968812b5622473294b73211b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva" DROP CONSTRAINT "FK_2626c9a5e1a74d06d6530b58fac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_habitacion" DROP CONSTRAINT "FK_1369fc969234982edf1ecad5576"`,
    );
    await queryRunner.query(
      `ALTER TABLE "habitacion" DROP CONSTRAINT "FK_531cad5f0e186c438efab2c1ac5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "habitacion" DROP CONSTRAINT "FK_0712e949c97dcfc4f6a09b16b21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_hotel" DROP CONSTRAINT "FK_3772562e643aba96ac0de5d8a65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "foto_hotel" DROP CONSTRAINT "FK_63cd0aeccd7eed6b37d1aa6a668"`,
    );
    await queryRunner.query(
      `ALTER TABLE "servicio" DROP CONSTRAINT "FK_8f640df0edd438abc1b613f639d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mensaje" DROP CONSTRAINT "FK_3d7263502c4c4c30232a46cc021"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" DROP CONSTRAINT "FK_775dadaee60b8ecbf6e8e70ba5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "paypertop" DROP CONSTRAINT "FK_6573721df416f4c704c1aa219b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "paypertop" DROP CONSTRAINT "FK_1e8e8ef698a94de2a22771bce96"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aadbfab5455ec1f6c0c1376115"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1912fc593035d73c5ac10dcb21"`,
    );
    await queryRunner.query(`DROP TABLE "servicio_x_habitacion"`);
    await queryRunner.query(`DROP TABLE "huesped"`);
    await queryRunner.query(`DROP TABLE "reserva_x_huesped"`);
    await queryRunner.query(`DROP TABLE "reserva"`);
    await queryRunner.query(`DROP TABLE "foto_habitacion"`);
    await queryRunner.query(`DROP TABLE "habitacion"`);
    await queryRunner.query(`DROP TABLE "tipo_habitacion"`);
    await queryRunner.query(`DROP TABLE "hotel"`);
    await queryRunner.query(`DROP TABLE "foto_hotel"`);
    await queryRunner.query(`DROP TABLE "tipo_carousel"`);
    await queryRunner.query(`DROP TABLE "servicio"`);
    await queryRunner.query(`DROP TABLE "mensaje"`);
    await queryRunner.query(`DROP TABLE "usuario"`);
    await queryRunner.query(`DROP TABLE "paypertop"`);
    await queryRunner.query(`DROP TABLE "tipo_ppt"`);
  }
}
