import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads', 'userUploads'),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');
      const fileNameWithoutSpace = file.originalname.replace(/\s+/g, '');
      const fileName = `${hash}-${fileNameWithoutSpace}`;

      callback(null, fileName);
    },
  }),
};
