import { Category } from '../../categories/category';

export interface Transaction {
  id: string;
  accountId: string;
  type: string;
  title: string;
  description: string;
  dateOfOperation: Date;
  category: Category[];
  amount: number;
  linkToFile: string;
  dateOfCreation: Date;
  dateOfUpdate: Date;
  payee: string;
}
