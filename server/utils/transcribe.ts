import { OpenAI, toFile } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribe(audio: any): Promise<string> {
  let transcription = '';
  const audioFile = await toFile(audio.buffer, 'audio.webm');
  await openai.audio.transcriptions
    .create({
      file: audioFile,
      model: 'whisper-1',
    })
    .then((response: any) => {
      transcription = response.text;
    })
    .catch((err) => console.log(`❌ Transcription error: ${err}`)); // TODO: handle error
  return transcription;
}
