export interface ExamType {
  id?: number;
  testId?: number;
  examName: string;
  totalScore: number;
  testType?: string;
  duration?: number;
  questions?: number;
  students?: number;
  level?: string;
  image?: string;
}

export type PartType = {
  id: number;
  partName: string;
  questionType: string;
  questionCount: number;
  description: string;
  instructions: string | null;
};

export type QuestionType = {
  id: number;
  content: string;
  url: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string | null;
  difficulty: string;
  selectedAnswer?: string;
};

export type PartWithQuestionsType = {
  part: PartType;
  questions: QuestionType[];
};

export type DoExamType = {
  exam: ExamType;
  details: PartWithQuestionsType[];
};

export type AnswerType = {
  questionId: number;
  selectedOption?: string;
};

export type TestNavigationProps = {
  isView: boolean;
  attemptId: number;
  details?: PartWithQuestionsType[];
  currentQuestion: number;
  answers: AnswerType[];
  duration?: number;
  onNavigate: (index: number) => void;
};
