import fs from 'fs';
import { Router } from 'express';
const router = Router();
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

//utils
import { getSystemPrompt } from '../utils/getSystemPrompt';
import { transcribe } from '../utils/transcribe';
import { audioToPrompt } from '../utils/audioToPrompt';
import { saveToMongo } from '../utils/saveToMongo';

//configs
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/evaluate', async (req, res) => {
  // TODO: remove this when we have real audio files coming in
  const audioFile = fs.createReadStream('./audios/2min.mp3');

  // TODO: figure out if we want to error out when these are empty or
  // coallese to empty array and still make the gpt call
  const questions = req.body.questions ?? [];
  const audios = req.body.audios ?? [audioFile, audioFile];
  const profession = req.body.profession ?? 'software engineering';

  const systemPrompt = getSystemPrompt(profession);
  const transcriptions = await transcribe(audios);
  const userAnswers = audioToPrompt(transcriptions, questions);

  await openai.chat.completions
    .create({
      messages: [systemPrompt, userAnswers],
      model: 'gpt-4',
    })
    .then(async (response) => {
      let resp = JSON.parse(response.choices[0].message.content);
      saveToMongo(resp, transcriptions);

      // TODO: send to frontend
      //here

      res.status(200).json(resp);
    })
    .catch((err) =>
      res.status(400).send({ error: `❌ Evaluation error: ${err}` })
    );
});

export default router;
