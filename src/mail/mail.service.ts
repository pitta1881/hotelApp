import { Hotel } from './../db/entities/hotel.entity';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Mensaje } from './../db/entities/mensaje.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async newMessageToAdmins(hotel: Hotel, mensaje: Mensaje) {
    const listaMails = `${hotel.usuarios.map((usuario) => usuario.email)},${
      hotel.email
    }`;
    await this.mailerService.sendMail({
      to: listaMails,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Nuevo mensaje recibido.',
      template: 'newMessageToAdmins',
      context: {
        mensaje,
      },
    });
  }
  async copyMessageToClient(hotel: Hotel, mensaje: Mensaje) {
    await this.mailerService.sendMail({
      to: mensaje.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: `Mensaje enviado a ${hotel.nombre}`,
      template: 'copyMessageToClient',
      context: {
        hotel,
        mensaje,
      },
    });
  }
}
