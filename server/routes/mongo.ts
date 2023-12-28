import { Router } from 'express';
import dotenv from 'dotenv';

//utils
import { saveToMongo } from '../utils/saveToMongo';

//configs
const router = Router();
dotenv.config();

router.post('/save-interview', async (req, res) => {
  const evaluations = req.body.evaluations;
  try {
    saveToMongo(evaluations);
    res.status(200).send('Successfully saved to mongo');
  } catch (err) {
    res.status(400).send({ error: `❌ Mongo error: ${err}` });
  }
});

export default router;
