import { MigrationInterface, QueryRunner } from 'typeorm';
import { FotoHabitacion } from '../entities/fotoHabitacion.entity';
import { Habitacion } from '../entities/habitacion.entity';
import { TipoHabitacion } from '../entities/tipoHabitacion.entity';

export class SeedFotoHabitacion1648153907759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const habitacion = await queryRunner.manager
      .createQueryBuilder()
      .select('habitacion')
      .from(Habitacion, 'habitacion')
      .where(
        'habitacion.id = :habitacionId AND habitacion.hotelId = :hotelId',
        {
          habitacionId: 1,
          hotelId: 1,
        },
      )
      .getOne();
    const tipoHabitacion = await queryRunner.manager
      .createQueryBuilder()
      .select('tipoHabitacion')
      .from(TipoHabitacion, 'tipoHabitacion')
      .where('tipoHabitacion.id = :tipoHabitacionId', { tipoHabitacionId: 1 })
      .getOne();

    const fotosHabitacion = [
      {
        id: 1,
        nombre: 'asidopmoi21qp.jpg',
        descripcion: 'foto de la habitacion 1',
        path: 'https://www.cataloniahotels.com/es/blog/wp-content/uploads/2016/05/habitaci%C3%B3n-doble-catalonia-620x412.jpg',
        habitacion,
        tipoHabitacion,
      },
      {
        id: 2,
        nombre: 'iopio1nmas12.jpg',
        descripcion: 'foto de la habitacion 2',
        path: 'https://paradisetravel.com.co/wp-content/uploads/2021/03/habitacion-individual-catalonia-620x412-1.jpg',
        habitacion,
        tipoHabitacion,
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(FotoHabitacion)
      .values(fotosHabitacion)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(FotoHabitacion);
  }
}
