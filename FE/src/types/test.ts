export interface TestType {
  id: number;
  testType: string;
}

export type HistoryTestType = {
  id: number;
  imageSrc: string;
  examName: string;
  startTime: string;
  endTime: string;
  totalScore: number;
  time: string;
};
