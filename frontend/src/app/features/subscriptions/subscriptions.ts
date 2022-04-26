import { Category } from '../categories/category';

export interface Subscriptions {
  id: string;
  accountId: string;
  title: string;
  description: string;
  firstDateOfPayment: Date;
  lastDateOfPayment: Date;
  dateOfPayment: Date;
  category: Category[];
  amount: number;
  dateOfCreation: Date;
  dateOfUpdate: Date;
}
