/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import { celebrate } from 'celebrate';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multerConfig from './config/multer';
import celebrateConfig from './config/celbrate';

const routes = Router();
const upload = multer(multerConfig);
const pointsController = new PointsController();
const itemController = new ItemsController();

routes.get('/items', itemController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points',
  upload.single('image'),
  celebrate(celebrateConfig, { abortEarly: false }),
  pointsController.create,
);

export default routes;
