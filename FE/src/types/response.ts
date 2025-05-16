export interface ResponseDataType<T> {
  status: number;
  message: string;
  data?: T;
}
