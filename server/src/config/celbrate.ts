import { Joi } from 'celebrate';

export default {
  point: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email(),
      whatsapp: Joi.number().required(),
      longitude: Joi.number().required(),
      latitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  announce: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email(),
      whatsapp: Joi.number().required(),
      longitude: Joi.number().required(),
      latitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
      password: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
    }),
  },
};
