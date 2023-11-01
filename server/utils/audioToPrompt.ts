type UserAnswer = {
  role: 'function' | 'system' | 'user' | 'assistant';
  content: string;
};

export function audioToPrompt(
  transcriptions: Array<string>,
  questions: Array<string>
): UserAnswer {
  let userAnswers: UserAnswer = {
    role: 'user',
    content: '',
  };
  for (let i = 0; i < questions.length; i++) {
    let content = {
      question: questions[i],
      answer: transcriptions[i],
    };
    userAnswers.content += JSON.stringify(content);
  }
  return userAnswers;
}
