import { MigrationInterface, QueryRunner } from 'typeorm';

import { Habitacion } from '../entities/habitacion.entity';
import { Hotel } from '../entities/hotel.entity';
import { TipoHabitacion } from '../entities/tipoHabitacion.entity';

export class SeedHabitaciones1646918729297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hotel = await queryRunner.manager
      .createQueryBuilder()
      .select('hotel')
      .from(Hotel, 'hotel')
      .where('hotel.id = :hotelId', { hotelId: 1 })
      .getOne();
    const tipoHabitacionSimple = await queryRunner.manager
      .createQueryBuilder()
      .select('tipo_habitacion')
      .from(TipoHabitacion, 'tipo_habitacion')
      .where('tipo_habitacion.id = :tipo_habitacion_id', {
        tipo_habitacion_id: 1,
      })
      .getOne();
    const tipoHabitacionSuite = await queryRunner.manager
      .createQueryBuilder()
      .select('tipo_habitacion')
      .from(TipoHabitacion, 'tipo_habitacion')
      .where('tipo_habitacion.id = :tipo_habitacion_id', {
        tipo_habitacion_id: 4,
      })
      .getOne();

    const habitaciones = [
      {
        nombre: 'Habitacion Simple',
        descripcion_hab: 'Habitacion totalmente amueblada para 1 persona',
        descripcion_camas: '1 Cama Simple',
        max_pax: 1,
        tamanio_m2: 10,
        tipoHabitacion: tipoHabitacionSimple,
        hotel: hotel,
      },
      {
        nombre: 'Habitacion Suite',
        descripcion_hab:
          'Habitacion Suite amueblada para 2 personas y de clase premium',
        descripcion_camas: '1 Cama Suite King',
        max_pax: 2,
        tamanio_m2: 15,
        tipoHabitacion: tipoHabitacionSuite,
        hotel: hotel,
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Habitacion)
      .values(habitaciones)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(Habitacion);
  }
}
