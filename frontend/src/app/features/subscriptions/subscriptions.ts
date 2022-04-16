export interface Subscriptions {
  id: string;
  accountId: string;
  title: string;
  description: string;
  firstDateOfPayment: Date;
  lastDateOfPayment: Date;
  dateOfPayment: Date;
  category: string;
  currency: string;
  amount: number;
  dateOfCreation: Date;
  dateOfUpdate: Date;
}
