import { ProfessionType } from '../interfaces';
import { questionBank } from './questionBank';

export default function GetQuestions(
  profession: ProfessionType | undefined,
  numberQs: number | undefined,
): string[] {
  const res: string[] = [];
  if (profession && numberQs) {
    for (let i = 0; i < numberQs; i++) {
      let randomIndex = Math.floor(Math.random() * questionBank.length);
      if (
        questionBank[randomIndex][1] !== profession ||
        questionBank[randomIndex][1] !== ProfessionType.ALL ||
        res.includes(questionBank[randomIndex][0])
      ) {
        randomIndex = Math.floor(Math.random() * questionBank.length);
      }
      res.push(questionBank[randomIndex][0]);
    }
  }
  return res;
}
