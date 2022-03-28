import { MigrationInterface, QueryRunner } from 'typeorm';
import { Hotel } from '../entities/hotel.entity';
import { Paypertop } from '../entities/paypertop.entity';
import { TipoPPT } from '../entities/tipoPPT.entity';

export class SeedPaypertop1648164901729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hotel = await queryRunner.manager
      .createQueryBuilder()
      .select('hotel')
      .from(Hotel, 'hotel')
      .where('hotel.id = :hotelId', { hotelId: 1 })
      .getOne();

    const tipoPPTAtrac = await queryRunner.manager
      .createQueryBuilder()
      .select('tipoPPT')
      .from(TipoPPT, 'tipoPPT')
      .where('tipoPPT.id = :tipoPPTId', { tipoPPTId: 2 })
      .getOne();
    const tipoPPTSuper = await queryRunner.manager
      .createQueryBuilder()
      .select('tipoPPT')
      .from(TipoPPT, 'tipoPPT')
      .where('tipoPPT.id = :tipoPPTId', { tipoPPTId: 3 })
      .getOne();

    const paypertops = [
      {
        id: 1,
        titular: `Pedro Perez`,
        razon_social: `PePerez S.R.L`,
        email: `pperez@mail.com`,
        descripcion: `Empresa que brinda servicios de Turismo por la ciudad.`,
        url: 'http://www.turismopperez.com.ar',
        abono_mensual: 15000,
        lat_lng: [-44.603, -68.9525],
        tipoPPT: tipoPPTAtrac,
        hotel: hotel,
      },
      {
        id: 2,
        titular: `María Lopez`,
        razon_social: `MaLopez S.A`,
        email: `mlopez@mail.com`,
        descripcion: `Supermercado mas grande de la ciudad.`,
        url: 'http://www.supermalopez.com.ar',
        abono_mensual: 12000,
        lat_lng: [-45.703, -65.8525],
        tipoPPT: tipoPPTSuper,
        hotel: hotel,
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Paypertop)
      .values(paypertops)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(Paypertop);
  }
}
