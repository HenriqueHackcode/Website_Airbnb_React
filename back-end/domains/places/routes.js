import { Router } from 'express';
import Place from './models.js';
import { JWTVerify } from '../../utils/jwt.js';
import { connectDb } from '../../config/db.js';

import { sendToS3, downloadImage, uploadImage } from './controller.js';

const router = Router();

router.post('/', async (req, res) => {
  connectDb();
  const {
    title,
    city,
    photos,
    description,
    extras,
    price,
    perks,
    checkin,
    checkout,
    guests,
  } = req.body;

  try {
    const { _id: owner } = await JWTVerify(req);

    const newPlaceDoc = await Place.create({
      owner,
      title,
      city,
      photos,
      description,
      extras,
      price,
      perks,
      checkin,
      checkout,
      guests,
    });
    res.json(newPlaceDoc);
  } catch (error) {
    console.error('Error creating new place:', error);
    res.status(500).json('Deu erro ao cadastrar o novo lugar!');
  }
});

router.post('/upload/link', async (req, res) => {
  const { link } = req.body;

  try {
    const { filename, fullPath, mimeType } = await downloadImage(link);

    const s3FileUrl = await sendToS3(filename, fullPath, mimeType);

    res.json(s3FileUrl);
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json('Erro ao baixar a imagem!');
  }
});

router.post('/upload', uploadImage().array('files', 10), async (req, res) => {
  const { files } = req;

  const filePromise = new Promise((resolve, reject) => {
    const fileURLArray = [];

    files.forEach(async (file, index) => {
      const { filename, path, mimetype } = file;

      try {
        const fileURL = await sendToS3(filename, path, mimetype);

        fileURLArray.push(fileURL);
      } catch (error) {
        console.error('Error uploading file to S3:', error);
        reject(error);
      }
    });
    const idIntervalo = setInterval(() => {
      if (files.length === fileURLArray.length) {
        clearInterval(idIntervalo);

        resolve(fileURLArray);
      }
    }, 50);
  });

  const fileURLArrayResolved = await filePromise;
  res.json(fileURLArrayResolved);
});

export default router;
