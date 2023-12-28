type UserAnswer = {
  role: 'function' | 'system' | 'user' | 'assistant';
  content: string;
};

export function audioToPrompt(
  transcription: string,
  question: string
): UserAnswer {
  let answer: UserAnswer = {
    role: 'user',
    content: '',
  };
  answer.content = JSON.stringify({
    question: question,
    answer: transcription,
  });
  return answer;
}
