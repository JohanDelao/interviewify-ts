import { Router } from 'express';
import dotenv from 'dotenv';
import { Schema } from 'mongoose';

//utils
import { saveToMongo } from '../utils/saveToMongo';

//configs
const router = Router();
dotenv.config();

router.post('/save-interview', async (req, res) => {
  const evaluations = req.body.evaluations;
  try {
    const userId = (req.user as { _id: Schema.Types.ObjectId })._id;
    saveToMongo(userId, evaluations);
    res.status(200).send('Successfully saved to mongo');
  } catch (err) {
    res.status(400).send({ error: `❌ Mongo error: ${err}` });
  }
});

export default router;
