import * as Joi from 'joi';
import DateExtension from '@joi/date';

const JoiExtended = Joi.extend(DateExtension);

const id = Joi.number().integer();
const nombre = Joi.string().trim();
const apellido = Joi.string().trim();
const email = Joi.string().trim().email();
const checkin = JoiExtended.date().format('YYYY-MM-DD').greater('now').utc();
const checkout = JoiExtended.date()
  .format('YYYY-MM-DD')
  .min(Joi.ref('checkin'))
  .utc();
const pais = Joi.string().min(2).max(2);
const adultos = Joi.number().integer().positive();
const menores = Joi.number().integer().positive().allow(0);
const mensaje = Joi.string().trim();
const hotelId = Joi.number().integer().positive();

export const getMensajeSchema = Joi.object({
  id: id.required(),
});

export const createMensajeSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  checkin: checkin.required(),
  checkout: checkout.required(),
  pais: pais.required(),
  adultos: adultos.required(),
  menores,
  mensaje: mensaje.required(),
  hotelId: hotelId.required(),
});
