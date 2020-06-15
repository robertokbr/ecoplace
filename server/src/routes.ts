/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import { celebrate } from 'celebrate';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multerConfig from './config/multer';
import celebrateConfig from './config/celbrate';
import AnnouncementController from './controllers/AnnouncementController';

const routes = Router();
const upload = multer(multerConfig);
const pointsController = new PointsController();
const itemController = new ItemsController();
const announcementController = new AnnouncementController();
routes.get('/items', itemController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points',
  upload.single('image'),
  celebrate(celebrateConfig.point, { abortEarly: false }),
  pointsController.create,
);

routes.post(
  '/announce',
  upload.single('image'),
  celebrate(celebrateConfig.announce, { abortEarly: false }),
  announcementController.create,
);
routes.get('/announce/:password', announcementController.index);
routes.delete('/delete/:id', announcementController.delete);

export default routes;
