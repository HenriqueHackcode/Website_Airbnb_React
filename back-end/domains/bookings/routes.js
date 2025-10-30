import { Router } from 'express';
import Booking from './models.js';
import { connectDb } from '../../config/db.js';
import { JWTVerify } from '../../utils/jwt.js';

const router = Router();

router.get('/owner', async (req, res) => {
  connectDb();

  try {
    const { _id: id } = await JWTVerify(req);

    try {
      const bookingDocs = await Booking.find({ user: id }).populate('place');

      res.json(bookingDocs);
    } catch (error) {
      console.error(error);
      res.status(500).json('Deu erro ao acessar a suas Reservas!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Deu erro ao validar o Token do usuário!');
  }
});

router.post('/', async (req, res) => {
  connectDb();
  const { place, user, price, total, checkin, checkout, guests, nigths } =
    req.body;

  try {
    const newBookingDoc = await Booking.create({
      place,
      user,
      price,
      total,
      checkin,
      checkout,
      guests,
      nigths,
    });

    res.json(newBookingDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json('Deu erro ao criar a Reserva!');
  }
});

router.delete('/:id', async (req, res) => {
  connectDb();

  const { id } = req.params;

  try {
    const { _id: userId } = await JWTVerify(req);

    const deletedBooking = await Booking.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedBooking) {
      return res.status(404).json('Reserva não encontrada.');
    }

    res.json({
      message: 'Reserva deletada com sucesso!',
      id: deletedBooking._id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json('Erro interno ao tentar deletar a Reserva.');
  }
});

export default router;
