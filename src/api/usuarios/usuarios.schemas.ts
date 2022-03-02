import * as Joi from 'joi';

const id = Joi.number().integer();
const nombre = Joi.string().trim();
const apellido = Joi.string().trim();
const email = Joi.string().trim().email();
const nick = Joi.string().trim();
const password = Joi.string().min(8).max(50);

export const getUsuarioSchema = Joi.object({
  id: id.required(),
});

export const createUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  nick: nick.required(),
  password: password.required(),
});

export const patchUsuarioSchema = Joi.object({
  nombre,
  apellido,
  email,
  nick,
  password,
});
