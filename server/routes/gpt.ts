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

  const role = req.body.role ?? "software engineering"

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

  const userMessage: { role: "function" | "system" | "user" | "assistant", content: string } = {
    "role": "user",
    "content": JSON.stringify(exampleTranscript)
  }
  await openai.chat.completions.create({
    messages: [systemMessage, userMessage],
    model: "gpt-4",
  }).then((response) => {
    res.status(200).json(response.choices[0]);
  })
    .catch(err => res.status(400).send({ error: `❌ Evaluation error: ${err}` }))
})

export default router