// src/types/index.ts

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBorrowPayload {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface IBorrowResponse {
  _id: string;
  book: string;
  quantity: number;
  dueDate: string;
  createdAt: string;
}

export interface IBorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}



