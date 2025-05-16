export type QuestionType = {
  id: number;
  content: string;
  url: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  selectedAnswer?: string;
  questionType: string;
};
