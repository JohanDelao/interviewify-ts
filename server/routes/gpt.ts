import fs from 'fs';
import { Router } from "express";
const router = Router();

import dotenv from "dotenv";
dotenv.config()

import { OpenAI } from "openai";
import { Transcriptions } from 'openai/resources/audio';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// router.post("/transcribe", async (req, res) => {
//   const audioFile = fs.createReadStream('./audios/2min.mp3');
//   await openai.audio.transcriptions.create({
//     file: audioFile,
//     model: "whisper-1"
//   })
//   .then((response: any) => {
//     res.status(200).json(response.text)
//   })
//   .catch(err => res.status(400).send({ error: `❌ Transcription error: ${err}` }))
// })

router.post("/evaluate", async (req, res) => {
  // TODO: figure out if we want to error out when these are empty or 
  // coallese to empty array and still make the gpt call 

  // TODO: throw transcription, making userMessages, and systemMessage into utils files

  const questions = req.body.questions ?? [];
  const audios = req.body.audios ?? [];
  const role = req.body.role ?? "software engineering"

  let transcriptions = transcribe(audios);

  let userMessages = []
  for (let i = 0; i < questions.length; i++) {
    let content = {
      "question": questions[i],
      "answer": transcriptions[i]
    }
    let msg = {
      "role": "user",
      "content": JSON.stringify(content)
    }
    userMessages.push(msg)
  }

  
  const systemMessage: { role: "function" | "system" | "user" | "assistant", content: string } = {
    "role": "system",
    "content": `You are an AI career coach that will help users with role: ${role}
    interview behavioral questions. You will receive messages in a JSON string format with
    a 'question' and an 'answer' attribute. Your job is to evaluate the user's answer and provide feedback.
    
    The following instructions must be followed for all messages you receive

    Your response must be an array of JSON objects with each one having the following attributes:

    - 'question': A string of the question asked
    - 'explanation': A string of the explanation of the question. Why was this question asked? What is the interviewer looking for?; max 100 words
    - 'feedback': A string of thoughtful feedback as to what they did well and what they can improve; Keep your feedback concise and to the point; max 100 words; 
    - 'score': An integer score on a scale of 1-100, with 60 being a passing score; a score of 60 is one that would pass the interview but has significant points of improvement; a score of 100 is a perfect answer


    Make sure to consider the following when evaluating the user's answer: 
    - The role the user is applying for
    - The tone of the answer
    - The content of the answer
    - The clarity of the answer`
  }

  await openai.chat.completions.create({
    messages: [systemMessage, ...userMessages],
    model: "gpt-4",
  }).then((response) => {
    // TODO: this is where we parse then send back to frontend for feedback page and send to mongodb
    res.status(200).json(response.choices[0]);
  })
    .catch(err => res.status(400).send({ error: `❌ Evaluation error: ${err}` }))
})

async function transcribe(audios: Array<string>) {
  let transcriptions = [];
  for (const audio in audios) {
    const audioFile = fs.createReadStream('./audios/2min.mp3');
    await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1"
    })
    .then((response: any) => {
      transcriptions.push(response.text);
    })
    .catch(err => console.log(`❌ Transcription error: ${err}`)) // TODO: handle error
  }
  return transcriptions;
}

export default router