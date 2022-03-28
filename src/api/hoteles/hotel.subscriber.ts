import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { Usuario } from '../../db/entities/usuario.entity';
import { Hotel } from '../../db/entities/hotel.entity';

@EventSubscriber()
export class HotelSubscriber implements EntitySubscriberInterface<Hotel> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Hotel;
  }

  async afterInsert(event: InsertEvent<Hotel>) {
    const userAdminNewHotel = {
      nombre: `admin-${event.entity.nombre_uri}`,
      apellido: `admin-${event.entity.nombre_uri}`,
      email: `admin-${event.entity.nombre_uri}@mail.com`,
      nick: `admin-${event.entity.nombre_uri}`,
      password: 'admin123',
      hotel: event.entity,
    };
    const newUser = event.manager
      .getRepository(Usuario)
      .create({ ...userAdminNewHotel, id: 1 });
    await event.manager.getRepository(Usuario).save(newUser);
  }
}
