import { OpenAI } from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribe(
  audioURLs: Array<string>
): Promise<Array<string>> {
  let transcriptions = [];
  for (const url in audioURLs) {
    const audioFile = fs.createReadStream(url);
    await openai.audio.transcriptions
      .create({
        file: audioFile,
        model: 'whisper-1',
      })
      .then((response: any) => {
        transcriptions.push(response.text);
      })
      .catch((err) => console.log(`❌ Transcription error: ${err}`)); // TODO: handle error
  }
  return transcriptions;
}
