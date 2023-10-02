import { Profession, ProfessionType } from '../interfaces';

const questionBank: [string, Profession][] = [
  [
    'Say you are working on a team and someone has a different viewpoint on it, such as using a different programming language, how would handle this situation?',
    ProfessionType.SOFTWARE_ENGINEER,
  ],
  ['Tell me about a project you are proud of', ProfessionType.ALL],
  [
    'Tell me about a time when you noticed someone was not being fully included in your team, how did you resolve this?',
    ProfessionType.ALL,
  ],
  [
    'Tell me about a time you volunteered to take on a significant assignment outside of your comfort zone in order to expand your capabilities. How often have you done this? What did you learn?',
    ProfessionType.ALL,
  ],
  [
    'Describe a situation in which you were a member of a group where teamwork was critical to getting something accomplished. I would like to know about your role, your approach to accomplishing the work, and any obstacles you faced.',
    ProfessionType.ALL,
  ],
  [
    'What is one area of growth that you believe this role would support you in improving in?',
    ProfessionType.ALL,
  ],
  [
    'Describe a time you received difficult feedback. What was the feedback and how did you react?',
    ProfessionType.ALL,
  ],
  [
    'What personal or professional mistakes have you learned the most from?',
    ProfessionType.ALL,
  ],
  [
    'What personal or professional accomplishments are you most proud of?',
    ProfessionType.ALL,
  ],
  ['What inspires you to want to work in this industry?', ProfessionType.ALL],
  [
    'Tell me about a time your original plan for something fell through. How did you pivot? What was the outcome?',
    ProfessionType.ALL,
  ],
];

export { questionBank };
