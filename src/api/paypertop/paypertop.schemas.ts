import * as Joi from 'joi';

const id = Joi.number().integer();
const titular = Joi.string().trim();
const razon_social = Joi.string().trim();
const email = Joi.string().trim().email();
const descripcion = Joi.string().trim();
const url = Joi.string().trim();
const abono_mensual = Joi.number().positive();
const lat_lng = Joi.array()
  .items(Joi.number().min(-90).max(90), Joi.number().min(-180).max(180))
  .min(2)
  .max(2);
const tipoPPTId = Joi.number().integer().positive();

export const getPaypertopSchema = Joi.object({
  id: id.required(),
});

export const createPaypertopSchema = Joi.object({
  titular: titular.required(),
  razon_social: razon_social.required(),
  email: email.required(),
  descripcion: descripcion.required(),
  url: url.required(),
  abono_mensual: abono_mensual.required(),
  lat_lng: lat_lng.required(),
  tipoPPTId: tipoPPTId.required(),
});

export const updatePaypertopSchema = Joi.object({
  titular,
  razon_social,
  email,
  descripcion,
  url,
  abono_mensual,
  lat_lng,
});
