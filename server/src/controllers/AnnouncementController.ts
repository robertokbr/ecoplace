import { Request, Response } from 'express';
import knex from '../database/connection';

class AnnouncementController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      price,
      description,
      password,
    } = request.body;

    const annouce = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      price,
      description,
      password,
    };

    await knex('points').insert(annouce);

    return response.json(annouce);
  }

  async index(request: Request, response: Response) {
    const { password } = request.params;

    const announcements = await knex('points')
      .where('password', String(password))
      .select('*');

    if (!announcements) {
      return response.status(400).json({ message: 'Not found' });
    }

    const serializedPoints = announcements.map(announce => {
      return {
        ...announce,
        imagem_url: `http://192.168.0.5:3333/uploads/point/${announce.image}`,
      };
    });
    return response.json(serializedPoints);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await knex('points').where('id', id).delete();

    return response.status(200).json({ message: 'Done!' });
  }
}

export default AnnouncementController;
