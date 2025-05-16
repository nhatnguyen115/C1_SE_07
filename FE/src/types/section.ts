export interface SectionType {
  id: number;
  sectionName: string;
  description: string;
  sectionType: string;
}

export interface SectionFormData {
  sectionName: string;
  description: string;
  sectionType: string;
  moduleId: string;
}

export interface Lesson {
  id: number;
  lessonName: string;
  contentType: string;
  duration: number | null;
}

export interface Part {
  id: number;
  partName: string;
  questionType: string;
  questionCount: number;
}

export interface SectionResponseType {
  status: number;
  message: string;
  data: {
    items: SectionType[];
    totalPages: number;
    totalElements: number;
    pageNumber: number;
    pageSize: number;
  };
}
