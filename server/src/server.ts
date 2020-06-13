import cors from 'cors';
import express from 'express';
import path from 'path';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(
  '/uploads/point',
  express.static(path.resolve(__dirname, '..', 'uploads', 'userUploads')),
);
app.use(errors());
app.listen(3333, () => {
  console.log('server on !!!');
});
