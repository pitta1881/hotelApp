import * as Joi from 'joi';

const id = Joi.number().integer();
const nombre = Joi.string().trim();
const descripcion_hab = Joi.string().trim();
const descripcion_camas = Joi.string().trim();
const max_pax = Joi.number().integer().positive();
const tamanio_m2 = Joi.number().integer().positive();
const tipoHabitacionId = Joi.number().integer().positive();

export const getHabitacionSchema = Joi.object({
  id: id.required(),
});

export const createHabitacionSchema = Joi.object({
  nombre: nombre.required(),
  descripcion_hab: descripcion_hab.required(),
  descripcion_camas: descripcion_camas.required(),
  max_pax: max_pax.required(),
  tamanio_m2: tamanio_m2.required(),
  tipoHabitacionId: tipoHabitacionId.required(),
});

export const updateHabitacionSchema = Joi.object({
  nombre,
  descripcion_hab,
  descripcion_camas,
  max_pax,
  tamanio_m2,
  tipoHabitacionId,
});
