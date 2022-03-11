import * as Joi from 'joi';

const id = Joi.number().integer();
const nombre = Joi.string().trim();
const descripcion_home = Joi.string().trim();
const descripcion_ubi = Joi.string().trim();
const telefono_1 = Joi.string().trim().max(20);
const telefono_2 = Joi.string().trim().max(20);
const email = Joi.string().trim().email();
const direccion = Joi.string().trim().max(100);
const lat_lng = Joi.array()
  .items(Joi.number().min(-90).max(90), Joi.number().min(-180).max(180))
  .min(2)
  .max(2);

export const getHotelSchema = Joi.object({
  id: id.required(),
});

export const createHotelSchema = Joi.object({
  nombre: nombre.required(),
  descripcion_home: descripcion_home.required(),
  descripcion_ubi: descripcion_ubi.required(),
  telefono_1: telefono_1.required(),
  telefono_2,
  email: email.required(),
  direccion: direccion.required(),
  lat_lng: lat_lng.required(),
});

export const updateHotelSchema = Joi.object({
  nombre,
  descripcion_home,
  descripcion_ubi,
  telefono_1,
  telefono_2,
  email,
  direccion,
  lat_lng,
});
