import { Joi } from 'celebrate';

export default {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required(),
    longitude: Joi.string().required(),
    latitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().max(2),
    items: Joi.string().required(),
  }),
};
