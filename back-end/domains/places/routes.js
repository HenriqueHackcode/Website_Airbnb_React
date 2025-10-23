import { Router } from 'express';
import Place from './models.js';
import { JWTVerify } from '../../utils/jwt.js';
import { connectDb } from '../../config/db.js';

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

export default router;
