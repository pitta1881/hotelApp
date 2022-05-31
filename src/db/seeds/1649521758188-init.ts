import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class init1649521758188 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO hotel 
              ("id","activo","nombre","nombre_uri","descripcion_home","descripcion_ubi","telefono_1","email","direccion","lat_lng","logo_path","horario_contacto","facebook", "twitter") 
            VALUES 
              (1,true,'Hotel Pato','hotelpato','Distinción e identidad local. Ambientes cálidos y un servicio exclusivo. Spa, piscina, sauna, gimnasio, restaurante gourmet patagónico. Tu tiempo en el hotel es parte del viaje.','Inmerso en la naturaleza, Huinid Bustillo te recibe en ambientes acogedores con detalles en madera y una colección de artistas locales. Disfrutá de una estadía revitalizante en el spa y exquisitos platos de autor fusionados con sabores de la Patagonia.','0112134564','hotelpato@mail.com','Av. Exequiel Bustillo 3380, San Carlos de Bariloche, Río Negro, Argentina','{-41.12947531850026, -71.34748729871622}','https://us.123rf.com/450wm/sitiardi21/sitiardi211701/sitiardi21170100013/70276178-hotel-reflection-logotipo.jpg?ver=6', 'Lu-Do 7-22hs' ,'hotelpato', 'hotelpatook' )`,
    );
    await queryRunner.query(
      `INSERT INTO tipo_ppt 
              ("id","nombre") 
            VALUES 
              (1,'Gastronomía'),
              (2,'Atracciones'),
              (3,'Supermercados')`,
    );
    await queryRunner.query(
      `INSERT INTO tipo_carousel 
              ("id","nombre") 
            VALUES 
              (1,'Home'),
              (2,'Servicios')`,
    );
    await queryRunner.query(
      `INSERT INTO tipo_habitacion
              ("id","nombre") 
            VALUES 
              (1,'Simple'),
              (2,'Doble'),
              (3,'Triple'),
              (4,'Suite'),
              (5,'Suite Presidencial')`,
    );
    const passHashed = await bcrypt.hash('admin123', 10);
    await queryRunner.query(
      `INSERT INTO usuario
              ("id","nombre","apellido","email","nick","password","hotelId") 
            VALUES 
              (1,'admin-hotelpato','admin-hotelpato','admin-hotelpato@mail.com','admin-hotelpato','${passHashed}', 1)`,
    );
    await queryRunner.query(
      `INSERT INTO habitacion
      ("id","nombre","descripcion_hab","descripcion_camas","max_pax","tamanio_m2","tipoHabitacionId","hotelId") 
      VALUES 
      (1,'Habitacion Simple','Habitacion totalmente amueblada para 1 persona','1 Cama Simple',1,10,1,1),
      (2,'Habitacion Suite','Habitacion Suite amueblada para 2 personas y de clase premium','1 Cama Suite King',2,15,4,1)`,
    );
    await queryRunner.query(
      `INSERT INTO servicio
                ("id","nombre","servInstal","icon_path","hotelId") 
              VALUES 
                (1,'WiFi',false,'/icons/wifi-signal-svgrepo-com.svg',1),
                (2,'Desayuno',false,'/icons/breakfast-time-svgrepo-com.svg',1),
                (3,'Spa',true,'/icons/massage-spa-svgrepo-com.svg',1),
                (4,'Estacionamiento',true,'/icons/parking-garage-transportation-car-parking-svgrepo-com.svg',1),
                (5,'TV',false,'/icons/tv-svgrepo-com.svg',1),
                (6,'Frigobar',false,'/icons/minibar-svgrepo-com.svg',1),
                (7,'Secador',false,'/icons/hair-dryer-svgrepo-com.svg',1),
                (8,'Sala de Juegos',true,'/icons/board-games-set-svgrepo-com.svg',1),
                (9,'Bar',true,'/icons/bar-svgrepo-com.svg',1),
                (10,'Gimnasio',true,'/icons/gym-svgrepo-com.svg',1),
                (11,'Bañera',false,'/icons/bathtub-svgrepo-com.svg',1),
                (12,'Caja de Seguridad',false,'/icons/security-box-svgrepo-com.svg',1),
                (13,'Jacuzzi',false,'/icons/jacuzzi-svgrepo-com.svg',1)`,
    );
    await queryRunner.query(
      `INSERT INTO servicio_x_habitacion
      ("servicioId","servicioHotelId","habitacionId","habitacionHotelId") 
      VALUES 
      (1,1,1,1),
      (5,1,1,1),
      (6,1,1,1),
      (7,1,1,1),
      (1,1,2,1),
      (5,1,2,1),
      (6,1,2,1),
      (7,1,2,1),
      (12,1,2,1),
      (13,1,2,1)`,
    );
    await queryRunner.query(
      `INSERT INTO foto_hotel
              ("id","descripcion","path","tipoCarouselId","hotelId") 
            VALUES 
              (1,'foto del hotel - mostrador','https://www.entornoturistico.com/wp-content/uploads/2016/06/recepcion-de-hotel-1280x720.jpg',1,1),
              (2,'foto del hotel - recepcion','https://www.riu.com/blog/wp-content/uploads/2016/07/Recepci%C3%B3n-del-hotel.jpg',1,1),
              (3,'foto del hotel - recepcion 2','https://media-cdn.tripadvisor.com/media/photo-s/02/89/6d/9a/recepcion-del-hotel.jpg',1,1),
              (4,'foto del hotel - comedor 1','https://i.pinimg.com/originals/0b/9b/7b/0b9b7b4e4a5f437581a5d552b24c5052.jpg',1,1),
              (5,'foto del hotel - comedor 2','https://sp-ao.shortpixel.ai/client/q_lqip,ret_wait,w_566,h_377/https://www.fiaka.es/blog/wp-content/uploads/2020/04/mobiliario-para-hoteles-566x377.jpg',1,1),
              (6,'foto del hotel - afuera 1','https://media-cdn.tripadvisor.com/media/photo-s/03/b2/93/22/amerian-san-luis-park.jpg',2,1),
              (7,'foto del hotel - afuera 2','https://thumbs.dreamstime.com/z/peque%C3%B1o-hotel-las-afueras-de-barcelona-esdolbarcelona-julio-bonito-con-piscina-la-temporada-tur%C3%ADstica-durante-epidemia-192791173.jpg',2,1),
              (8,'foto del hotel - afuera 2','https://ep01.epimg.net/elviajero/imagenes/2020/03/12/actualidad/1584006601_291748_1584014052_noticia_normal.jpg',2,1),
              (9,'foto del hotel - comedor 3','https://previews.123rf.com/images/paulvinten/paulvinten1711/paulvinten171100082/89770308-dise%C3%B1o-de-interiores-de-un-complejo-de-hotel-de-lujo-comedor-de-restaurante-asi%C3%A1tico-con-una-decorac.jpg',2,1),
              (10,'foto del hotel - huespedes covid','https://dirigentesdigital.com/multimedia/img/big/a43f0d6d005220ec214b9944883fdc1e.jpg',2,1)`,
    );
    await queryRunner.query(
      `INSERT INTO foto_habitacion
              ("id","descripcion","path","habitacionId","hotelId") 
            VALUES 
              (1,'foto de la habitacion 1','https://media-cdn.tripadvisor.com/media/photo-s/0f/03/33/f1/habitacion-individual.jpg',1,1),
              (2,'foto de la habitacion 1','https://media-cdn.tripadvisor.com/media/photo-s/06/c5/b9/d5/hotel-catedral-campeche.jpg',1,1),
              (3,'foto de la habitacion 1','https://www.hotelzentralparque.com/wp-content/uploads/2018/10/HotelZentral-HabIndividual.jpg',1,1),
              (4,'foto de la habitacion 2','https://hips.hearstapps.com/hmg-prod/images/dormitorio-hotel-ambiente-freehand-arquitectura-1631001209.jpg',2,1),
              (5,'foto de la habitacion 2','https://www.cataloniahotels.com/es/blog/wp-content/uploads/2016/05/habitaci%C3%B3n-doble-catalonia-620x412.jpg',2,1)`,
    );
    await queryRunner.query(
      `INSERT INTO mensaje
              ("id","nombre","apellido","email","checkin","checkout","pais","adultos","menores","mensaje", "leido","hotelId") 
            VALUES 
              (1,'test nom 1','test ape 1','test1@mail.com','2022-05-20','2022-06-01','AR',2,0,'Este es un mensaje de prueba ya leido seed 1',true,1),
              (2,'test nom 2','test ape 2','test2@mail.com','2022-05-25','2022-06-05','AR',2,2,'Este es un mensaje de prueba seed 2',false,1)`,
    );
    await queryRunner.query(
      `INSERT INTO paypertop
              ("id","titular","razon_social","email","descripcion","url","abono_mensual","lat_lng","activo","tipoPPTId","hotelId") 
            VALUES 
              (1,'Pedro Perez','PePerez S.R.L','pperez@mail.com','Empresa que brinda servicios de Turismo por la ciudad.','http://www.turismopperez.com.ar',15000,'{-41.13534742815715, -71.30578269365238}',true,2,1),
              (2,'María Lopez','MaLopez S.A','mlopez@mail.com','Supermercado mas grande de la ciudad.','http://www.supermalopez.com.ar',12000,'{-41.13761429688297, -71.31278257990219}',true,3,1),
              (3,null,'Supermercados Todo',null,'Supermercado cerca del hotel.','http://www.supertodo.com.ar/',0,'{-41.12784799083812, -71.35088738966584}',true,3,1),
              (4,null,'Familia Weiss',null,'Restaurante familiar.','https://www.weiss.com.ar/',0,'{-41.13312094364556, -71.30382863726463}',true,1,1),
              (5,null,'La Marca Patagónica',null,'Restaurante familiar.','https://la-marca-patagonica.negocio.site/',0,'{-41.13386676160742, -71.30935194768804}',true,1,1),
              (6,'Manuel Blest','Cervezeria Blest','mblest@blest.com','Cervezería/bar.','http://www.cervezablest.com/',20000,'{-41.12759211083225, -71.35126058495128}',true,1,1),
              (7,null,'Teleférico Cerro Otto',null,'Teleférico cerca del centro.','http://www.telefericobariloche.com.ar/',0,'{-41.130162240139754, -71.36963340452075}',true,2,1),
              (8,null,'Si Turismo',null,'Empresa de Turismo.','https://siturismo.com/',0,'{-41.13402538670256, -71.30681160975384}',true,2,1)`,
    );
    await queryRunner.query(
      `INSERT INTO huesped
              ("id","nombre","apellido","email","dni","fecha_nacimiento","telefono") 
            VALUES 
              (1,'HuespednomA','HuespedapeA',null,12345678,'1990-05-10',null),
              (2,'HuespednomB','HuespedapeB','huesped2@mail.com',87654321,'1992-03-18','0111512345678')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM huesped`);
    await queryRunner.query(`DELETE FROM paypertop`);
    await queryRunner.query(`DELETE FROM mensaje`);
    await queryRunner.query(`DELETE FROM foto_habitacion`);
    await queryRunner.query(`DELETE FROM foto_hotel`);
    await queryRunner.query(`DELETE FROM habitacion`);
    await queryRunner.query(`DELETE FROM servicio`);
    await queryRunner.query(`DELETE FROM usuario`);
    await queryRunner.query(`DELETE FROM tipo_habitacion`);
    await queryRunner.query(`DELETE FROM tipo_carousel`);
    await queryRunner.query(`DELETE FROM tipo_ppt`);
    await queryRunner.query(`DELETE FROM hotel`);
  }
}
