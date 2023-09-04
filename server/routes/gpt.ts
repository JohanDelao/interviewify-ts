import fs from 'fs';
import { Router } from "express";
const router = Router();

import dotenv from "dotenv";
dotenv.config()

import { OpenAI } from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/transcribe", async (req, res) => {
  const audioFile = fs.createReadStream('./audios/2min.mp3');
  await openai.audio.transcriptions.create({
    file: audioFile,
    model: "whisper-1"
  })
  .then((response: any) => {
    res.status(200).json(response.text)
  })
  .catch(err => res.status(400).send({ error: `❌ Transcription error: ${err}` }))
})

router.post("/evaluate", async (req, res) => {
  const exampleTranscript = {
    "question": `Tell me about a time when you worked on a group project and had to deal 
      with a conflict. How did you resolve it? What was the end result?`,
    "answer": `During a group project, we had a conflict regarding task distribution and 
      a disengaged team member. I talked openly, listened to their concerns, and provided 
      support. We rearranged tasks, communicated openly, and helped each other. As a result, 
      the team member became more engaged, delivered quality work, and we successfully 
      completed the project. This experience taught me the importance of empathy, 
      communication, and collaboration in resolving team conflicts.`
  }

  const systemMessage: { role: "function" | "system" | "user" | "assistant", content: string } = {
    "role": "system",
    "content": `You are an AI career coach that will help users with Software Engineering
    interview behavioral questions. You will receive messages in a JSON string format with
    a 'question' and an 'answer' attribute. Your response to the user will be a numbered 
    list with each numbered section corresponding to 1 question. For each 
    message that you receive, you must do the following using the question and answer of 
    that message: Put the question at the top; Give a bulleted list of criticisms for 
    the user. Provide thoughtful feedback as to what they did well and what they 
    can improve; Keep your feedback concise and to the point; Score the response on a
    scale of 1-100 with 60 being a passing score. So, a response that is not great but will
    keep you moving along in the interview should be a 60.`
  }

  const userMessage: { role: "function" | "system" | "user" | "assistant", content: string } = {
    "role": "user",
    "content": JSON.stringify(exampleTranscript)
  }

  await openai.chat.completions.create({
    messages: [systemMessage, userMessage],
    model: "gpt-4",
  }).then((response) => {
    res.status(200).json(response.choices[0].message.content);
  })
    .catch(err => res.status(400).send({ error: `❌ Evaluation error: ${err}` }))
})

export default router