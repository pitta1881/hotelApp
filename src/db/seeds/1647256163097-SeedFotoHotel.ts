import { MigrationInterface, QueryRunner } from 'typeorm';

import { FotoHotel } from '../entities/fotoHotel.entity';
import { Hotel } from '../entities/hotel.entity';
import { TipoCarousel } from '../entities/tipoCarousel.entity';

export class SeedFotoHotel1647256163097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hotel = await queryRunner.manager
      .createQueryBuilder()
      .select('hotel')
      .from(Hotel, 'hotel')
      .where('hotel.id = :hotelId', { hotelId: 1 })
      .getOne();
    const tipoCarousel = await queryRunner.manager
      .createQueryBuilder()
      .select('tipoCarousel')
      .from(TipoCarousel, 'tipoCarousel')
      .where('tipoCarousel.id = :tipoCarouselId', { tipoCarouselId: 1 })
      .getOne();

    const fotosHotel = [
      {
        nombre: '1n2uj3i123.jpg',
        descripcion: 'foto del hotel - mostrador',
        path: 'https://www.entornoturistico.com/wp-content/uploads/2016/06/recepcion-de-hotel-1280x720.jpg',
        hotel: hotel,
        tipoCarousel: tipoCarousel,
      },
      {
        nombre: '123io12j3490asda.jpg',
        descripcion: 'foto del hotel - comedor',
        path: 'https://sp-ao.shortpixel.ai/client/q_lqip,ret_wait,w_566,h_377/https://www.fiaka.es/blog/wp-content/uploads/2020/04/comedor-hoteles-566x377.jpg',
        hotel: hotel,
        tipoCarousel: tipoCarousel,
      },
    ];
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(FotoHotel)
      .values(fotosHotel)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.createQueryBuilder().delete().from(FotoHotel);
  }
}
