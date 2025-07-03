import type { IBook } from "../types";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IBooksResponse {
  meta: IMeta;
  books: IBook[];
}
