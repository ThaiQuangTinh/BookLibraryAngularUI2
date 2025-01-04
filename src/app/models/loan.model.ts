import { Category } from "./category.model";

export interface Loan {
  readerUsername: string;
  librarianUsername: string;
  book: {
    _id: string,
    bookId: string;
    title: string;
    author: string;
    year: number;
    categorys: Category[];
    totalCopies: number;
    description: string;
    imageUrl: string[];
    initDate: Date;
    delFlg: boolean;
    status: number;
    location: string;
    updatedAt: Date;
  };
  loanDate: Date;
  dueDate: Date;
  status: number;
  initDate: Date;
  delFlg: boolean;
  _id: string;
  __v: number;
}
