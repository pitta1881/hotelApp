import * as Joi from 'joi';

const id = Joi.number().integer();
const nombre = Joi.string().trim();
const servInstal = Joi.boolean();
const icon_path = Joi.string().trim();
const habitacionId = Joi.number().integer();
const servicioId = Joi.number().integer();
const operacion = Joi.boolean();

export const getServiciosSchema = Joi.object({
  id: id.required(),
});

export const createServiciosSchema = Joi.object({
  nombre: nombre.required(),
  servInstal: servInstal.required(),
  icon_path: icon_path.required(),
});

export const updateServiciosSchema = Joi.object({
  nombre,
  servInstal,
  icon_path,
});

export const associateServiceToHabitacionSchema = Joi.object({
  habitacionId: habitacionId.required(),
  servicioId: servicioId.required(),
  operacion: operacion.required(),
});
