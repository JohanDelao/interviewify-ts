import { Router } from 'express';
const router = Router();
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import multer from 'multer';

//utils
import { getSystemPrompt } from '../utils/getSystemPrompt';
import { transcribe } from '../utils/transcribe';
import { audioToPrompt } from '../utils/audioToPrompt';

//configs
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/evaluate', upload.array('audio'), async (req, res) => {
  // TODO: figure out if we want to error out when these are empty or
  // coallese to empty array and still make the gpt call

  const question = req.body.question ?? [];
  const audio: any = req.files[0];
  const profession = req.body.profession ?? 'software engineering';
  const systemPrompt = getSystemPrompt(profession);
  let transcription = await transcribe(audio);
  const userAnswers = audioToPrompt(transcription, question);
  await openai.chat.completions
    .create({
      messages: [systemPrompt, userAnswers],
      model: 'gpt-4-1106-preview',
    })
    .then(async (response) => {
      let resp = response.choices[0].message.content;
      if (resp.includes('```json'))
        resp = resp.replace('```json', '').replace('```', '');

      try {
        resp = JSON.parse(resp);
      } catch (err) {
        console.log('JSON ERROR', resp);
      }

      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(400).send({ error: `❌ Evaluation error: ${err}` });
    });
});

export default router;
