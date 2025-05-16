export interface LessonDetails {
  lessonName: string;
  contentType: string;
  articleText: string | null;
  duration: string | null;
}

export type LessonType = {
  id?: number; // id chỉ có khi edit
  lessonName: string;
  contentType: string;
  articleText: string;
  duration: number | null;
};

export type PartType = {
  id?: number;
  partId?: number;
  partName: string;
  description: string;
  questionType: string;
  instructions: string;
  questionCount: number;
};

export type LessonPartType = {
  lesson: LessonType[];
  part: PartType[];
};
