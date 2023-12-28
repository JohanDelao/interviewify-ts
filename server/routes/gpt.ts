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
  // let transcription = await transcribe(audio);

  // for testing
  const transcription =
    "I'm a finance professional with over ten years of experience in investment banking. In my current role, I oversee a team of analysts and have successfully completed numerous high-value transactions. I'm excited to bring my expertise to a new company and help drive success. In addition to my work in investment banking, I've developed a strong network within the industry and stay up-to-date on industry trends through attending conferences and participating in professional organizations. I'm confident that my expertise and connections will benefit a new company.";
  const userAnswers = audioToPrompt(transcription, question);
  console.log(userAnswers);
  await openai.chat.completions
    .create({
      messages: [systemPrompt, userAnswers],
      model: 'gpt-4-1106-preview',
    })
    .then(async (response) => {
      console.log(response.choices[0].message.content);
      let resp = '';
      try {
        resp = JSON.parse(response.choices[0].message.content);
        console.log('resp', resp);
      } catch (err) {
        resp = response.choices[0].message.content;
        console.log('JSON Error:', err);
      }

      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(400).send({ error: `❌ Evaluation error: ${err}` });
    });
});

export default router;
